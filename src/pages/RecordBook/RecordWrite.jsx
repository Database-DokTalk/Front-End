// 기록장 관련 컴포넌트 중 RecordWrite.jsx -> 기록장 작성 화면
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RecordWrite.css";

const RecordWrite = () => {

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

  // 기록장 등록 핸들러
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


    // Detail 화면으로 이동
    navigate("/detail");
  };

  return (
    <div>
      <main>
        <div className="left">
          <div className="bookcover">
            <img className="writecover" alt="This is book cover." src="/no-cover.jpg" /> 
          </div>
          <div className="bookinfo">
            <p className="bookname">책 제목</p>
            <p className="author">저자</p>
            <p className="publisher">출판사</p>
          </div>
        </div>

        <div className="right">
          <textarea placeholder="제목을 입력하세요." class="title"></textarea>
          <hr />
          <div className="writeinfo">
            <textarea placeholder="책 제목을 입력하세요." class="write"></textarea>
            <p className="date">작성 날짜: 0000.00.00</p>
          </div>
          <hr />
          <textarea placeholder="내용을 입력하세요." class="textarea-field"></textarea>
          <hr />
          <div className="actions">
            <button type="submit" class="action-button">등록</button>
          </div>
        </div>

      </main>
    </div>
  );
};

export default RecordWrite;