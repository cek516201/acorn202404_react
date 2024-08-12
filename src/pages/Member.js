// src/pages/Member.js

import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";


function Member() {
    //이동을 위한 hook
    const navigate = useNavigate()

    //회원 목록 상태값 관리
    const [members, setMembers]=useState([])

    const refresh = ()=>{
        axios.get("/members")
        .then(res=>setMembers(res.data))
        .catch(err=>console.log(err))
    }

    //Member component 가 활성화 되는 시점에 호출되는 함수 등록
    // useEffect( 함수 , 빈배열)   함수는 component 가 활성화될때 최초 1번호출된다 (개발환경:2번)
    useEffect(()=>{
        //해당 component 에서 필요한 준비 작업을 여기서 하면된다. 
        refresh()
    }, [])
    //삭제 버튼을 눌렀을때 호출되는 함수 
    const handleDelete = (num)=>{
        axios.delete("/members/"+num)
        .then(res=>{
            //화면 리프레시 
            refresh()
        })
        .catch(error=>console.log(error))
    }

    return (
        <>  
            <Link to="/members/new">회원추가</Link>
            <h1>회원 목록 입니다</h1>
            <Table striped bordered size="sm">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>이름</th>
                        <th>주소</th>
                        <th>수정</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        members.map(item => <tr key={item.num}>
                            <td>{item.num}</td>
                            <td>{item.name}</td>
                            <td>{item.addr}</td>
                            <td>
                                <button onClick={()=>{
                                    //회원정보 수정 페이지로 이동
                                    navigate(`/members/${item.num}/edit`)
                                }}>수정</button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(item.num)}>삭제</button>
                            </td>
                        </tr>)
                    }
                </tbody>
            </Table>
        </>
    );
}

export default Member;