import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // localStorage에서 userId 확인
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId); // 로그인된 사용자 이름 설정
    }
  }, []);

  const goToLogin = () => {
    navigate("/login");
  };

  const goToSignup = () => {
    navigate("/signup");
  };

  const goToHome = () => {
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("id"); // 사용자 ID 삭제
    localStorage.removeItem("userId"); // 표시용 사용자 ID 삭제
    setUserId(null); // 상태 초기화
    alert("로그아웃 되었습니다.");
    navigate("/"); // 홈으로 이동
  };

  return (
    <header className="header">
      <div className="logo" onClick={goToHome}>
        <img src="/logo.png" alt="DokTalk Logo" className="logo-image" />
        독톡 DokTalk
      </div>
      
      <div className="header-right">
        <div className="header-user-info">
          {userId ? (
            <div className="userinfo-space">
              <span>{userId} 님</span>
              <button className="logout-button" onClick={handleLogout}>
                로그아웃
              </button>
            </div>
          ) : (
            <div className="auth-button">
              <button className="login-button" onClick={goToLogin}>로그인</button>
              <div>|</div>
              <button className="signup-button" onClick={goToSignup}>회원가입</button>
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
