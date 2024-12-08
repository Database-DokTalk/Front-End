import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    try {
      const { username, password } = credentials;

      // 로그인 API 호출
      const response = await fetch("http://13.124.74.53:8080/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // 요청 데이터 타입
        },
        body: JSON.stringify({
          userId: username,
          password: password,
        }),
      });

      // 응답 상태에 따라 처리
      if (response.status === 200) {
        const data = await response.json();

        // 사용자 ID 저장 (토큰 대신)
        const id = data.result?.id; // 서버 응답 구조에 따라 userId 경로 수정
        const userId = data.result?.userId;
        if (id && userId) {
          localStorage.setItem("id", id); // 고유 ID를 localStorage에 저장
          localStorage.setItem("userId", userId); // 표시할 사용자 ID 저장
          alert(`로그인 성공! ${userId}님, 환영합니다.`);
          window.location.href = "/"; // 로그인 성공 후 페이지 이동
        } else {
          alert("로그인에 성공했지만 사용자 ID가 없습니다.");
        }
      } else if (response.status === 401) {
        alert("로그인 실패: 아이디 또는 비밀번호를 확인해주세요.");
      } else {
        alert("로그인 실패: 서버 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("로그인 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const navigateToSignup = () => {
    window.location.href = "/signup"; // 회원가입 경로로 이동
  };

  return (
    <div className="login-page">
      <main className="loginmain">
        <h2>로그인</h2>

        <input
          type="text"
          name="username"
          placeholder="아이디"
          value={credentials.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button type="button" className="loginBtn" onClick={handleLogin}>
          로그인
        </button>

        <div className="signup-section">
          <p>아직 회원이 아니신가요?</p>
          <button className="signupBtn" onClick={navigateToSignup}>
            회원가입 하기
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
