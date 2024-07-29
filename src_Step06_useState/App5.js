// src/App5.js

import { useState } from "react";

function App5() {

    //string, array, number type 을 상태값으로 관리하기
    const [state, setState] = useState({
        inputName:"",
        names:[],
        seq:1
    })

    return (
        <div>
            <input type="text" onChange={(e)=>{
                setState({
                    ...state,
                    inputName:e.target.value //입력한 이름을 inputName 에 반영한다 
                })
            }} placeholder="이름 입력..."/>
            <button onClick={()=>{
                setState({
                    ...state,
                    names: [...state.names, {name:state.inputName, id:state.seq}],
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

export default App5;