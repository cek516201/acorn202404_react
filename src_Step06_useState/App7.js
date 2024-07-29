// src/App7.js

import { useRef, useState } from "react";

function App7() {

    //string, array, number type 을 상태값으로 관리하기
    const [state, setState] = useState({
        names:[],
        seq:1
    })
    // usetRef() hook 을 이용해서 특정 요소의 참조값을 편하게 읽어올수 있다.
    let inputName=useRef();
    console.log(inputName)
    
    return (
        <div>
            <input ref={inputName} type="text" placeholder="이름 입력..."/>

            <button onClick={()=>{
                // inputName 은 object 이고 current 라는 key 값으로 input 요소의 참조값이 들어 있다.
                console.log(inputName)
                //버튼을 눌렀을때 input 요소에 입력한 value 를 읽어오려면 input 요소의 참조값이 필요하다
                setState({
                    ...state,
                    names: [...state.names, {name:inputName.current.value, id:state.seq}],
                    seq:state.seq + 1
                })
            }}>추가</button>
            <ul>
                {state.names.map(item => <li key={item.id}>{item.name}</li>)}
            </ul>
            <pre>{JSON.stringify(state, null, 2)}</pre>
        </div>
    );
}

export default App7;