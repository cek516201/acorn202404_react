import React, { Component } from 'react';

class App extends Component {
  //상태값(state) 정의하기 (java 클래스 안에서 필드를 정의하는 느낌으로 만들면 된다)
  state={
    count:0
  }
  //맴버함수 추가 (반드시 화살표 함수로 만들어야 한다)
  clicked = ()=>{
    this.setState({
      count:this.state.count+1
    })
  }

  //App 클래스안에 속해 있는 맴버 함수(메소드)
  render() {

    //render() 함수 안에서 리턴한 jsx 로 화면 구성이 된다. 
    return (
      <div>
        <h1>인덱스 페이지 입니다</h1>
        <button onClick={()=>{
          //state 값을 직접 변경한다고 해서 ui 가 업데이트 되지는 않는다
          //this.state.count = this.state.count+1

          //state 는 object 인데 setState() 함수를 호출하면서 새로운 object 를 넣어주어야
          //ui 가 자동으로 업데이트 된다.
          this.setState({
            count : this.state.count+1
          })
        }}>{this.state.count}</button>
        <button onClick={this.clicked}>{this.state.count}</button>
        <p>현재 count 값 : <strong>{this.state.count}</strong></p>
      </div>
    );
  }
}

export default App;