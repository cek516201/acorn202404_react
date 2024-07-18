// src/components/List.js

import React, { Component } from 'react';

class List extends Component {
    render() {
        return (
            <>
              <h3>목록입니다</h3>
              <ul>
                {this.props.names.map((item, index) => <li key={index}>{item} <button onClick={()=>{
                    // x 버튼을 누르면 실행되는 함수 내부 
                    this.props.onDelete(index)
                }}>x</button></li>)}
              </ul>  
            </>
        );
    }
}

export default List;