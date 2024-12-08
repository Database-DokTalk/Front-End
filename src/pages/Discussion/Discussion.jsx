import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Discussion.css";

const Discussion = ({ discussions }) => {
  const { id } = useParams(); // URL 파라미터에서 id 가져오기
  const navigate = useNavigate();

  // 기존 게시글 데이터에서 현재 id에 해당하는 게시글 찾기
  const post = discussions.find((discussion) => discussion.id === parseInt(id));

  // 게시글이 없는 경우 처리
  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  // 기존 상태 및 함수 정의
  const [agreeCount, setAgreeCount] = useState(0); // 찬성 카운트
  const [disagreeCount, setDisagreeCount] = useState(0); // 반대 카운트
  const [hasVoted, setHasVoted] = useState(false); // 투표 여부
  const [comments, setComments] = useState([]); // 댓글 리스트
  const [newComment, setNewComment] = useState(""); // 새 댓글 내용
  const [isCommenting, setIsCommenting] = useState(false); // 댓글 입력란 표시 여부

  // 찬성 버튼 클릭 핸들러
  const handleAgree = () => {
    if (hasVoted) return; // 이미 투표한 경우
    setAgreeCount((prev) => prev + 1); // 찬성 카운트 증가
    setHasVoted(true); // 투표 상태 설정
  };

  // 반대 버튼 클릭 핸들러
  const handleDisagree = () => {
    if (hasVoted) return; // 이미 투표한 경우
    setDisagreeCount((prev) => prev + 1); // 반대 카운트 증가
    setHasVoted(true); // 투표 상태 설정
  };

  // 댓글 작성 핸들러
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return; // 빈 입력 방지

    const newCommentData = {
      userId: "user123", // 예제 사용자 아이디
      content: newComment.trim(),
      timestamp: new Date().toISOString(),
    };

    setComments((prevComments) => [...prevComments, newCommentData]); // 새 댓글 추가
    setNewComment(""); // 입력 필드 초기화
    setIsCommenting(false); // 댓글 입력란 숨기기
  };

  return (
    <div className="container">
      <div className="background">
        {/* 기존 게시글 제목 */}
        <h1 className="title">{post.postTitle}</h1>
        <hr />
        {/* 게시글 정보 */}
        <div className="book-info">
          <div
            className="info-row"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ flex: "1" }}>책 제목: {post.bookTitle}</span>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <span>지은이: {post.author}</span>
              <span>출판사: {post.publisher}</span>
            </div>
          </div>
          <hr />
          <div className="content">
            <p style={{ whiteSpace: "pre-wrap" }}>{post.content}</p>
          </div>
        </div>

        {/* 찬성/반대 버튼 */}
        <div className="vote-section">
          <button
            className="vote-button"
            onClick={handleAgree}
            disabled={hasVoted} // 이미 투표한 경우 비활성화
          >
            찬성 ({agreeCount})
          </button>
          <span className="vs-text">VS</span>
          <button
            className="vote-button"
            onClick={handleDisagree}
            disabled={hasVoted} // 이미 투표한 경우 비활성화
          >
            반대 ({disagreeCount})
          </button>
        </div>

        {/* 댓글 작성 */}
        <div className="comments-section">
          <h3>댓글</h3>
          {isCommenting ? (
            <form onSubmit={handleCommentSubmit}>
              <textarea
                placeholder="댓글을 입력하세요"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="textarea-field"
              />
              <button type="submit" className="action-button1">
                등록
              </button>
            </form>
          ) : (
            <button
              className="action-button2"
              onClick={() => setIsCommenting(true)}
            >
              댓글 쓰기
            </button>
          )}

          {/* 댓글 리스트 */}
          <ul className="comments-list">
            {comments.map((comment, index) => (
              <li key={index} className="comment-item">
                <div className="comment-header">
                  <strong>{comment.userId}</strong> -{" "}
                  {new Date(comment.timestamp).toLocaleString()}
                </div>
                <p style={{ whiteSpace: "pre-wrap" }}>{comment.content}</p>
                <hr />
              </li>
            ))}
          </ul>
        </div>

        {/* 뒤로가기 버튼 추가 */}
        <button
          onClick={() => navigate("/discussion")}
          className="back-button"
        >
          뒤로가기
        </button>
      </div>
    </div>
  );
};

export default Discussion;
