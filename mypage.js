document.addEventListener("DOMContentLoaded", () => {
    // 1. 프로필 정보 가져오기
    fetch("/api/profile") // 백엔드의 프로필 API 호출
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("profile-name").textContent = data.name;
        document.getElementById("profile-id").textContent = data.id;
        document.getElementById("profile-phone").textContent = data.phone;
      })
      .catch((error) => console.error("프로필 정보 로드 실패:", error));
 
  });
  