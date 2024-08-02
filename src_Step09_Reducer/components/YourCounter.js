// src/components/YourCounter.js

import { useReducer } from "react";


const reducer = (state, action)=>{
    //새로운 상태값을 담을 변수를 미리 만들고 
    let newState
    //action 값에 따라 분기해서 
    if(action === "minus"){
        //새로운 상태값을 만들어서 
        newState={
            ...state,
            count:state.count-1
        }
    }else if(action === "plus"){
        newState={
            ...state,
            count:state.count+1
        }
    }else{
        newState=state
    }
    //리턴해 준다. 
    return newState
}

function YourCounter() {
    /*
        [ 상태값, 상태를 변경할때 사용할 함수 ] = useRecucer( 리듀서 함수, 초기값)
    */
    const [state, dispatch] = useReducer(reducer, {count:0})

    return (
        <div>
            <button onClick={()=>{
                // "minus" action 을 발행해서 상태값을 변경 시킨다 
                dispatch("minus") // 결과적으로 등록된 리듀서 함수가 호출된다.
            }}>-</button>
            <strong>{state.count}</strong>
            <button onClick={()=>{
                // "plus" action 을 발행해서 상태값을 변경 시킨다 
                dispatch("plus")
            }}>+</button> 
        </div>
    );
}

export default YourCounter;