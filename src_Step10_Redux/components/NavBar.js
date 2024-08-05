// src/components/NavBar.js

import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

function NavBar() {

    const inputName = useRef()
    // redux store 에 action 을 발행할 함수 hook
    const dispatch = useDispatch()

    //로그인 여부를 알아내고 싶으면?
    const isLogin = useSelector(state=>state.isLogin)
    //로그인된 userName 을 알고 싶으면?
    const userName = useSelector(state=>state.userName)

    return (
        <nav>
            {
                isLogin ? 
                <p> 
                    <strong>{userName}</strong> 님 로그인중... 
                    <button onClick={()=>{
                    dispatch({type:"SET_LOGIN", payload:false})
                    }}>로그아웃</button>
                </p> 
                :
                <>
                    <input ref={inputName} type="text" placeholder='사용자명...'/>
                    <button onClick={()=>{
                    // action 을 만들어서 
                    const action={type:"UPDATE_USER", payload:inputName.current.value}
                    // redux store 에 action 을 발행한다.
                    dispatch(action)
                    dispatch({type:"SET_LOGIN", payload:true})
                    }}>로그인</button>
                </>
            } 
        </nav>
    );
}

export default NavBar;