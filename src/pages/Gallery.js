// src/pages/Gallery.js

import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Pagination, Row } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";


//원하는 범위의 숫자를 배열에 담아서 리턴하는 util 함수 만들어 보기
function range(start, end){
    const nums=[];
    //반복문 돌면서 i 가 start 에서 end 까지 1씩 증가하면서 변하도록 하고 
    for(let i=start; i <= end; i++){
        //그 숫자를 배열에 누적 시킨다 
        nums.push(i);
    }
    //숫자가 누적된 배열을 리턴해준다. 
    return nums;
}

function Gallery() {

    //표시 해야할 페이지 정보 
    const [pageInfo, setPageInfo]=useState({
        list:[]
    })
    //페이징 UI 를 만들때 사용할 배열
    const [pageArray, setPageArray]=useState([])

    // "/gallery?pageNum=x" 에서 pageNum 을 추출하기 위한 Hook   
    /*
        pageNum 이 전달되지 않으면 기본값 pageNum=1 이 적용이 되고
        전달된다면 전달된값이 적용된다. 
    */
    const [params , setParams] = useSearchParams({pageNum:1})
    
    //페이지 이동을 위한 함수
    const navigate = useNavigate()
   
    //겔러리 목록 데이터 읽어오는 함수 
    const refresh = (pageNum)=>{
        axios.get("/gallery?pageNum="+pageNum)
        .then(res=>{
            console.log(res.data)
            //API 서버로 부터 받아온 데이터를 state 로 관리 하기 
            setPageInfo(res.data)
            //startPageNum, endPageNum 을 이용해서 pageArray 만들기 (state변경)
            setPageArray(range(res.data.startPageNum, res.data.endPageNum))
        })
        .catch(error=>{
            console.log("xxx")
        })
    }
    /*
        useEffect(함수 , [])  -> component 활성화 시점에 함수가 한번만 호출된다.

        useEffect(함수 , [params]) -> component 활성화 시점 또는 
        params 값이 변경될때 마다 호출된다. 

        useEffect(함수 , [state1, state2]) -> component 활성화 시점 또는 
        state1 or state2 값이 변경될때 마다 호출된다. 
    */
    useEffect(()=>{
        //갤러리 목록을 요청해서 읽어온다 
        const pageNum=params.get("pageNum")
        refresh(pageNum)
    }, [params])
   
    return (
        <>
            <h1>갤러리 입니다</h1>
            <Button variant="success" as={Link} to="/gallery/new">업로드</Button>
            <Row>
                {
                    pageInfo.list.map(item=>(
                        <Col sm={6} md={3} key={item.num}>
                            <Card>
                                <Card.Img variant="top" src={`/upload/images/${item.saveFileName}`}/>
                                <Card.Body>
                                    <Card.Text>{item.caption}</Card.Text>
                                    <Card.Text>writer : <strong>{item.writer}</strong></Card.Text>
                                    <Button onClick={()=>navigate(`/gallery/${item.num}`)}>자세히 보기</Button>
                                    <Button variant="success" as={Link} to={`/gallery/${item.num}`}>자세히 보기</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
            <Pagination className="mt-3">
                <Pagination.Item onClick={()=>{
                    //setParams() 함수를 이용해서 search parameter 값을 변경
                    setParams({pageNum:pageInfo.startPageNum-1})
                }} disabled={pageInfo.startPageNum === 1}>&laquo;</Pagination.Item>
                {
                    pageArray.map(num => (
                        <Pagination.Item onClick={()=>{
                            //setParams() 함수를 이용해서 search parameter 값을 변경한다 
                            setParams({pageNum:num})
                        }} key={num} active={num === pageInfo.pageNum}>{num}</Pagination.Item>
                    ))
                }
                <Pagination.Item onClick={()=>{
                    setParams({pageNum:pageInfo.endPageNum+1})
                }} disabled={pageInfo.endPageNum === pageInfo.totalPageCount}>&raquo;</Pagination.Item>
            </Pagination>
        </>
    );
}

export default Gallery;