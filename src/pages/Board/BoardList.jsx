import React, { useEffect, useState } from "react";
import "./BoardList.css";

const BoardList = () => {
  const [records, setRecords] = useState([]); // API 데이터 저장
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch("http://13.124.74.53:8080/api/diaries/board");
        if (response.ok) {
          const data = await response.json();
          if (data.isSuccess) {
            setRecords(data.result); // API 데이터 설정
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

    fetchRecords();
  }, []);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류 발생: {error}</div>;
  }

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
              <tr key={record.diaryId}>
                <td className="boardnum">{index + 1}</td>
                <td className="board-title">
                  <a
                    href={`/board/${record.diaryId}?userId=${record.userId}`}
                  >
                    {record.title}
                  </a>
                </td>
                <td>{record.bookTitle}</td>
                <td>{record.userId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default BoardList;
