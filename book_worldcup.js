// 선택한 주제를 저장
let selectedTopic = null;

// 모든 선택 버튼에 클릭 이벤트 추가
document.querySelectorAll('.select-button').forEach((button, index) => {
  button.addEventListener('click', () => {
    // 선택된 주제 업데이트
    selectedTopic = button.previousElementSibling.previousElementSibling.innerText;

    // 모든 카드의 선택 상태 초기화
    document.querySelectorAll('.topic').forEach(topic => {
      topic.style.border = "1px solid #ddd";
    });

    // 현재 클릭된 카드에 강조 스타일 적용
    button.parentElement.style.border = "2px solid #7D493C";
  });
});

// 시작하기 버튼 클릭 이벤트
document.getElementById('start-button').addEventListener('click', () => {
  if (selectedTopic) {
    alert(`${selectedTopic} 주제로 시작합니다!`);
    // 다음 라운드 페이지로 이동
    window.location.href = "round_page.html";
  } else {
    alert("주제를 선택해주세요!");
  }
});
