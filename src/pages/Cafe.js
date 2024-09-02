// src/pages/Cafe.js

import axios from "axios";
import { useEffect, useState } from "react";
import { Pagination, Table } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";


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
    //페이징 숫자를 출력할때 사용하는 배열을 상태값으로 관리 하자
    const [pageArray, setPageArray]=useState([])

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
            //페이징 처리에 관련된 배열을 만들어서 state 로 넣어준다.
            const result=range(res.data.startPageNum, res.data.endPageNum)
            setPageArray(result)
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

    //페이지를 이동할 hook
    const navigate = useNavigate()

    //페이징 UI 를 만들때 사용할 배열을 리턴해주는 함수 
    function range(start, end) {
        const result = [];
        for (let i = start; i <= end; i++) {
            result.push(i);
        }
        return result;
    }
    
    // navigate() 함수를 이용해서 페이지를 변경하는 함수
    const move = (pageNum=1)=>{
        //검색조건에 맞는 query 문자열을 얻어내기 
        const query = new URLSearchParams(searchState).toString()
        navigate(`/cafes?pageNum=${pageNum}&${query}`)
    }
    // 검색조건을 변경하거나 검색어를 입력하면 호출되는 함수 
    const handleSearchChange = (e)=>{
        setSearchState({
            ...searchState,
            [e.target.name]:e.target.value  //검색조건혹은 검색키워드가 변경된 값을 반영한다.
        })
    }

    //Reset 버튼을 눌렀을때
    const handleReset = ()=>{
        //검색조건과 검색어 초기화 
        setSearchState({
            condition:"",
            keyword:""
        })
        //1페이지 내용이 보여지게
        move(1)
    }

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
                                <td>
                                    <Link to={`/cafes/${item.num}?condition=${searchState.condition}&keyword=${searchState.keyword}`}>{item.title}</Link>
                                </td>
                                <td>{item.writer}</td>
                                <td>{item.viewCount}</td>
                                <td>{item.regdate}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <Pagination className="mt-3">
                <Pagination.Item onClick={()=>move(pageInfo.startPageNum-1)} disabled={pageInfo.startPageNum === 1}>&laquo;</Pagination.Item>
                {
                    pageArray.map(item=>(
                        <Pagination.Item onClick={()=>move(item)} key={item} 
                            active={pageInfo.pageNum === item}>
                            {item}
                        </Pagination.Item>
                    ))
                }
                <Pagination.Item onClick={()=>move(pageInfo.endPageNum+1)} disabled={pageInfo.endPageNum >= pageInfo.totalPageCount}>&raquo;</Pagination.Item>            
            </Pagination>
            <label htmlFor="search">검색조건</label>
            <select onChange={handleSearchChange} value={searchState.condition} name="condition" id="search">
                <option value="">선택</option>
                <option value="title_content">제목+내용</option>
                <option value="title">제목</option>
                <option value="writer">작성자</option>
            </select>
            <input onChange={handleSearchChange} value={searchState.keyword} type="text" placeholder="검색어..." name="keyword"/>
            <button onClick={()=>move()}>검색</button>
            <button onClick={handleReset}>Reset</button>
            <p><strong>{pageInfo.totalRow}</strong> 개의 글이 있습니다</p>
        </>
    );
}

export default Cafe;