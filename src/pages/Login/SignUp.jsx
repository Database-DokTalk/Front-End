// 회원가입 관련 컴포넌트
import React, { useState } from "react";
import "./SignUp.css";

const SignUp = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };
    
    return (
        <div className="signup-page">
            <main className="signupmain">
                <div className="signup-container">
                    <form>
                        <label htmlFor="username">아이디를 입력해주세요 (6자 이상)</label>
                        <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="아이디"
                        required
                        minLength="6"
                        />

                        <label htmlFor="password">비밀번호를 입력해주세요 (8자 이상)</label>
                        <div className="password-wrapper">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="비밀번호"
                                required
                                minLength="8"
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={togglePasswordVisibility}
                            >
                                {passwordVisible ? "🙈" : "👁"}
                            </button>
                        </div>

                        <label htmlFor="name">이름을 입력해주세요</label>
                        <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="이름"
                        required
                        />

                        <label htmlFor="phone">전화번호를 입력해주세요</label>
                        <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="전화번호"
                        required
                        />

                        <button type="submit" className="signup-btn">
                        회원가입 하기
                        </button>
                        <p>
                        <a href="/login" className="return-to-login">
                            로그인 페이지로 돌아가기
                        </a>
                        </p>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default SignUp;