import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
/* 현재 경로에 있는 App.js 파일을 import 해서 App 라는 이름으로 사용하겠다 라는 의미 */
import App from './App3';
import reportWebVitals from './reportWebVitals';

/* index.html 파일에 id 가 root 인 요소를 최상위 컴포넌트로 사용할 준비 */
const root = ReactDOM.createRoot(document.getElementById('root'));
//최상위 컴포넌트에 App 를 렌더링하기 
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
