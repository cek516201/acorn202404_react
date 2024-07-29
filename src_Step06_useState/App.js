// App.css 적용하기 (내부 css)
import { useState } from 'react';
import './App.css'



//함수형 component
function App() {
  console.log("App 함수가 호출됨!")
  /*
    - useState() 함수는 배열을 리턴한다
    - [ 상태값 , 상태값을 바꿀 함수 ]  구조이다
    - useState(상태의 초기값)  
  */
  const [count, setCount] = useState(0)
  // useState 함수를 이용해서 이름의 초기값은 "김구라" 버튼을 누르면 "원숭이" 로 바뀌도록 해 보세요.
  const [myName, setMyName] = useState("김구라")

  return (
    <div className="container">
      <h1>인덱스 페이지 입니다</h1>
      <button onClick={()=>{
        setCount(count+1)
      }}>{count}</button>
      <p>내이름은 <strong>{myName}</strong></p>
      <button onClick={()=>{
        setMyName("원숭이")
      }}>이름 변경</button>
    </div>
  );
}

//외부에서 App.js 를 import 하면 App 함수를 사용할수 있다. (src/index.js)
export default App;
