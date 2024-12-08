import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./RecordDetail.css";

const RecordDetail = () => {
  const { id } = useParams(); // URL에서 ID 가져오기
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        // localStorage에서 사용자 ID 가져오기
        const userId = localStorage.getItem("userId");
        if (!userId) {
          throw new Error("로그인되지 않았습니다. 사용자 ID가 없습니다.");
        }

        const response = await fetch(`http://13.124.74.53:8080/diary/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          setRecord(data.result); // API의 result 객체를 상태에 저장
        } else {
          throw new Error("데이터를 불러오는 데 실패했습니다.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecord();
  }, [id]);

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
            src={record.bookCoverUrl || "/no-cover.jpg"} // API에서 책 커버 URL 가져오기
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
            <p className="writer">{record.writer || "작성자"}</p>
            <p className="date">작성 날짜: {new Date(record.date).toLocaleDateString()}</p>
          </div>
          <hr />
          <p className="textarea-field">{record.content}</p>
          <hr />
          <div className="actions">
            <button type="submit" className="action-button">삭제</button>
          </div>
          <p>좋아요: {record.likeCount}</p>
        </div>
      </main>
    </div>
  );
};

export default RecordDetail;
