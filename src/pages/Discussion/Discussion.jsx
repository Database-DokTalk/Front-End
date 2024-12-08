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

    const fetchComments = async () => {
      try {
        const response = await fetch(`http://13.124.74.53:8080/discussion/${discussionId}`);
        const data = await response.json();
        if (!response.ok || !data.isSuccess) {
          console.error("댓글 조회 실패:", data.message);
          setComments([]); // 댓글 데이터를 빈 배열로 설정
          return;
        }
        setComments(data.result || []); // 댓글 데이터를 상태에 설정
      } catch (error) {
        console.error("Error fetching comments:", error);
        setComments([]); // 에러 발생 시 댓글을 빈 배열로 설정
      }
    };

    fetchPost();
    fetchComments(); // 댓글도 함께 불러오기
  }, [discussionId]); // discussionId가 변경될 때마다 다시 호출

  // 댓글 작성 핸들러
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return; // 빈 입력 방지

    const userId = localStorage.getItem("id");
    if (!userId) {
      alert("로그인 후 댓글을 작성할 수 있습니다.");
      return;
    }

    const newCommentData = {
      review: newComment.trim(),
      userId: userId,
      discussionId: discussionId,
    };

    try {
      const response = await fetch("http://13.124.74.53:8080/discussion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCommentData),
      });

      if (!response.ok) {
        throw new Error("댓글 작성에 실패했습니다.");
      }

      const data = await response.json();
      if (data.isSuccess) {
        const createdComment = data.result; // 서버에서 반환한 새 댓글 데이터
        setComments((prevComments) => [...prevComments, createdComment]); // 상태에 새 댓글 추가
        setNewComment(""); // 입력 필드 초기화
        setIsCommenting(false); // 댓글 입력란 숨기기
      } else {
        alert(data.message || "댓글 작성에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("댓글 작성에 실패했습니다.");
    }
  };

  // 찬성 클릭 핸들러
  const handleAgree = () => {
    if (!hasVoted) {
      setAgreeCount(agreeCount + 1); // 찬성 카운트 증가
      setHasVoted(true); // 투표 완료 처리
    }
  };

  // 반대 클릭 핸들러
  const handleDisagree = () => {
    if (!hasVoted) {
      setDisagreeCount(disagreeCount + 1); // 반대 카운트 증가
      setHasVoted(true); // 투표 완료 처리
    }
  };

  // 로딩 중일 때 처리
  if (!post) {
    return <div>로딩 중...</div>; // 게시글이 없으면 로딩 중 표시
  }

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
            {comments.length > 0 ? (
              comments.map((comment) => (
                <li key={comment.id}>
                  <div>
                    <strong>{comment.userName}</strong>
                  </div>
                  <p>{comment.review}</p>
                </li>
              ))
            ) : (
              <p>댓글이 없습니다.</p>
            )}
          </ul>
        </div>

        <button onClick={() => navigate("/discussion")}>뒤로가기</button>
      </div>
    </div>
  );
};

export default Discussion;
