import React, { useState } from "react";
import books from "../../data/books"; // 책 더미 데이터
import "./BookSearchModal.css";

const BookSearchModal = ({ onClose, onSelectBook }) => {
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태

  // 검색 필터링
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.publisher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>책 검색</h3>
        {/* 검색 입력창 */}
        <input
          type="text"
          placeholder="책 제목, 저자, 출판사를 검색하세요."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {/* 필터링된 책 리스트 */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>선택</th>
                <th>책 제목</th>
                <th>저자</th>
                <th>출판사</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <tr key={book.id}>
                    <td className="modal-center">
                      <button onClick={() => onSelectBook(book)} className="selectBtn">✔️</button>
                    </td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.publisher}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-results">
                    검색 결과가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <button className="close-button" onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default BookSearchModal;
