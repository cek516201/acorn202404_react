// src/App4.js

import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import { Button } from 'react-bootstrap';

class App4 extends Component {
    render() {
        return (
            <div>
                <h1>React Bootstrap component 사용</h1>
                <Button variant='primary'>버튼</Button>
                <Button variant='success'>버튼</Button>
                <Button variant='danger'>버튼</Button>
            </div>
        );
    }
}

export default App4;