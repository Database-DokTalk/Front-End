import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Discussion.css";

const Discussion = () => {
  const { discussionId } = useParams(); // URL 파라미터에서 discussionId 가져오기
  const navigate = useNavigate();

  const [post, setPost] = useState(null); // 게시글 상태
  const [agreeCount, setAgreeCount] = useState(0); // 찬성 카운트
  const [disagreeCount, setDisagreeCount] = useState(0); // 반대 카운트
  const [hasVoted, setHasVoted] = useState(false); // 투표 여부
  const [comments, setComments] = useState([]); // 댓글 리스트
  const [newComment, setNewComment] = useState(""); // 새 댓글 내용
  const [isCommenting, setIsCommenting] = useState(false); // 댓글 입력란 표시 여부

  // 게시글 상세 정보 가져오기
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://13.124.74.53:8080/api/discussions/${discussionId}`);
        
        if (!response.ok) {
          throw new Error("게시글을 불러오는 데 실패했습니다.");
        }

        const data = await response.json();
        
        // 'result' 객체 내 데이터를 setPost로 업데이트
        if (data.isSuccess) {
          setPost(data.result); // 게시글 데이터는 result 안에 있음
        } else {
          alert(data.message || "게시글을 불러오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        alert("게시글을 불러오는 데 오류가 발생했습니다.");
      }
    };

    fetchPost();
  }, [discussionId]); // discussionId가 변경될 때마다 다시 호출

  // 로딩 중일 때 처리
  if (!post) {
    return <div>로딩 중...</div>; // 게시글이 없으면 로딩 중 표시
  }

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
        <h1 className="title">{post.title}</h1>
        <hr />
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

        <div className="vote-section">
          <button onClick={handleAgree} disabled={hasVoted}>
            찬성 ({agreeCount})
          </button>
          <span>VS</span>
          <button onClick={handleDisagree} disabled={hasVoted}>
            반대 ({disagreeCount})
          </button>
        </div>

        <div className="comments-section">
          <h3>댓글</h3>
          {isCommenting ? (
            <form onSubmit={handleCommentSubmit}>
              <textarea
                placeholder="댓글을 입력하세요"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button type="submit">등록</button>
            </form>
          ) : (
            <button onClick={() => setIsCommenting(true)}>댓글 쓰기</button>
          )}

          <ul>
            {comments.map((comment, index) => (
              <li key={index}>
                <div>{comment.userId} - {new Date(comment.timestamp).toLocaleString()}</div>
                <p>{comment.content}</p>
              </li>
            ))}
          </ul>
        </div>

        <button onClick={() => navigate("/discussion")}>뒤로가기</button>
      </div>
    </div>
  );
};

export default Discussion;
