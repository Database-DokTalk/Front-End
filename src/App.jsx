import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header"; // 공통 상단바 컴포넌트
import RecordPage from "./RecordPage";
import RecordDetail from "./RecordDetail";
import RecordWrite from "./RecordWrite";
import BoardPage from "./BoardPage";
import DiscussionPage from "./DiscussionPage";
import WorldCupPage from "./WorldCupPage";
import MyPage from "./MyPage";

function App() {
  return (
    <Router>
      <Header /> {/* 고정된 상단바 */}
      <main>
        <Routes>
          <Route path="/record" element={<RecordPage />} />
          <Route path="/record/:id" element={<RecordDetail />} />
          <Route path="/record/write" element={<RecordWrite />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/discussion" element={<DiscussionPage />} />
          <Route path="/worldcup" element={<WorldCupPage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;