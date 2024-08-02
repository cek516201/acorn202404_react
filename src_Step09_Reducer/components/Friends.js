// src/components/Friends.js

import { useReducer, useRef } from "react";

const reducer = (state, action)=>{
    let newState;
    //어떤 로직에 의해서 새로운 상태값을 만들어서 리턴한다 
    if(action.type === "add"){
        newState = {
            ...state,
            //friends:[...state.friends, {id:state.seq, name:action.payload}],
            friends:state.friends.concat({id:state.seq, name:action.payload}),
            seq:state.seq+1
        }
    }else if(action.type === "remove"){
        newState = {
            ...state,
            friends:state.friends.filter((item) => item.id !== action.payload)
        }
    }
    return newState;
}

//초기 상태값
const initState={
    seq:0,
    friends:[]
}

function Friends() {
    
    const [state, dispatch] = useReducer(reducer, initState)

    // 특정 요소의 참조값을 관리하기 위한 hook 
    const inputName = useRef()

    return (
        <div>
            <input ref={inputName} type="text" placeholder="친구이름 입력..."/>
            <button onClick={(e)=>{
                //입력한 이름을 추가하는 action 을 dispatch 한다 (동작을 발행한다)
                // inputName.current 라는 방에는 참조값(input 요소) 이 들어 있다
                const name = inputName.current.value;
                // 발생할 action 을 object 로 만든다.
                const action = {type:"add", payload:name};
                // action 발행하기
                dispatch(action);
            }}>추가</button>
            <ul>
                {state.friends.map(item => 
                    <li key={item.id}>
                        {item.name} <button onClick={()=>dispatch({type:"remove", payload:item.id})}>x</button>
                    </li>)
                }
            </ul>
        </div>
    );
}

export default Friends;