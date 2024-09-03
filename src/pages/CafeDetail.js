// src/pages/CafeDetail.js

import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";

//css import
import myCss from './css/cafe_detail.module.css'
//binder import
import binder from 'classnames/bind'
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import ConfirmModal from "../components/ComfirmModal";
//cx 함수 
const cx=binder.bind(myCss)


function CafeDetail() {
    // "/cafes/:num" 에서 num 에 해당되는 경로 파라미터 값 읽어오기
    const {num} = useParams()
    //글 하나의 정보를 상태값으로 관리
    const [state, setState]=useState({})
    //검색 키워드 관련처리
    const [params, setParams]=useSearchParams()

    useEffect(()=>{
        //서버에 요청을 할때 검색 키워드 관련 정보도 같이 보낸다.
        const query=new URLSearchParams(params).toString()
        //여기서 query는  "condition=검색조건&keyword=검색어" 형식의 문자열이다
        axios.get(`/cafes/${num}?${query}`)
        .then(res=>{
            console.log(res.data)
            setState(res.data.dto)
        })
        .catch(error=>{
            console.log(error)
        })
        
    }, [num]) //경로 파라미터가 변경될때 서버로 부터 데이터를 다시 받아오도록 한다.
    
    //로그인된 사용자명이 store 에 있는지 읽어와 본다. 
    const userName=useSelector(state=>state.userName)
    //javascript 로 경로 이동하기 위한 Hook
    const navigate=useNavigate()
    //Confirm 모달을 띄울지 여부를 상태값으로 관리하기 
    const [confirmShow, setConfirmShow]=useState(false)
    //글 삭제 확인을 눌렀을때 호출되는 함수 
    const handleYes = ()=>{

    }

    return (
        <div>
            <nav>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to="/cafes">Cafe</Link></li>
                    <li className="breadcrumb-item active">Detail</li>
                </ol>
		    </nav>
            { state.prevNum !== 0 ? <Link to={`/cafes/${state.prevNum}?${new URLSearchParams(params).toString()}`}>이전글</Link> : ""}
            { state.nextNum !== 0 ? <Link to={`/cafes/${state.nextNum}?${new URLSearchParams(params).toString()}`}>다음글</Link> : ""}
            <h1>글 자세히 보기 페이지</h1>
            {   params.get("condition") &&
                <p>
                    <strong>{params.get("condition")}</strong> 조건
                    <strong>{params.get("keyword")}</strong> 검색어로 검색된 내용
                </p>
            }
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <td>{state.num}</td>
                    </tr>
                    <tr>
                        <th>작성자</th>
                        <td>{state.writer}</td>
                    </tr>
                    <tr>
                        <th>제목</th>
                        <td>{state.title}</td>
                    </tr>
                    <tr>
                        <th>조회수</th>
                        <td>{state.viewCount}</td>
                    </tr>
                </thead>
            </table>
            <div className={cx("content")} dangerouslySetInnerHTML={{__html:state.content}}></div>
            {
                userName === state.writer && <>
                    <Button variant="warning" onClick={()=>navigate(`/cafes/${num}/edit`)}>수정</Button>
                    <Button variant="danger" onClick={()=>setConfirmShow(true)}>삭제</Button>
                </>
            }
            <ConfirmModal show={confirmShow} message="글을 삭제하시겠습니까?" 
                yes={handleYes} no={()=>setConfirmShow(false)}/>
        </div>
    );
}

export default CafeDetail;