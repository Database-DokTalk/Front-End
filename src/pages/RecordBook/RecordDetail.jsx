// 기록장 관련 컴포넌트 중 RecordDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import records from "../../data/records"; // 더미 데이터 가져오기
import "./RecordDetail.css";

const RecordDetail = () => {
  const { id } = useParams(); // URL에서 ID 가져오기
  const record = records.find((item) => item.id === parseInt(id, 10)); // ID로 데이터 조회

  if (!record) {
    return <p>해당 기록을 찾을 수 없습니다.</p>;
  }

  return (
    <div>
      <main>
        <div className="left" style={{alignItems: "center"}}>

            <img className="cover" alt="This is book cover." src="/no-cover.jpg" /> 

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
          <div className="actions">
            <button type="submit" class="action-button">삭제</button>
          </div>
        </div>

      </main>
    </div>
  );
};

export default RecordDetail;