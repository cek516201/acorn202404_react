// src/pages/Member.js

import axios from "axios";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";


function Member() {

    //회원 목록 상태값 관리
    const [members, setMembers]=useState([])
    //Member component 가 활성화 되는 시점에 호출되는 함수 등록
    // useEffect( 함수 , 빈배열)   함수는 component 가 활성화될때 최초 1번호출된다 (개발환경:2번)
    useEffect(()=>{
        //해당 component 에서 필요한 준비 작업을 여기서 하면된다. 
        axios.get("/members")
        .then(res=>setMembers(res.data))
        .catch(err=>console.log(err))
    }, [])

    return (
        <>  
            <Link to="/members/new">회원추가</Link>
            <h1>회원 목록 입니다</h1>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>이름</th>
                        <th>주소</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        members.map(item => <tr key={item.num}>
                            <td>{item.num}</td>
                            <td>{item.name}</td>
                            <td>{item.addr}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </>
    );
}

export default Member;