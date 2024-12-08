import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./RecordDetail.css";

const RecordDetail = () => {
  const { id: diaryId } = useParams(); // URL에서 diaryId 가져오기
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await fetch(`http://13.124.74.53:8080/api/diaries/${diaryId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          setRecord(data.result); // API 응답 데이터 저장
        } else {
          const errorText = await response.text();
          throw new Error(`데이터 가져오기 실패: ${errorText}`);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecord();
  }, [diaryId]);

  const handleDelete = async () => {
    if (!window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      return;
    }

    try {
      const response = await fetch(`http://13.124.74.53:8080/api/diaries/${diaryId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        alert("게시글이 성공적으로 삭제되었습니다.");
        navigate("/record"); // RecordList 페이지로 이동
      } else {
        const errorText = await response.text();
        throw new Error(`삭제 실패: ${errorText}`);
      }
    } catch (err) {
      console.error("Error deleting record:", err.message);
      alert("삭제 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>오류 발생: {error}</p>;
  }

  if (!record) {
    return <p>해당 기록을 찾을 수 없습니다.</p>;
  }

  return (
    <div>
      <main>
        <div className="left" style={{ alignItems: "center" }}>
          <img
            className="cover"
            alt="This is book cover."
            src={record.bookCoverUrl || "/no-cover.jpg"} // 책 커버 URL 가져오기
          />
          <div className="bookinfo">
            <p className="bookname">{record.bookTitle}</p>
            <p className="author">{record.author}</p>
            <p className="publisher">{record.publisher}</p>
          </div>
        </div>

        <div className="right">
          <p className="title">{record.title}</p>
          <hr />
          <div className="writeinfo">
            <p className="writer">작성자: {localStorage.getItem("userId")}</p>
            {/* <p className="date">작성 날짜: {new Date(`${record.createdAt}T00:00:00`).toLocaleDateString()}</p> */}
          </div>
          <hr />
          <p className="textarea-field">{record.content}</p>
          <hr />
          <div className="actions">
            <button type="button" className="action-button" onClick={handleDelete}>
              삭제
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecordDetail;
