import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyPage.css";

const MyPage = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const [error, setError] = useState(null); // 에러 상태 추가

    // 로그인 정보에서 userId 가져오기
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        // 로그인하지 않은 경우 로그인 페이지로 리디렉션
        if (!userId) {
            setError("로그인이 필요합니다.");
            setLoading(false);
            navigate("/login");
            return;
        }

        // 마이페이지 데이터 가져오기
        fetch(`http://13.124.74.53:8080/user/mypage?userId=${userId}`, {
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
                console.log(data);
                if (data.isSuccess) {
                    setUserInfo(data.result); // 데이터 결과가 성공적이면 저장
                } else {
                    setError(data.message); // 실패 메시지 처리
                }
                setLoading(false); // 로딩 완료
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
                setError(error.message);
                setLoading(false); // 로딩 완료
            });
    }, [userId, navigate]);

    // 로딩 중 처리
    if (loading) {
        return <div>Loading...</div>;
    }

    // 에러 처리
    if (error) {
        return <div>오류가 발생했습니다: {error}</div>;
    }

    return (
        <div className="mypage-page">
            <main className="mypagemain">
                <div className="mypage-left" style={{ alignItems: "center" }}>
                    <div className="mypage-title">회원정보</div>
                    <img className="profile" alt="User Profile" src="/logo.png" />
                    <div className="userinfo">
                        {/* userInfo에서 이름과 아이디, 전화번호를 표시 */}
                        <p className="username">{userInfo?.name}</p>
                        <p className="userid">{userInfo?.userId}</p>
                        <p className="phone">{userInfo?.phoneNumber}</p> {/* 전화번호 추가 */}
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
                                <td className="value">{userInfo?.name}</td>
                            </tr>
                            <tr className="tablerow">
                                <td className="table-icon">
                                    <img className="mypage-icon" src="/id-icon.png" alt="아이디 아이콘" />
                                </td>
                                <td className="label">아이디: </td>
                                <td className="value">{userInfo?.userId}</td>
                            </tr>
                            <tr className="tablerow">
                                <td className="table-icon">
                                    <img className="mypage-icon" src="/phone-icon.png" alt="전화번호 아이콘" />
                                </td>
                                <td className="label">전화번호: </td>
                                <td className="value">{userInfo?.phoneNumber}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default MyPage;
