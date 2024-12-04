// 게시판 관련 컴포넌트 중 BoardDetail.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import records from "../../data/records"; // 더미 데이터 가져오기
import "./BoardDetail.css";

const BoardDetail = () => {
  const { id } = useParams(); // URL에서 ID 가져오기
  const record = records.find((item) => item.id === parseInt(id, 10)); // ID로 데이터 조회

  const [likes, setLikes] = useState(0); // 좋아요 수 상태 관리
  const [liked, setLiked] = useState(false); // 좋아요 여부 상태 관리

  const handleLike = () => {
    setLikes((prevLikes) => (liked ? prevLikes - 1 : prevLikes + 1));
    setLiked((prevLiked) => !prevLiked);
  };

  if (!record) {
    return <p>해당 기록을 찾을 수 없습니다.</p>;
  }

  return (
    <div>
      <main>
        <div className="left">
          <div className="bookcover">
            <img className="boardcover" alt="This is book cover." src="/no-cover.jpg" /> 
          </div>
          <div className="bookinfo">
            <p className="bookname">{record.book}</p>
            <p className="author">저자</p>
            <p className="publisher">출판사</p>
          </div>
        </div>

        <div className="right">
          <p className="title">{record.title}</p>
          <hr />
          <div className="writeinfo">
            <p className="writer">{record.writer}</p>
            <p className="date">작성 날짜: {record.date}</p>
          </div>
          <hr />
          <p className="textarea-field">Hello?</p>
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