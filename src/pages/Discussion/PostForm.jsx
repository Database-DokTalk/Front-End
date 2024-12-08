import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostForm = () => {
  const [bookTitle, setBookTitle] = useState(""); // 책 제목
  const [author, setAuthor] = useState(""); // 지은이
  const [publisher, setPublisher] = useState(""); // 출판사
  const [title, setTitle] = useState(""); // 글 제목
  const [content, setContent] = useState(""); // 글 내용
  const navigate = useNavigate(); // 화면 전환을 위한 useNavigate 훅

  // 모든 필수 입력 필드가 채워졌는지 확인
  const isFormValid = () => {
    return (
      bookTitle.trim() !== "" &&
      author.trim() !== "" &&
      publisher.trim() !== "" &&
      title.trim() !== "" &&
      content.trim() !== ""
    );
  };

  // 글 등록 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('id');
    if (!userId) {
      alert("로그인 후 글을 등록해주세요.");
      return;  // 글 등록을 중단하고 경고 표시
    }

    const newPost = {
      bookTitle,
      author,
      publisher,
      title,
      content,
      userId,
    };

    try {
      // fetch를 사용해 POST 요청 보내기
      const response = await fetch("http://13.124.74.53:8080/api/discussions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // JSON 형식으로 보내기
        },
        body: JSON.stringify(newPost), // newPost 객체를 JSON 문자열로 변환해서 body에 담기
      });

      // 응답 처리
      if (!response.ok) {
        throw new Error(`서버 오류: ${response.statusText}`);
      }

      const data = await response.json(); // 응답 데이터를 JSON으로 변환
      const id = data.id;  // 서버에서 반환된 글 ID

      // 입력 필드 초기화
      setBookTitle("");
      setAuthor("");
      setPublisher("");
      setTitle("");
      setContent("");

      // 글 등록 후 DiscussionList 화면으로 이동
      navigate("/discussion");
    } catch (error) {
      console.error("서버에 글 등록 중 오류 발생:", error);
      alert("글 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="container">
      <div className="background">
        <h1 className="title">글 등록</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="책 제목을 입력하세요"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="지은이 입력"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="출판사 입력"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="글 제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
          />
          <textarea
            placeholder="글 내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="textarea-field"
          />
          <div className="actions">
            <button
              type="submit"
              className="action-button1"
              disabled={!isFormValid()}
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
