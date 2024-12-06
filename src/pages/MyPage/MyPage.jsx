// 마이페이지 관련 컴포넌트 중 MyPage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MyPage.css";

const MyPage = () => { 
    const navigate = useNavigate();
    const isLoggedIn = false; // 실제 로그인 여부는 상태나 컨텍스트로 관리해야 합니다.

    // 로그인 상태 확인
    useEffect(() => {
        if (!isLoggedIn) {
            alert("로그인이 필요합니다."); // 경고 문구
            navigate("/login"); // 로그인 페이지로 리다이렉트
        }
    }, [isLoggedIn, navigate]);

    if (!isLoggedIn) {
        return null; // 리다이렉트가 처리되는 동안 아무것도 렌더링하지 않음
    }

    return (
        <div className="mypage-page"> 
            <main className="mypagemain"> 
                <div className="mypage-left" style={{alignItems: "center"}}>
                    <div className="mypage-title">회원정보</div>
                    <img className="profile" alt="User Profile Image" src="/logo.png" /> 

                    <div className="userinfo">
                        <p className="username">유저 이름</p>
                        <p className="userid">아이디</p>
                    </div>
                </div>

                <div className="mypage-right">
                    <table className="mypage-table">
                        <thead className="titlehead">
                            <tr>
                                <td colspan="3"className="tabletitle">내 프로필</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="tablerow">
                                <td className="table-icon">
                                    <img className="mypage-icon" src="/name-icon.png" alt="이름 아이콘" />
                                </td>
                                <td className="label">이름: </td>
                                <td className="value">피그마</td>
                            </tr>
                            <tr className="tablerow">
                                <td className="table-icon">
                                    <img className="mypage-icon" src="/id-icon.png" alt="아이디 아이콘" />
                                </td>
                                <td className="label">아이디: </td>
                                <td className="value">figma0724</td>
                            </tr>
                            <tr className="tablerow">
                                <td className="table-icon">
                                    <img className="mypage-icon" src="/phone-icon.png" alt="전화번호 아이콘" />
                                </td>
                                <td className="label">전화번호: </td>
                                <td className="value">010-xxxx-xxxx</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default MyPage;