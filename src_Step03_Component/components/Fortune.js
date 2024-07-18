// src/components/Fortune.js

import React, { Component } from 'react';

class Fortune extends Component {
    render() {
        /*
            부모 component 가 전달한 property 는 자식 component 에서
            this.props 로 참조할수 있다.
            예를들어 부모 component 가
            <Fortune data={'동쪽으로 가면 귀인을 만나요'} />
            data 라는 property 명으로 string type '동쪽으로 가면 귀인을 만나요'
            를 전달했다면
            자식 component 에서는 this.props.data 로 전달된 string type 을
            사용할수 있다.
        */

        return (
            <>
                <h3>운세입니다</h3>
                <p>오늘의 운세 : <strong>{this.props.data}</strong></p>
            </>
        );
    }
}

export default Fortune;