// 기록장 관련 컴포넌트 중 RecordWrite.jsx -> 기록장 작성 화면
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookSearchModal from "./BookSearchModal";
import "./RecordWrite.css";

const RecordWrite = () => {
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [bookCoverUrl, setBookCoverUrl] = useState("/no-cover.jpg"); // 기본 이미지 URL
  const [postTitle, setPostTitle] = useState("");
  const [content, setContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSelectBook = (book) => {
    setBookTitle(book.title);
    setAuthor(book.author);
    setPublisher(book.publisher);
    setBookCoverUrl(book.bookCoverUrl); // 이미지 URL 설정
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bookTitle || !author || !publisher || !postTitle || !content) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    try {
      const userId = localStorage.getItem("id"); // 사용자 ID 가져오기
      if (!userId) {
        alert("로그인 정보가 없습니다.");
        return;
      }

      const response = await fetch("http://13.124.74.53:8080/api/diaries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId, // 사용자 ID
          title: postTitle,
          bookTitle,
          author,
          publisher,
          bookCoverUrl, // bookCoverUrl 추가
          content,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        const diaryId = data.result.diaryId; // 생성된 diaryId 받아오기
        console.log("기록장 ID: ", diaryId);
        alert("기록이 성공적으로 저장되었습니다.");
        navigate(`/record/${diaryId}`); // RecordList로 이동
      } else {
        const errorText = await response.text();
        throw new Error(`저장 실패: ${errorText}`);
      }
    } catch (err) {
      console.error("Error saving record:", err.message);
      alert("저장 중 문제가 발생했습니다.");
    }
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
            <img className="writecover" alt="This is book cover." src={bookCoverUrl} />
          </div>
          <div className="bookinfo">
            <p className="bookname">{bookTitle || "책 제목: 선택 안됨"}</p>
            <p className="author">{author || "저자: 선택 안됨"}</p>
            <p className="publisher">{publisher || "출판사: 선택 안됨"}</p>
            <button className="searchBtn" onClick={() => setIsModalOpen(true)}>
              책 검색하러 가기
            </button>
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
            <p className="writer">작성자: {localStorage.getItem("userId")}</p>
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
            <button type="submit" className="post-button" onClick={handleSubmit}>
              등록
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecordWrite;