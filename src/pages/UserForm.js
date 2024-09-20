// src/pages/UserForm.js

import { useState } from "react";
import { Button, Form } from "react-bootstrap";


function UserForm() {
    //폼에 입력한 내용을 상태값으로 관리
    const [formData, setFormData] = useState({
        userName:"",
        password:"",
        email:""
    })
    // 아이디, 비밀번호, 이메일을 입력했을때 호출되는 함수 
    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    return (
        <>
            <h1>회원 가입 양식</h1>
            <Form>
                <Form.Group controlId="id" className="mb-3">
                    <Form.Label>아이디</Form.Label>
                    <Form.Control onChange={handleChange}  type="text" name="userName" placeholder="아이디 입력..."/>
                    <div className="form-text">
                        영문자로 시작하고 5~10 글자 이내로 작성하세요
                    </div>
                    <Form.Control.Feedback type="invalid">
                        사용할수 없는 아이디 입니다
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="password" className="mb-3">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control onChange={handleChange} type="password" name="password" placeholder="비밀번호 입력..."/>
                    <div className="form-text">
                        특수문자를 1개 이상 포함하세요
                    </div>
                    <Form.Control.Feedback type="invalid">
                        사용할수 없는 비밀번호 입니다
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="email" className="mb-3">
                    <Form.Label>이메일</Form.Label>
                    <Form.Control onChange={handleChange} type="emal" name="email" placeholder="이메일 입력..."/>
                    <Form.Control.Feedback type="invalid">
                        이메일 형식에 맞게 입력해 주세요
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit">가입</Button>
            </Form>
        </>
    );
}

export default UserForm;