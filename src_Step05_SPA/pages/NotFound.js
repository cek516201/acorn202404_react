// src/pages/NotFound.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFound extends Component {
    render() {
        return (
            <>
                <h2>404 NotFound</h2>
                <p>해당 페이지는 존재 하지 않습니다</p>
                <Link to="/">Home 페이지로 가기</Link>
            </>
        );
    }
}

export default NotFound;