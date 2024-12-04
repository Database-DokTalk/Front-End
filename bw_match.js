// 현재 페이지 정보
let currentPage = 1;
const totalPages = 7;

// 더미 데이터 (백엔드 연결 시 API 호출로 대체 가능)
const topic = "가장 감동적인 사랑 이야기";
const books = [
  { title: "책 제목 1", cover: "placeholder1.jpg", summary: "이 책은 정말 감동적입니다." },
  { title: "책 제목 2", cover: "placeholder2.jpg", summary: "이 책은 또 다른 감동을 줍니다." },
];

// HTML 요소 참조
const topicElement = document.getElementById("topic");
const pageInfoElement = document.getElementById("page-info");
const book1TitleElement = document.getElementById("book1-title");
const book1CoverElement = document.getElementById("book1-cover");
const book2TitleElement = document.getElementById("book2-title");
const book2CoverElement = document.getElementById("book2-cover");
const nextPageButton = document.getElementById("next-page");
const viewDetailsButton = document.getElementById("view-details");

// 초기화 함수
function initializePage() {
  // 주제와 현재 페이지 표시
  topicElement.textContent = `주제: ${topic}`;
  pageInfoElement.textContent = `현재 페이지: ${currentPage} / ${totalPages}`;

  // 책 정보 표시
  book1TitleElement.textContent = books[0].title;
  book1CoverElement.src = books[0].cover;
  book2TitleElement.textContent = books[1].title;
  book2CoverElement.src = books[1].cover;
}

// 이벤트 핸들러: 다음 페이지로 이동
nextPageButton.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    pageInfoElement.textContent = `현재 페이지: ${currentPage} / ${totalPages}`;
  } else {
    alert("마지막 페이지입니다.");
  }
});

// 이벤트 핸들러: 책 상세보기
viewDetailsButton.addEventListener("click", () => {
  alert(`
    ${books[0].title}: ${books[0].summary}
    ${books[1].title}: ${books[1].summary}
  `);
});

// 페이지 초기화
initializePage();
