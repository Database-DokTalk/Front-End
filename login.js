// DOMContentLoaded는 HTML이 완전히 로드된 후 실행되도록 보장합니다.
document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("login-btn"); // 로그인 버튼 가져오기

  // 버튼 클릭 이벤트 추가
  loginButton.addEventListener("click", () => {
      // 로그인 로직이 성공적으로 수행되었다고 가정
      alert("로그인에 성공하셨습니다!"); // 팝업 메시지 표시
  });
});


document.querySelector(".signup-btn").addEventListener("click", () => {
  window.location.href = "signup.html"; // 회원가입 페이지로 이동
});