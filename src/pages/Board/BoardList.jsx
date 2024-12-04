// 게시판 관련 컴포넌트 중 BoardList.jsx
import React from "react";
import records from "../../data/records"; // 더미 데이터 가져오기
import Header from "../../components/Header"; // 공통 Header 컴포넌트
import "./BoardList.css";

const BoardList = () => {
  return (
    <div className="board-list-page">
      <main className="boardmain">
        <h2>게시판</h2>
        <table className="board-table">
          <thead>
            <tr>
              <th className="boardnum">NO.</th>
              <th>글 제목</th>
              <th>책 제목</th>
              <th>글쓴이</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={record.id}>
                <td className="boardnum">{index + 1}</td>
                <td className="board-title">
                  <a href={`/board/${record.id}`}>{record.title}</a>
                </td>
                <td>{record.book}</td>
                <td>{record.writer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default BoardList;
