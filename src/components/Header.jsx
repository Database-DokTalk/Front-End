import React from "react";
import { NavLink } from "react-router-dom"; // React Router의 NavLink 컴포넌트
import "./Header.css";

const Header = ({ userName }) => {
  return (
    <header className="header">
      <div className="logo">
        <img src="/logo.png" alt="DokTalk Logo" className="logo-image" />
        독톡 DokTalk
      </div>
      <nav className="nav">
        <NavLink to="/record" activeClassName="active">기록장</NavLink>
        <NavLink to="/board" activeClassName="active">게시판</NavLink>
        <NavLink to="/discussion" activeClassName="active">토론방</NavLink>
        {/* <NavLink to="/worldcup" activeClassName="active">독서월드컵</NavLink> */}
        {/* <NavLink to="/mypage" activeClassName="active">마이페이지</NavLink> */}
      </nav>
      <div className="user-info">{userName} 님</div>
    </header>
  );
};

export default Header;
