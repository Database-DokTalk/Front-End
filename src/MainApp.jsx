import React from "react";
import Header from "./components/Header"; // 공통 상단바 컴포넌트
import "./MainApp.css";

const MainApp = () => {
  return (
    <>
      {/* 헤더 컴포넌트 */}
      <Header userName={null} />

      {/* 메인 콘텐츠 */}
      <main>
        {/* 배너 */}
        <div className="banner"></div>
      
        {/* 문구 */}
        <div className="banner-text">
          <h2>지금, 당신만의 독서 여정을 시작하세요.</h2>
        </div>
      </main>
    </>
  );
};

export default MainApp;