// 기록장 관련 컴포넌트 중 RecordList
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./RecordList.css";

const RecordList = () => {
  const [records, setRecords] = useState([]); // API 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        // localStorage에서 사용자 ID 가져오기
        const id = localStorage.getItem("id"); // 'id'로 사용자 식별
        if (!id) {
          throw new Error("로그인되지 않았습니다. 사용자 ID가 없습니다.");
        }

        console.log("Fetching records for id:", id); // 디버깅용 출력

        // API 호출
        const response = await fetch(`http://13.124.74.53:8080/api/diaries/user/${id}`);
        console.log("Response status:", response.status); // 응답 상태 코드 출력

        if (response.status === 200) {
          const data = await response.json();
          console.log("Fetched records:", data); // 가져온 데이터 출력
          setRecords(data); // 받아온 데이터를 상태에 저장
        } else if (response.status === 204) {
          // 204 No Content 처리
          setRecords([]); // 기록이 없을 경우 빈 배열 설정
        }
        else {
          const errorText = await response.text();
          throw new Error(`API 오류: ${errorText}`);
        }
      } catch (err) {
        console.error("Error fetching records:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []); // 컴포넌트가 처음 렌더링될 때만 실행

  const goToWrite = () => {
    navigate("/record/write");
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>오류 발생: {error}</p>;
  }

  return (
    <div className="record-list-page">
      <main className="main">
        <div className="record-list-header">
          <h2>내 기록장</h2>
          <button type="submit" className="add-button" onClick={goToWrite}>
            글 등록
          </button>
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
            {/* {records.map((record, index) => (
              <tr key={record.id}>
                <td className="num">{index + 1}</td>
                <td className="record-title">
                  <Link to={`/record/${record.id}`}>{record.title}</Link>
                </td>
                <td>{record.bookTitle}</td>
                <td>{new Date(record.createdAt).toLocaleDateString()}</td>
              </tr>
            ))} */}
            {records.length === 0 ? (
              // 기록이 없을 때 표시할 내용
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  기록한 책이 없습니다.
                </td>
              </tr>
            ) : (
              // 기록이 있을 때 테이블 렌더링
              records.map((record, index) => (
                <tr key={record.id}>
                  <td className="num">{index + 1}</td>
                  <td className="record-title">
                    <Link to={`/record/${record.id}`}>{record.title}</Link>
                  </td>
                  <td>{record.bookTitle}</td>
                  <td>{new Date(record.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default RecordList;
