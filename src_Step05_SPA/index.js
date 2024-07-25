import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// App.js 를 import 해서 
import App from './App';
import reportWebVitals from './reportWebVitals';
/*
  설치된 react-router-dom 으로 부터 BrowserRouter 를 import 해서
  App 컴포넌트를 감싸준다. 
*/
import { BrowserRouter } from 'react-router-dom';

//id 가 root 인 곳에 UI 출력하기 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />  
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
