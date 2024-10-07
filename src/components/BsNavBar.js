// src/components/BsNavBar.js

import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AlertModal from "./AlertModal";
import { useEffect, useState } from "react";
import axios from "axios";

function BsNavBar() {
    //로그인된 사용자명이 있는지 store 에서 읽어와 본다.
    const userName=useSelector(state=>state.userName)
    // action 을 dispatch 할수 있는 함수 
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //"로그아웃 되었습니다" 모달을 띄울지 여부 
    const [alertShow, setAlertShow] = useState(false)

    const handleLogout = ()=>{
        //localStorage 에서 token 을 삭제한다
        delete localStorage.token
        // userName 을 null 로 변경
        dispatch({type:"UPDATE_USER", payload: null})
        //최상위 경로로 이동
        navigate("/")
        // 알림 모달 띄우기
        setAlertShow(true)
        // axios 의 요청 Header 에 설정된값 초기화 하기
        delete axios.defaults.headers.common["Authorization"]
    }

    const handleYes = ()=>{
        //알림 모달 숨기기
        setAlertShow(false)
    }
    
    return (
        <>  
            <AlertModal show={alertShow} message={"로그 아웃 되었습니다"} yes={handleYes}/>
            <Navbar fixed="top" expand="md" className="bg-warning mb-2">
                
                <Container>
                    <Navbar.Brand as={NavLink} to="/">Acorn</Navbar.Brand>
                    <Navbar.Toggle aria-controls="one"/>
                    <Navbar.Collapse id="one">
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                            <Nav.Link as={NavLink} to="/members">Member</Nav.Link>
                            <Nav.Link as={NavLink} to="/posts">Post</Nav.Link>
                            <Nav.Link as={NavLink} to="/gallery">Gallery</Nav.Link>
                            <Nav.Link as={NavLink} to="/cafes">Cafe</Nav.Link>
                        </Nav>
                        { userName ? 
                            <>
                                <Nav>
                                    <Nav.Link as={Link} to="/user/detail">{userName}</Nav.Link>
                                    <span className="navbar-text">Signed in</span>
                                </Nav>
                                <Button className="ms-1" size="sm" variant="outline-primary" onClick={handleLogout}>Logout</Button>
                            </>
                            :
                            <>
                                <Button className="me-1" size="sm" variant="success" onClick={()=>{
                                    //로그인 모달을 띄우는 action 을 dispatch 한다 
                                    const action = {
                                        type:"LOGIN_MODAL", 
                                        payload:{
                                            show:true,
                                            message:"로그인 폼 입니다"     
                                        }
                                    }
                                    dispatch(action)
                                }}>Sign in</Button>
                                <Button size="sm" variant="primary" onClick={()=>navigate("/user/new")}>Sign up</Button>
                            </>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>

    );
}

export default BsNavBar;