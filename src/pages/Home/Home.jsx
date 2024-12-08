import React from "react";
import "./Home.css";

function Home() {
  return (
    <div>
        <div className="banner">
            <img
                src="/banner.png" // public 폴더 내 이미지 경로
                alt="독서 배너"
                className="banner-image"
            />
        </div>
        <div className="main-text">지금, 당신만의 독서 여정을 시작하세요.</div>
    </div>
  );
}

export default Home;