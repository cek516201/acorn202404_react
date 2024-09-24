// src/pages/UserForm.js

import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import AlertModal from "../components/AlertModal"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

//userName 을 검증할 정규표현식
const reg_userName=/^[a-zA-Z].{4,9}$/
//password 를 검증할 정규표현식
const reg_password=/[\W]/
//email 을 검증할 정규표현식
const reg_email=/@/

function UserForm() {
    //폼에 입력한 내용을 상태값으로 관리
    const [formData, setFormData] = useState({
        userName:"",
        password:"",
        password2:"",
        email:""
    })
    //폼에 입력한 내용의 유효성 여부를 상태값으로 관리하기
    const [isValid, setValid] = useState({
        userName:false, // userName 이 유효한지 여부   isValid.userName 으로 참조
        password:false, // password 가 유효한지 여부   isValid.password 로 참조
        email:false // email 이 유효한지 여부 isValid.email 로 참조 
    })
    // userName, password, email 이 더럽혀 졌는지 여부(한번이라도 입력한적이 있는지여부) 를 상태값으로 관리
    const [isDirty, setDirty] = useState({
        userName:false,
        password:false,
        email:false
    })


    // 아이디, 비밀번호, 이메일을 입력했을때 호출되는 함수 
    const handleChange = (e)=>{
        // e.target 은 object 이다. object 의 내용을 분해 할당
        const {name, value} = e.target
        
        //만일 현재 입력란이 아직 더럽혀지지 않았다면 
        if(!isDirty[name]){
            //더럽혀 졌는지 여부를 변경하기 
            setDirty({
                ...isDirty,
                [name]:true
            })
        }

        setFormData({
            ...formData,
            [name]:value
        })

        //입력한 내용 검증하기
        validate(name, value)
    }

    //validation 을 수행하는 함수 만들기
    const validate = (name, value)=>{
        if(name === "userName"){
            //현재까지 입력한 userName 을 서버에 보내서 사용가능 여부를 응답 받는다. 
            axios.get(`/user/check_username/${value}`)
            .then(res=>{
                // res.data 는  {canUse:true} or {canUse:false} 가 되게 API 서버에 코딩을 해야한다.
                setValid({
                    ...isValid,
                    [name]:reg_userName.test(value) && res.data.canUse
                })
            })
            .catch(error=>{
                console.log(error)
            })
        }else if(name === "password"){
            //현재 입력한 내용이 password2 에 입력한 내용과 같은지 알아낸다
            const isEqual = value === formData.password2

            setValid({
                ...isValid,
                password:reg_password.test(value) && isEqual
            })

        }else if(name === "password2"){
            //현재 입력한 내용이 password 에 입력한 내용과 같은지 알아낸다
            const isEqual = value === formData.password

            setValid({
                ...isValid,
                password:reg_password.test(value) && isEqual
            })

        }else if(name === "email"){
            setValid({
                ...isValid,
                [name]:reg_email.test(value)
            })
        }
    }

    //폼 전송 이벤트가 일어 났을때 호출되는 함수 
    const handleSubmit = (e)=>{
        e.preventDefault()
        //axios 를 이용해서 현재까지 입력한 회원정보를 전송한다.
        axios.post("/user", formData)
        .then(res=>{
            console.log(res.data)
            setAlertShow(true)
        })
        .catch(error=>{
            console.log(error)
        })
    }
    // 알림 모달의 상태관리 
    const [alertShow, setAlertShow] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleYes = ()=>{
        //현재 위치를  "/" 최상위 경로로 변경한다.
        navigate("/")
        //로그인 모달을 띄워준다.
        const action = {
            type:"LOGIN_MODAL",
            payload:{show:true, message:"가입한 아이디로 로그인 하세요"}
        }
        dispatch(action)
    }
    return (
        <>
            <AlertModal show={alertShow} message={`${formData.userName} 님 가입 되었습니다`} 
                yes={handleYes}/>
            <h1>회원 가입 양식</h1>
            <Form onSubmit={handleSubmit} noValidate>
                <Form.Group controlId="id" className="mb-3" >
                    <Form.Label>아이디</Form.Label>
                    {/* isInvalid 속성은 유효하지 않은지 여부를 관리한다 , isValid 속성은 유효한지여부 */}
                    <Form.Control isValid={isValid.userName} isInvalid={!isValid.userName && isDirty.userName} onChange={handleChange}  type="text" name="userName" placeholder="아이디 입력..."/>
                    <div className="form-text">
                        영문자로 시작하고 5~10 글자 이내로 작성하세요
                    </div>
                    <Form.Control.Feedback type="invalid">
                        사용할수 없는 아이디 입니다
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="password" className="mb-3">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control isValid={isValid.password} isInvalid={!isValid.password && isDirty.password} onChange={handleChange} type="password" name="password" placeholder="비밀번호 입력..."/>
                    <div className="form-text">
                        특수문자를 1개 이상 포함하세요
                    </div>
                    <Form.Control.Feedback type="invalid">
                        비밀번호를 확인하세요!
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password2" className="mb-3">
                    <Form.Label>비밀번호 확인</Form.Label>
                    <Form.Control onChange={handleChange} type="password" name="password2" placeholder="비밀번호 입력..."/>
                </Form.Group>

                <Form.Group controlId="email" className="mb-3">
                    <Form.Label>이메일</Form.Label>
                    <Form.Control isValid={isValid.email} isInvalid={!isValid.email && isDirty.email} onChange={handleChange} type="emal" name="email" placeholder="이메일 입력..."/>
                    <Form.Control.Feedback type="invalid">
                        이메일 형식에 맞게 입력해 주세요
                    </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" disabled={!isValid.userName || !isValid.password || !isValid.email} variant="primary" type="submit">가입</Button>
            </Form>
        </>
    );
}

export default UserForm;