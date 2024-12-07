import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyPage.css";

const MyPage = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null); // 사용자 정보를 저장할 상태
    const isLoggedIn = true; // 실제 로그인 여부는 상태나 컨텍스트로 관리해야 합니다.

    useEffect(() => {
        // 로그인 상태 확인
        if (!isLoggedIn) {
            alert("로그인이 필요합니다."); // 경고 문구
            navigate("/login"); // 로그인 페이지로 리다이렉트
        } else {
            // 마이페이지 데이터 가져오기
            fetch("http://13.124.74.53:8080/user/signup", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // 인증 쿠키 포함 (필요한 경우)
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error("Failed to fetch user data");
                })
                .then((data) => {
                    setUserInfo(data); // 데이터 저장
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                    alert("마이페이지 데이터를 불러오는데 실패했습니다.");
                });
        }
    }, [isLoggedIn, navigate]);

    if (!isLoggedIn) {
        return null; // 리다이렉트가 처리되는 동안 아무것도 렌더링하지 않음
    }

    if (!userInfo) {
        return <div>Loading...</div>; // 데이터 로딩 중
    }

    return (
        <div className="mypage-page">
            <main className="mypagemain">
                <div className="mypage-left" style={{ alignItems: "center" }}>
                    <div className="mypage-title">회원정보</div>
                    <img className="profile" alt="User Profile Image" src="/logo.png" />

                    <div className="userinfo">
                        <p className="username">{userInfo.name}</p>
                        <p className="userid">{userInfo.userId}</p>
                    </div>
                </div>

                <div className="mypage-right">
                    <table className="mypage-table">
                        <thead className="titlehead">
                            <tr>
                                <td colSpan="3" className="tabletitle">내 프로필</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="tablerow">
                                <td className="table-icon">
                                    <img className="mypage-icon" src="/name-icon.png" alt="이름 아이콘" />
                                </td>
                                <td className="label">이름: </td>
                                <td className="value">{userInfo.name}</td>
                            </tr>
                            <tr className="tablerow">
                                <td className="table-icon">
                                    <img className="mypage-icon" src="/id-icon.png" alt="아이디 아이콘" />
                                </td>
                                <td className="label">아이디: </td>
                                <td className="value">{userInfo.userId}</td>
                            </tr>
                            <tr className="tablerow">
                                <td className="table-icon">
                                    <img className="mypage-icon" src="/phone-icon.png" alt="전화번호 아이콘" />
                                </td>
                                <td className="label">전화번호: </td>
                                <td className="value">{userInfo.phoneNumber}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default MyPage;
