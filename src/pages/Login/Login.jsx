// 로그인 관련 컴포넌트
import React from "react";
import "./Login.css";

const Login = () => {
  const handleLogin = () => {
    alert("로그인에 성공하셨습니다!");
  };

  const navigateToSignup = () => {
    window.location.href = "/signup"; // 회원가입 경/로 이동
  };

  return (
    <div className="login-page">
        <main className="loginmain">
            <h2>로그인</h2>

            <input type="text" id="username" placeholder="아이디" required />
            <input type="password" id="password" placeholder="비밀번호" required />
            <button type="submit" className="loginBtn">로그인</button>

            <div className="signup-section">
                <p>아직 회원이 아니신가요?</p>
                <button className="signupBtn" onClick={navigateToSignup}>회원가입 하기</button>
            </div>
        </main>      
    </div>
  );
};

export default Login;