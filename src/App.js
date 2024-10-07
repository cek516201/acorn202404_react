// App.css 적용하기 (내부 css)
import { NavLink, useNavigate, useOutlet } from 'react-router-dom';
import './App.css'
//bootstrap css 로딩하기 
import 'bootstrap/dist/css/bootstrap.css'
import BsNavBar from './components/BsNavBar';
import LoginModal from './components/LoginModal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { decodeToken } from 'jsontokens';
import axios from 'axios';
import AlertModal from './components/AlertModal';

//함수형 component
function App() {

  //현재 route 된 정보를 출력해주는 hook
  const currentOutlet = useOutlet()
  //로그인 모달과 관련된 값을 redux store 로 부터 읽어온다.
  const loginModal = useSelector(state => state.loginModal)
  //action 을 발생하기 위한 함수
  const dispatch=useDispatch()

  // 알림 모달의 상태관리 
  const [alertShow, setAlertShow] = useState(false)
  // store 에서 관리되는 userName 을 읽어온다 
  const userName=useSelector(state=>state.userName)
  // timeout 의 아이디를 상태값으로 관리 
  const [timeoutId, setTimeoutId] = useState({
    id1:null,
    id2:null
  })
  const navigate = useNavigate()

  //App 컴포넌트가 최초 활성화 되거나 혹은 userName 이 변경되었을때 실행할 함수 등록
  // userName 은 로그인하면 로그인된 아이디, 로그아웃하면 null 로 변경된다. 
  useEffect(()=>{
    //만일 설정된 timeout 이 있다면 timeout 초기화
    if(timeoutId.id1){
      clearTimeout(timeoutId.id1)
      clearTimeout(timeoutId.id2)
      setTimeoutId({
        id1:null, 
        id2:null
      })
    }

    if(localStorage.token){
      const result = decodeToken(localStorage.token.substring(7))
      //expire 되는 시간이 초 단위로 저장되어 있으므로 1000 을 곱해서 ms 초 단위로 만든다
      const expTime = result.payload.exp*1000
      //현재 시간 ms 초 단위로 얻어내기 
      const now = new Date().getTime() 
      //만일 토큰의 유효기간이 남아 있다면 
      if(expTime > now){
        //남은 시간을 얻어내고 
        const remainTime=expTime-now
        const id1 = setTimeout(()=>{
          //로그아웃 예고 알림을 띄운다 
          setAlertShow(true)
        }, remainTime - 1000*10)

        //남은 시간이 경과 했을때 실행할 함수 등록
        const id2 = setTimeout(()=>{
          //localStorage 에서 token 을 삭제한다
          delete localStorage.token
          //axios 헤더에 설정된 값 초기화 하기  
          delete axios.defaults.headers.common["Authorization"];
          alert("로그 아웃 되었습니다.")
          //0.1 초 이후에 redux store 의 상태값을 변경한다
          setTimeout(()=>{
            dispatch({type:"UPDATE_USER", payload:null})
          }, 100)
          //최상위 경로로 이동
          navigate("/")
        }, remainTime)
        //timeout 아이디값을 상태값으로 관리한다
        setTimeoutId({id1, id2})
      }
    }
  }, [userName])

  return (
    <>
      <AlertModal show={alertShow} message="5분 뒤에 로그 아웃 됩니다. 다시 로그인 해 주세요"
        yes={()=>setAlertShow(false)}/>
      <BsNavBar/>
      <div className="container" style={{marginTop:"60px"}}>
        <div>{currentOutlet}</div>
      </div>
       { loginModal.show && <LoginModal onHide={()=>dispatch({type:"LOGIN_MODAL", payload:{show:false}})} show={loginModal.show} message={loginModal.message} url={loginModal.url}/> }
    </>
  );
}

//외부에서 App.js 를 import 하면 App 함수를 사용할수 있다. (src/index.js)
export default App;
