// src/pages/Cafe.js

import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";


function Cafe() {
    //카페 글 목록 페이지 정보
    const [pageInfo, setPageInfo]=useState({
        list:[]
    })

    //검색 조건과 키워드를 상태값으로 관리
    const [searchState, setSearchState]=useState({
        condition:"",
        keyword:""
    })

    // "/cafes?pageNum=x" 에서 pageNum 을 추출하기 위한 Hook   
    const [params, setParams]=useSearchParams({pageNum:1})

    //글 목록 데이터 새로 읽어오는 함수
    const refresh = (pageNum)=>{
        //검색 기능과 관련된 query 문자열 읽어오기
        const query=new URLSearchParams(searchState).toString()
        //axios 를 이용해서 pageNum 에 해당하는 데이터를 받아온다 
        axios.get(`/cafes?pageNum=${pageNum}&${query}`)
        .then(res=>{
            console.log(res.data)
            //서버로 부터 응답된 데이터를 state 로 넣어준다
            setPageInfo(res.data)
        })
        .catch(error=>{
            console.log(error)
        })
    }
    /*
        useEffect() 안에 전달한 함수는
        1. Cafe 컴포넌트가 활성화 되는 시점에 1번 호출된다.
        2. params 가 변경이 될때마다 호출된다 
    */
    useEffect(()=>{
        //query 파라미터 값을 읽어와 본다
        let pageNum=params.get("pageNum")
        //만일 존재 하지 않는다면 1 페이지로 설정
        if(pageNum==null)pageNum=1
        //해당 페이지의 내용을 원격지 서버로 부터 받아온다 
        refresh(pageNum)
    }, [params])


    return (
        <>
            <Link to="/cafes/new">새글 작성</Link>
            <h1>Cafe 글 목록 입니다</h1>
            <Table striped bordered size="sm">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>조회수</th>
                        <th>등록일</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        pageInfo.list.map(item=>(
                            <tr key={item.num}>
                                <td>{item.num}</td>
                                <td>{item.title}</td>
                                <td>{item.writer}</td>
                                <td>{item.viewCount}</td>
                                <td>{item.regdate}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </>
    );
}

export default Cafe;