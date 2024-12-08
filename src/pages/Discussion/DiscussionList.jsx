import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./DiscussionList.css";

const DiscussionList = ({ discussions }) => {
  const navigate = useNavigate();

  const handleGoToPostForm = () => {
    navigate("/postform");
  };

  return (
    <div className="discussion-list-page">
      <main className="discussion-list-main">
        <div className="discussion-list-header">
            <h2>토론방</h2>
            <button className="add-button" onClick={handleGoToPostForm}>게시글 작성</button>
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
                <tr key={discussion.id}>
                    <td>{index + 1}</td>
                    <td>
                    <Link to={`/discussion/${discussion.id}`}>
                        {discussion.postTitle}
                    </Link>
                    </td>
                    <td>{discussion.bookTitle}</td>
                    <td>{discussion.author}</td>
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
