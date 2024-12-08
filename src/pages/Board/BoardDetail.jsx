import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./BoardDetail.css";

const BoardDetail = () => {
  const { id } = useParams(); // URL에서 diaryId 가져오기
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); // 쿼리 파라미터 파싱
  const userId = queryParams.get("userId"); // userId 가져오기

  const [record, setRecord] = useState(null); // 게시글 데이터
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const [likes, setLikes] = useState(0); // 좋아요 수 상태 관리
  const [liked, setLiked] = useState(false); // 좋아요 여부 상태 관리

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await fetch(`http://13.124.74.53:8080/api/diaries/${id}`);
        if (response.ok) {
          const data = await response.json();
          if (data.isSuccess) {
            setRecord(data.result); // 게시글 데이터 설정
            setLikes(data.result.likeCount); // 초기 좋아요 수 설정
            setLiked(data.result.liked); // 초기 좋아요 여부 설정 (백엔드가 전달하면)
          } else {
            throw new Error(data.message || "데이터를 가져오는 중 문제가 발생했습니다.");
          }
        } else {
          throw new Error(`HTTP Error: ${response.status}`);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false); // 로딩 상태 해제
      }
    };

    fetchRecord();
  }, [id]);

  const handleLike = async () => {
    try {
      // 좋아요 상태를 토글
      const newLikedState = !liked;

      // 백엔드로 PATCH 요청 전송
      const response = await fetch(`http://13.124.74.53:8080/api/diaries/${id}/like`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        // 성공 시 좋아요 수 및 상태 업데이트
        setLikes(newLikedState ? likes + 1 : likes - 1); // 좋아요 수 업데이트
        setLiked(newLikedState); // 좋아요 상태 업데이트
      } else {
        const errorData = await response.json();
        console.error("Failed to update like:", errorData);
        alert("좋아요 상태를 업데이트하는 중 문제가 발생했습니다.");
      }
    } catch (error) {
      console.error("Error during like update:", error);
      alert("좋아요 상태를 업데이트하는 중 문제가 발생했습니다.");
    }
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류 발생: {error}</div>;
  }

  if (!record) {
    return <p>해당 기록을 찾을 수 없습니다.</p>;
  }

  return (
    <div>
      <main>
        <div className="left">
          <div className="bookcover">
            <img
              className="boardcover"
              alt="Book cover"
              src={record.bookCoverUrl || "/no-cover.jpg"}
            />
          </div>
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
            <p className="writer">작성자: {userId}</p>
          </div>
          <hr />
          <p className="textarea-field">{record.content}</p>
          <hr />
          <div className="like-section">
            <button
              onClick={handleLike}
              className={`like-button ${liked ? "liked" : ""}`}
            >
              {liked ? "❤️ 좋아요 취소" : "🤍 좋아요"}
            </button>
            <p>좋아요 {likes}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BoardDetail;
