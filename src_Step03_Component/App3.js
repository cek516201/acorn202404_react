// src/App3.js

import React, { Component } from 'react';
import Child from './components/Child';
import Fortune from './components/Fortune';
import List from './components/List';

class App3 extends Component {
    state={
        fortuneToday:"비가 많이 올거에요",
        names:["김구라", "해골", "원숭이"]
    }
    clicked = ()=>{
        //자식 component 가 사용하는 state 를 변경하면 자식 component 도 
        //자동으로 ui 가 update 된다. 
        this.setState({
            fortuneToday : "저녁에는 비가 그칠거에요"
        })
    }
    render() {
        return (
            <div>
                <h1>인덱스 페이지입니다</h1>
                <Child/>
                <Child/>
                <Child/>
                <button onClick={this.clicked}>운세 변경</button>
                <Fortune data={'동쪽으로 가면 귀인을 만나요!'}/>
                <Fortune data={this.state.fortuneToday}/>
                <List names={this.state.names} onDelete={(idx)=>{
                    //this.state.names 에서 idx 인덱스의 아이템이 제거된 새로운 배열을 얻어내서
                    //상태값을 변경해야 한다.
                    const newArr = this.state.names.filter((item, index)=>{
                        //만일 현재 아이템의 인덱스가 삭제할 인덱스가 아니라면
                        if(index !== idx){
                            return true //true 를 리턴해서 남겨둔다 
                        }else{
                            return false //false 를 리턴해서 삭제한다 
                        }
                    });
                    //위의 코드를 한줄로 줄이면 아래와 같다 
                    const newArr2 = this.state.names.filter((item, index) => index!==idx);

                    this.setState({
                        names:newArr2
                    });
                }}/>
            </div>
        );
    }
}

export default App3;