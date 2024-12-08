import React from "react";
import "./Banner.css";

function Banner() {
  return (
    <div className="banner">
      <img
        src="/banner.png" // public 폴더 내 이미지 경로
        alt="독서 배너"
        className="banner-image"
      />
    </div>
  );
}

export default Banner;