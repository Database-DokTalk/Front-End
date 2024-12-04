// 기록장 관련 컴포넌트 중 RecordList
import React from "react";
import { useNavigate } from "react-router-dom"; // React Router 훅 가져오기
import records from "../../data/records"; // 더미 데이터 가져오기
import Header from "../../components/Header"; // 공통 Header 컴포넌트
import "./RecordList.css";

const RecordList = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  const goToWrite = () => {
    navigate("/record/write"); // '글 등록' 경로로 이동
  };

  return (
    <div className="record-list-page">
      <main className="main">
        <div className="record-list-header">
          <h2>내 기록장</h2>
          <button type="submit" className="add-button" onClick={goToWrite}>글 등록</button>
        </div>
        <table className="record-table">
          <thead>
            <tr>
              <th className="num">NO.</th>
              <th>글 제목</th>
              <th>책 제목</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={record.id}>
                <td className="num">{index + 1}</td>
                <td className="record-title">
                  <a href={`/record/${record.id}`}>{record.title}</a>
                </td>
                <td>{record.book}</td>
                <td>{record.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default RecordList;
