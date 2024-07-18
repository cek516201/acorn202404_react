// src/App2.js

import React, { Component } from 'react';
// ./css/bootstrap.css 로딩하기
//import "./css/bootstrap.css" //직접 가져다 놓은 css 로딩 

/*
    npm install bootstrap  으로 설치한 bootstrap css 로딩하기
*/
import "bootstrap/dist/css/bootstrap.css"
/*
    npm install bootstrap  으로 설치한 bootstrap.js 로딩하기
*/
import "bootstrap/dist/js/bootstrap.js"

class App2 extends Component {

    render() {
        return (
            <div className='container'>
                <h3>인덱스 페이지</h3>
                <button className='btn btn-primary'>버튼</button>
            </div>
        );
    }
}

export default App2;