import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // API 호출용

const PostForm = ({ onSubmit }) => {
  const [bookTitle, setBookTitle] = useState(""); // 책 제목
  const [author, setAuthor] = useState(""); // 지은이
  const [publisher, setPublisher] = useState(""); // 출판사
  const [postTitle, setPostTitle] = useState(""); // 글 제목
  const [content, setContent] = useState(""); // 글 내용
  const [isEditable, setIsEditable] = useState(false); // 추가 입력 활성화 여부
  const navigate = useNavigate(); // 화면 전환을 위한 useNavigate 훅

    // 모든 필수 입력 필드가 채워졌는지 확인
    const isFormValid = () => {
        return (
          bookTitle.trim() !== "" &&
          author.trim() !== "" &&
          publisher.trim() !== "" &&
          postTitle.trim() !== "" &&
          content.trim() !== ""
        );
      };

  // 책 제목 입력 핸들러
  const handleBookTitleChange = async (e) => {
    const inputTitle = e.target.value;
    setBookTitle(inputTitle);

    if (inputTitle) {
      try {
        // 책 정보를 데이터베이스에서 가져오기
        const response = await axios.get(`/api/books?title=${inputTitle}`);
        if (response.data) {
          // 데이터베이스에 정보가 있는 경우
          setAuthor(response.data.author || "");
          setPublisher(response.data.publisher || "");
          setIsEditable(false); // 추가 입력 비활성화
        } else {
          // 데이터베이스에 정보가 없는 경우
          setAuthor("");
          setPublisher("");
          setIsEditable(true); // 추가 입력 활성화
        }
      } catch (error) {
        console.error("책 정보를 가져오는 중 오류 발생:", error);
        setAuthor("");
        setPublisher("");
        setIsEditable(true); // 오류 시 추가 입력 활성화
      }
    } else {
      // 책 제목이 비어있을 때 초기화
      setAuthor("");
      setPublisher("");
      setIsEditable(false);
    }
  };

  // 글 등록 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    // 모든 데이터 전달
    onSubmit({
      bookTitle,
      author,
      publisher,
      postTitle,
      content,
    });

    // 입력 필드 초기화
    setBookTitle("");
    setAuthor("");
    setPublisher("");
    setPostTitle("");
    setContent("");
    setIsEditable(false);


    // Discussion 화면으로 이동
    navigate("/discussion");
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
            onChange={handleBookTitleChange}
            className="input-field"
          />
          <input
            type="text"
            placeholder="지은이 입력"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            readOnly={!isEditable} // 데이터가 있는 경우 비활성화
            className="input-field"
          />
          <input
            type="text"
            placeholder="출판사 입력"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            readOnly={!isEditable} // 데이터가 있는 경우 비활성화
            className="input-field"
          />
          <input
            type="text"
            placeholder="글 제목을 입력하세요"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            className="input-field"
          />
          <textarea
            placeholder="글 내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="textarea-field"
          />
          <div className="actions">
            <button type="submit"
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
