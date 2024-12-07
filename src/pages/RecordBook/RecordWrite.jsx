// 기록장 관련 컴포넌트 중 RecordWrite.jsx -> 기록장 작성 화면
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookSearchModal from "./BookSearchModal";
import "./RecordWrite.css";

const RecordWrite = () => {
  const [bookTitle, setBookTitle] = useState(""); // 책 제목
  const [author, setAuthor] = useState(""); // 지은이
  const [publisher, setPublisher] = useState(""); // 출판사
  const [postTitle, setPostTitle] = useState(""); // 글 제목
  const [content, setContent] = useState(""); // 글 내용
  const [isModalOpen, setIsModalOpen] = useState(false); // 팝업창 상태
  const navigate = useNavigate(); // 화면 전환을 위한 useNavigate 훅

  const handleSelectBook = (book) => {
    setBookTitle(book.title);
    setAuthor(book.author);
    setPublisher(book.publisher);
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 모든 필드가 입력되었는지 확인
    if (!bookTitle || !author || !publisher || !postTitle || !content) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    // 데이터를 서버로 전송 (예: API 호출) - 더미 처리
    const newRecord = {
      id: Date.now(), // 고유 ID 생성 (예: timestamp)
      title: postTitle,
      book: bookTitle,
      date: new Date().toLocaleDateString(),
    };

    console.log("등록된 데이터:", newRecord);

    // 성공 메시지 표시 후 화면 이동
    alert("등록되었습니다!");
    navigate("/record"); // RecordList 화면으로 이동
  };

  return (
    <div>
      {isModalOpen && (
        <div className="modal-overlay">
          <BookSearchModal
            onClose={() => setIsModalOpen(false)}
            onSelectBook={handleSelectBook}
          />
        </div>
      )}
      <main>
        <div className="left">
          <div className="bookcover">
            <img className="writecover" alt="This is book cover." src="/no-cover.jpg" /> 
          </div>
          <div className="bookinfo">
            <p className="bookname">{bookTitle || "책 제목: 선택 안됨"}</p>
            <p className="author">{author || "저자: 선택 안됨"}</p>
            <p className="publisher">{publisher || "출판사: 선택 안됨"}</p>
            <button onClick={() => setIsModalOpen(true)}>책 검색하러 가기</button>
          </div>
        </div>

        <div className="right">
          <textarea
            placeholder="제목을 입력하세요."
            className="title"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          ></textarea>
          <hr />
          <div className="writeinfo">
            <p className="writer">지현</p>  {/* API 연결 후 Username 받아올 것 */}
            <p className="date">작성 날짜: {new Date().toLocaleDateString()}</p>
          </div>
          <hr />
          <textarea
            placeholder="내용을 입력하세요."
            className="textarea-field"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <hr />
          <div className="actions">
            <button type="submit" class="post-button" onClick={handleSubmit}>등록</button>
          </div>
        </div>

      </main>
    </div>
  );
};

export default RecordWrite;