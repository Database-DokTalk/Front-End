import React from "react";
import { NavLink, useNavigate } from "react-router-dom"; // React Router의 NavLink 컴포넌트
import "./Header.css";

const Header = ({ userName }) => {
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  const goToLogin = () => {
    navigate("/login"); // '로그인' 경로로 이동
  };

  const goToSignup = () => {
    navigate("/signup"); // '회원가입' 경로로 이동
  };

  const goToHome = () => {
    navigate(""); // '홈' 경로로 이동
  };

  return (
    <header className="header">
      <div className="logo" onClick={goToHome}>
        <img src="/logo.png" alt="DokTalk Logo" className="logo-image" />
        독톡 DokTalk
      </div>
      
      <div className="header-right">
        {/* 로그인 여부 표시 */}
        <div className="header-user-info">
          {userName ? (
            <span>{userName} 님</span>
          ) : (
            <div className="auth-button">
              <button type="submit" className="login-button" onClick={goToLogin}>로그인</button>
              <div>|</div>
              <button type="submit" className="signup-button" onClick={goToSignup}>회원가입</button>
            </div>
          )}
        </div>
        
        <nav className="nav">
          <NavLink to="/record" activeClassName="active">기록장</NavLink>
          <NavLink to="/board" activeClassName="active">게시판</NavLink>
          <NavLink to="/discussion" activeClassName="active">토론방</NavLink>
          <NavLink to="/worldcup" activeClassName="active">독서월드컵</NavLink>
          <NavLink to="/mypage" activeClassName="active">마이페이지</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
