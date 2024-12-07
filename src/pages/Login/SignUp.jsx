// 회원가입 관련 컴포넌트
import React, { useState } from "react";
import "./SignUp.css";

const SignUp = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // 기본 폼 제출 동작 방지

        // 폼 데이터 수집
        const formData = {
            userId: event.target.username.value,
            password: event.target.password.value,
            name: event.target.name.value,
            phoneNumber: event.target.phone.value,
            imageUrl: "string", // 백엔드에서 임시로 요구하는 값
        };

        try {
            // 백엔드 API 호출
            const response = await fetch("http://13.124.74.53:8080/user/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            // 응답 처리
            if (response.status === 200) {
                const data = await response.json();
                alert("회원가입 성공! 환영합니다.");
                // 추가 동작: 로그인 페이지로 이동
                window.location.href = "/login";
            } else if (response.status === 500) {
                // 백엔드의 에러 핸들러가 없을 경우의 처리
                alert("회원가입 실패: 아이디가 중복되었습니다.");
            } else {
                // 서버에서 반환한 다른 에러 메시지 출력
                const errorData = await response.json();
                alert("회원가입 실패: " + errorData.message);
            }
        } catch (error) {
            console.error("Error during signup:", error);
            alert("회원가입 중 문제가 발생했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className="signup-page">
            <main className="signupmain">
                <div className="signup-container">
                    <form onSubmit={handleSubmit}>
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