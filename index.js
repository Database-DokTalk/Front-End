// 초기 화면 JavaScript 동작 추가 (필요 시 활용)
document.addEventListener("DOMContentLoaded", () => {
    // 예: 로그인 버튼 클릭 시 이벤트
    const loginButton = document.querySelector(".login-btn");
    loginButton.addEventListener("click", () => {
      alert("로그인 페이지로 이동합니다!");
    });
  
    // 예: 회원가입 버튼 클릭 시 이벤트
    const signupButton = document.querySelector(".signup-btn");
    signupButton.addEventListener("click", () => {
      alert("회원가입 페이지로 이동합니다!");
    });
  });

