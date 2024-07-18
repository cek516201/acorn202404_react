// src/components/Child.js

import React, { Component } from 'react';

class Child extends Component {
    render() {
        return (
            <div>
               <h3>Child Component 입니다</h3>
               <button onClick={(e)=>{
                    e.target.innerText="clicked!"
               }}>눌러보셈</button> 
            </div>
        );
    }
}

export default Child;