// src/App3.js

import 'bootstrap/dist/css/bootstrap.css'
import { Alert, Col, Container, Image, Row } from 'react-bootstrap';
// npm install holderjs 했기 때문에 import 할수있다 (javscript 로딩)
import 'holderjs'

function App3() {
    const color="success"
    return (
        <Container>
            <h3>컴포넌트 사용해 보기</h3>
            <Alert variant="primary">
                전송하였습니다!
            </Alert>
            <Alert variant={color}>알림</Alert>
            <img data-src="holder.js/100x100" alt="셈플이미지" />
            <img data-src="holder.js/200x200?theme=lava"/>
            <br />
            <Row>
                <Col><img data-src="holder.js/100px200?theme=lava"/></Col>
                <Col><img data-src="holder.js/100px200?theme=vine"/></Col>
            </Row>
            <p> Image component 에서는 data-src 대신에 src 를 사용하면 된다 </p>
            <Row>
                <Col><Image data-src="holder.js/100px200?theme=sky&outline=yes"/></Col>
                <Col><Image data-src="holder.js/100px200?theme=vine&outline=yes"/></Col>
            </Row>
            <Row>
                <Col xs={6} md={4}>
                    <Image data-src="holder.js/100px180" rounded />
                </Col>
                <Col xs={6} md={4}>
                    <Image data-src="holder.js/100px180" roundedCircle />
                </Col>
                <Col xs={6} md={4}>
                    <Image data-src="holder.js/100px180" thumbnail />
                </Col>
            </Row>
        </Container>
    );
}

export default App3;