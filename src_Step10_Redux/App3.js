// src/App3.js

import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react';
import { Alert, Button, Container, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

function App3() {

    //로그인 여부를 store 로 부터 읽어오기
    const isLogin=useSelector(state=>state.isLogin)
    //로그인된 userName 을 store 로 부터 읽어오기
    const userName=useSelector(state=>state.userName)
    
    // store 에서 관리되는 state 를 변경하고 싶을때 사용하는 함수 
    const dispatch=useDispatch()
    //이름을 관리할 상태값
    const [names, setNames]=useState([])

    const handleLogout = ()=>{
        delete localStorage.token
        dispatch({type:"UPDATE_USER", payload:null})
        dispatch({type:"SET_LOGIN", payload:false})
    }
    const handleClick=()=>{
        //  "/api/names" 요청을 해서 응답되는 데이터를 이용해서 ul 에 출력되도록 해 보세요
        axios.get("/api/names")
        .then(res=>{
          setNames(res.data)
        })
        .catch(error=>{
          console.log(error);
        })
    }
    return (
        <Container>
            <h1>인덱스 페이지 입니다</h1>
            {
                isLogin && <p>
                    <strong>{userName}</strong> 님 로그인중...
                    <button onClick={handleLogout}>로그아웃</button>
                </p>
            }
            <Button variant='success' onClick={handleClick}>목록보기</Button>
            <ul>
              {names.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
            <LoginModal show={!isLogin}/>
        </Container>
    );
}

function LoginModal(props) {
    //입력한 아이디 비밀번호를 state 로 관리 
    const [state, setState] = useState({})
    //아이디 혹은 비밀번호가 다른지 여부(에러여부)
    const [isError, setError] = useState(false)
    //action 을 발행할 함수 
    const dispatch=useDispatch()

    //input 요소에 문자열을 입력했을때 호출되는 함수 
    const handleChange = (e)=>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }
    
    //로그인 버튼을 눌렀을때 실행할 함수 
    const handleSubmit = ()=>{
        //입력한 아이디와 비밀번호가 들어 있는 state object 를 전송한다(json)
        axios.post("/api/auth", state)
        .then(res=>{
            //토큰이 발급된다.
            console.log(res.data)
            //발급된 토큰을 localStorage 에 token 이라는 키값으로 저장한다.
            localStorage.token=res.data
            setError(false)
            //로그인 되었다고 알려서 모달창이 숨겨 지게 한다.
            dispatch({type:"SET_LOGIN", payload:true})
            //userName 을 수정하는 dispatch
            dispatch({type:"UPDATE_USER", payload:state.userName})
        })
        .catch(error=>{
            console.log(error)
            setError(true)
        })
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            로그인이 필요 합니다.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingInput" label="User Name" className="mb-3">
            <Form.Control onChange={handleChange} name="userName" type="text"  placeholder="User Name"/>
          </FloatingLabel>
          <FloatingLabel  controlId="floatingPassword" label="Password" className="mb-3">
            <Form.Control onChange={handleChange} name="password" type="password" placeholder="Password" />
          </FloatingLabel>
          {
            isError && <Alert variant='danger'>아이디 혹은 비밀번호가 틀려요</Alert>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit}>로그인</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default App3;