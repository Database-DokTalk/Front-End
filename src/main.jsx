import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { BrowserRouter } from 'react-router-dom'; // 추가된 부분

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter> {/* 추가된 부분 */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);