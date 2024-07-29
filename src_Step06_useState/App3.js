// src/App3.js

import { useState } from "react";


function App3() {
    // item 이 3개 들어 있는 배열을 초기값으로 전달한 state 
    const [names, setNames]=useState(["김구라", "해골", "원숭이"])

    return (
        <div>
           <h1>배열을 state 로 관리해 보기</h1>
            <button onClick={()=>{
                //setNames([...names, "새이름"])
                setNames(names.concat("새이름"))
            }}>추가</button>
            <ul>
                {names.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        </div>
    );
}

export default App3;
