// pages/UserDetail.js

import axios from "axios";
import { useEffect, useState } from "react";

function UserDetail() {
    //가입 회원 정보를 상태값으로 관리한다.
    const [userInfo, setUserInfo] = useState({})

    //컴포넌트가 활성화 되는 시점에 가입정보를 서버로 부터 읽어와서 UI 에 출력하기
    useEffect(()=>{
        axios.get("/user")
        .then(res=>{
            setUserInfo(res.data)
        })
        .catch(error=>{
            console.log(error)
        })
    }, [])

    return (
        <>
            <h1>회원 가입 정보 입니다</h1>
            <table className="table table-bordered">
                <colgroup>
                    <col className="col-3"/>
                    <col className="col-9"/>
                </colgroup>
                <thead className="table-dark">
                    <tr>
                        <th>항목</th>
                        <th>내용</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>아이디</td>
                        <td>{userInfo.userName}</td>
                    </tr>
                    <tr>
                        <td>ROLE</td>
                        <td>{userInfo.role}</td>
                    </tr>
                    <tr>
                        <td>이메일 주소</td>
                        <td>{userInfo.email}</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default UserDetail;
