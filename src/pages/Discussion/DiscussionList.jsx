import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./DiscussionList.css";

const DiscussionList = () => {
  const [discussions, setDiscussions] = useState([]); // 글 목록 상태
  const navigate = useNavigate();

  // 글 목록 가져오기
  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await fetch("http://13.124.74.53:8080/api/discussions");
        if (!response.ok) {
          throw new Error("게시글을 불러오는 데 실패했습니다.");
        }
        const data = await response.json();
        setDiscussions(data);  // 상태 업데이트
      } catch (error) {
        console.error("Error fetching discussions:", error);
        alert("글 목록을 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchDiscussions();
  }, []);  // 컴포넌트가 마운트될 때 한 번만 실행

  const handleGoToPostForm = () => {
    navigate("/postform");
  };

  return (
    <div className="discussion-list-page">
      <main className="discussion-list-main">
        <div className="discussion-list-header">
          <h2>토론방</h2>
          <button className="add-button" onClick={handleGoToPostForm}>
            게시글 작성
          </button>
        </div>
        <table className="discussion-table">
          <thead>
            <tr>
              <th>번호</th>
              <th>글 제목</th>
              <th>책 제목</th>
              <th>작성자</th>
            </tr>
          </thead>
          <tbody>
            {discussions.length > 0 ? (
              discussions.map((discussion, index) => (
                <tr key={discussion.discussionId}>
                  <td>{index + 1}</td>
                  <td>
                    <Link to={`/discussion/${discussion.discussionId}`}>
                      {discussion.title}
                    </Link>
                  </td>
                  <td>{discussion.bookTitle}</td>
                  <td>{discussion.user}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  게시글 데이터가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default DiscussionList;
