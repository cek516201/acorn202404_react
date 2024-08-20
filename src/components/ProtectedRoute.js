// src/components/ProtectedRoute.js

import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 

const ProtectedRoute = ({ children }) => {
    //로그인 여부 알아내기 (redux store 에 userName 이 있으면 로그인 된 상태)
    const isLogin = useSelector(state=>state.userName) ? true : false
    //현재 위치를 알아내기 위해 
    const location = useLocation()
    //action 을 발행하기 위해 
    const dispatch = useDispatch()
    //만일 로그인이 되지 않았다면 
    if (!isLogin) {
        //원래 가려던 목적지 정보와 검색 파라미터정보를 읽어내서 
        const redirectUrl = location.pathname+location.search
        //action 의 payload 에 담는다 
        const payload={
            show:true,
            message:"해당 페이지는 로그인이 필요 합니다!",
            url:redirectUrl
        }
        //로그인창을 띄우는 action 을 발행하면서 payload 를 전달한다. 
        dispatch({type:"LOGIN_MODAL", payload })     
        //return null; //빈페이지를 리턴 
        /*
            특정경로로 리다일렉트 시키고 싶으면 <Navigate to="이동경로"/> 컴포넌트를 리턴해주면 된다.
        */
        return <Navigate to="/"/> 
    }
  
  return children;
};

export default ProtectedRoute;
