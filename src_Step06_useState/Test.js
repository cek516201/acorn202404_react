import { useState } from "react";

const [count, setCount] = useState(0)

setCount(1)
setCount(2)
setCount(3)

count 값이 계속 새로운 숫자값으로 대체 된다.
0 > 1 > 2 > 3


const [state, setState] = useState({
    count:0,
    myName:"",
    names:[]
})

setState({
    myName:"",
    names:[],
    count:1
})
setState({
    names:[],
    count:1,
    myName:"김구라"
})
setState({
    names:[],
    count:1,
    myName:"김구라",
    names:["batman"]
})
setState({
    ...state,
    names:["batman", "superman"]
})
setState({
    ...state,
    names:[...state.names, "kimgura"]
})
setState({
    ...state,
    names:state.names.concat("kimgura")
})

