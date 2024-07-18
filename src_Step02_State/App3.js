import React, { Component } from 'react';

class App3 extends Component {
    
    state={
        names:[],
        inputName:""
    }
    //목록 받아오기 버튼을 눌렀을때 호출되는 함수 
    getData = ()=>{
        //원격지 서버로 부터 받아온 데이터라고 가정하자
        const data = ["김구라", "해골", "원숭이"]
        //받아온 데이터로 상태를 변경하기(UI 자동 update)
        this.setState({
            names:data
        })
    }
    addData = ()=>{
        //기존의 배열에 새로운 item 이 추가된 새로운 배열을 얻어내는 방법1
        const newArr = this.state.names.concat("새이름");
        //기존의 배열에 새로운 item 이 추가된 새로운 배열을 얻어내는 방법2
        const newArr2 = [...this.state.names, "새이름"];

        this.setState({
            names : [...this.state.names, this.state.inputName]
        })
    }
    render() {
        return (
            <div>
                <h3>배열을 상태값으로 가지는 예제</h3>
                <p>{this.state.names}</p>
                <button onClick={this.getData}>목록 받아오기</button>
                <br />
                <input type="text" placeholder="이름 입력..." onChange={(e)=>{
                    //현재까지 입력한 이름을 상태값에 반영한다 
                    this.setState({
                        inputName : e.target.value
                    })
                }}/>
                <button onClick={this.addData}>추가</button>
                <ul>
                    {this.state.names.map((item,index) => <li key={index}>{item}</li>)}
                </ul>
            </div>
        );
    }
}

export default App3;