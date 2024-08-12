// src/pages/MemberForm.js

import axios from "axios";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function MemberForm() {
    //라아트 페이지 이동을 javascript 할때 사용하는 함수
    const navigate = useNavigate()

    //입력한 이름과 주소를 상태값으로 관리  {name:"xxx", addr:"xxx"}
    const [state, setState] = useState({})

    //이름 혹은 주소를 입력했을때 호출되는 함수
    const handleChange = (e)=>{
        //change event 가 읽어난 요소에 입력한 값을 state 값으로 반영한다.
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }
    //추가 버튼을 눌렀을때 호출되는 함수
    const handleSave = ()=>{
        //state 로 관리되는 object 를 전송한다 (요청의 body 에 json 문자열이 전송된다)
        axios.post("/members", state)
        .then(res=>{
            console.log(res.data)
            alert(res.data.name+" 님의 정보가 추가 되었습니다");
            // 현재 위치는 "/members/new" 인데  "/members" 로 이동하면 회원 목록이 나온다.
            navigate("/members")
        })
        .catch(error=>console.log(error))
    }

    return (
        <>
            <h1>회원 추가 양식</h1>
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="name">
                    <Form.Label column sm={2}>이름</Form.Label>
                    <Col sm={10}>
                        <Form.Control onChange={handleChange}  type="text" name="name" placeholder="이름 입력..." />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="addr">
                    <Form.Label column sm={2}>주소</Form.Label>
                    <Col sm={10}>
                        <Form.Control onChange={handleChange} type="text" name="addr" placeholder="주소 입력..." />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button onClick={handleSave} variant="primary" >추가</Button>
                    </Col>
                </Form.Group>
            </Form>
        </>
    );
}

export default MemberForm;