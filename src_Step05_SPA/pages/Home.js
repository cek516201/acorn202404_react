// src/pages/Home.js 파일

import React, { Component } from 'react';

class Home extends Component {
    render() {
        return (
            <>
                <h2>Home 페이지 입니다</h2>
                <p>어쩌구 저쩌구</p>
                <h3>공지사항</h3>
                <ul>
                    <li>장마철입니다</li>
                    <li>어쩌구...</li>
                    <li>저쩌구...</li>
                </ul>
            </>
        );
    }
}

export default Home;