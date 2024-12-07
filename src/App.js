// 앱의 최상위 컴포넌트
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header"; // 상단바 컴포넌트
import Login from "./pages/Login/Login";
import SignUp from "./pages/Login/SignUp";
import RecordList from "./pages/RecordBook/RecordList";
import RecordDetail from "./pages/RecordBook/RecordDetail"; // 상세 페이지 컴포넌트
import RecordWrite from "./pages/RecordBook/RecordWrite";
import BoardList from "./pages/Board/BoardList";
import BoardDetail from "./pages/Board/BoardDetail";
import PostForm from "./pages/Discussion/PostForm";
import Discussion from "./pages/Discussion/Discussion";
import MyPage from "./pages/MyPage/MyPage";
import WorldcupList from "./pages/Worldcup/WorldcupList";
import initialRecords from "./data/records";

function App() {
  const [records, setRecords] = useState(initialRecords); // 독서 기록 리스트 상태
  const [postData, setPostData] = useState(null);
  // const [discussions, setDiscussions] = useState(discussionsData);

  const handlePostSubmit = (data) => {
    setPostData(data);
  };

  return (
    <div>
      <Header />
      <main>
        <Routes>
          {/* <Route path="/" element={<Navigate to="/" />} /> */}
          <Route path="/login" element={<Login />} /> {/* 로그인 페이지 */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/record" element={<RecordList records={records} />} />
          <Route path="/record/:id" element={<RecordDetail records={records} />} />
          <Route path="/record/write" element={<RecordWrite setRecords={setRecords} records={records} />} />
          <Route path="/board" element={<BoardList />} />
          <Route path="/board/:id" element={<BoardDetail />} />
          <Route
            path="/postform"
            element={<PostForm onSubmit={handlePostSubmit} />}
          />
          <Route
            path="/discussion"
            element={
              postData ? (
                <Discussion
                  post={postData}
                  onBack={() => {
                    window.history.back();
                  }}
                />
              ) : (
                <div>게시글 데이터가 없습니다.</div>
              )
            }
          />
          <Route path="/worldcup" element={<WorldcupList />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
