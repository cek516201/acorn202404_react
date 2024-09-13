// src/pages/CafeDetail.js

import axios from "axios";
import { createRef, useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";

//css import
import myCss from './css/cafe_detail.module.css'
//binder import
import binder from 'classnames/bind'
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import ConfirmModal from "../components/ComfirmModal";
//cx 함수 
const cx=binder.bind(myCss)

//새로 등록한 댓글을 추가할 인덱스
let commentIndex=0

function CafeDetail() {
    // "/cafes/:num" 에서 num 에 해당되는 경로 파라미터 값 읽어오기
    const {num} = useParams()
    //글 하나의 정보를 상태값으로 관리
    const [state, setState]=useState({})
    //검색 키워드 관련처리
    const [params, setParams]=useSearchParams()
    //댓글 목록을 상태값으로 관리
    const [commentList, setCommentList]=useState([])
    //댓글의 현재 페이지 번호
    const [pageNum, setPageNum]=useState(1)
    //댓글 전체 페이지의 갯수(마지막 페이지 번호)
    const [totalPageCount, setTotalPageCount] = useState(0)
    //현재 로딩중인지 여부 
    const [isLoading, setLoading] = useState(false)

    useEffect(()=>{
        //서버에 요청을 할때 검색 키워드 관련 정보도 같이 보낸다.
        const query=new URLSearchParams(params).toString()
        //여기서 query는  "condition=검색조건&keyword=검색어" 형식의 문자열이다
        axios.get(`/cafes/${num}?${query}`)
        .then(res=>{
            console.log(res.data)
            setState(res.data.dto)
            //댓글 목록 배열에 ref 라는 방을 추가한다
            const list=res.data.commentList.map(item=>{
                item.ref=createRef()
                return item
            })
            //댓글 목록
            setCommentList(list)
            //전체 댓글 페이지의 갯수를 상태값으로 넣어주기 
            setTotalPageCount(res.data.totalPageCount)
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
        axios.delete(`/cafes/${num}`)
        .then(res=>{
            console.log(res.data)
            navigate("/cafes")
        })
        .catch(error=>{
            console.log(error)
        })
    }

    const dispatch=useDispatch()

    const handleCommentSubmit = (e)=>{
        e.preventDefault() //폼 전송을 막기

        //만일 로그인 하지 않았다면
        if(!userName){
            //로그인 모달을 띄운다
            const payload={show:true, message:"댓글 저장을 위해 로그인이 필요합니다"}
            dispatch({type:"LOGIN_MODAL", payload})
            return; //여기서 함수를 종료한다 
        }

        const action=e.target.action //action
        const method=e.target.method //method "post"
        //form 에 입력한 내용을 FormData 객체에 담기 ( input 요소에 name 속성이 반드시 필요!)
        const formData=new FormData(e.target) 
        //FormData 에 입력한 내용을 object 로 변환 해서 json 문자열을 서버에 전송할수도 있다.
        //const obj = Object.fromEntries(formData.entries())

        axios[method](action, formData)
        .then(res=>{
            //방금 저장한 댓글의 정보 
            console.log(res.data)
            const newComment = res.data
            /*
                댓글의 정보에 ref 라는 방을 추가하고 거기에 참조값을 담을 object 를 넣어준다.
                아래 코드를 실행하면 newComment 는 이런 모양이다
                {num:x, content:"xxx", ... , ref:{current:x}}
            */
            newComment.ref=createRef()
            //이 댓글을 commentIndex 에 끼워 넣기
            commentList.splice(commentIndex, 0, newComment)
            //끼워 넣은 새로운 배열로 상태값을 변경한다.
            setCommentList([...commentList])
            //댓글 입력한 textarea 초기화 
            e.target.content.value=""
        })
        .catch(error=>{
            console.log(error)
        })
    }
    
    //삭제할 댓글 번호와 삭제할 댓글이 출력된 li 요소의 참조값을 전달받는 함수 
    const handleDelete = (commentNum, ref)=>{
        axios.delete(`/cafes/${num}/comments/${commentNum}`)
        .then(res=>{
            //ref.current.innerHTML="<p>삭제된 댓글입니다</p>"
            /*
                ref.current 는 li 요소의 참조값
                ref.current.querySelector("dl") 은  li 요소의 자손 중에서 dl 요소를 찾아서 참조값 가져오기
                .outerHTML = "새로운 요소"   는  새로운 요소로 대체(replace) 하기 
            */
            ref.current.querySelector("dl").outerHTML="<p>삭제된 댓글입니다</p>"
        })
        .catch(error=>{
            console.log(error)
        })
    }
    
    //댓글 수정 확인 버튼 눌렀을때 실행할 함수
    const handleUpdateSubmit = (e)=>{
        e.preventDefault()
        const action=e.target.action 
        const formData = new FormData(e.target)
        //const method=e.target.method // patch 
        
        axios.patch(action, formData) 
        .then(res=>{
            //res.data 는 수정한 댓글 정보 
            console.log(res.data)
            //수정한 댓글이 UI 에 반영되도록
            const newList=commentList.map(item=>{
                //수정한 댓글을 목록에서 찾아서 content 를 수정해준다.
                if(item.num === res.data.num){
                    item.content=res.data.content
                }
                return item
            })
            //새로운 배열로 상태값 변경
            setCommentList(newList)
        })
        .catch(error=>{
            console.log(error)
        })
    }
    
    //댓글 더보기 버튼을 눌렀을때 실행할 함수 
    const handleMoreComment = ()=>{
        //현재 댓글의 페이지가 마지막 페이지 인지 여부를 알아내서
        const isLast = pageNum >= totalPageCount
        //만일 마지막 페이지라면
        if(isLast){
            alert("댓글의 마지막 페이지 입니다")
        }else{//마지막 페이지가 아니라면 
            //로딩 상태로 바꿔준다
            setLoading(true)
            //서버에 데이터를 추가 데이터를 요청해서 
            //요청할 댓글의 페이지
            const page=pageNum+1 //현재 댓글의 페이지 + 1 
            axios.get(`/cafes/${num}/comments?pageNum=${page}`)
            .then(res=>{
                //res.data 에는 댓글 목록과 댓글 전체 페이지의 갯수가 들어 있다. 
                console.log(res.data)
                // 댓글 목록에 ref 를 추가한 새로운 배열을 얻어내서 
                const newList=res.data.commentList.map(item=>{
                    item.ref=createRef()
                    return item;
                })
                //현재까지 출력된 댓글 목록에 새로운 댓글목록이 병합된 새로운 배열로 상태값 변경 
                //댓글목록 데이터 변경하기
                setCommentList([...commentList, ...newList])
                setTotalPageCount(res.data.totalPageCount)
                //증가된 페이지 번호도 반영
                setPageNum(page)
                setLoading(false)
            })
            .catch(error=>{
                setLoading(false)
            })
            
        }
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

            <h3>댓글을 입력하여 주세요</h3>
            <form className={cx("comment-form")} 
                action={`/cafes/${state.num}/comments`} 
                method="post"
                onSubmit={handleCommentSubmit}>
                <input type="hidden" name="ref_group" defaultValue={state.num}/>
                <input type="hidden" name="target_id" defaultValue={state.writer}/>
                <textarea name="content"></textarea>
                <button type="submit" onClick={()=>commentIndex=0}>등록</button>
            </form>
            {/* 댓글 목록 출력하기 */}
            <div className={cx("comments")}>
                <ul>
                    {
                        commentList.map((item, index) => (
                            <li key={item.num}
                                ref={item.ref}
                                className={cx({indent:item.num !== item.comment_group})}>
                                <svg style={{
                                    display: item.num !== item.comment_group ? 'inline':'none'
                                }}  className={cx('reply-icon')} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5z"/>
                                </svg>
                                {   item.deleted === "yes" ? <p>삭제된 댓글입니다</p> : 
                                    <dl>
                                        <dt>
                                            { 
                                                item.profile === null ? <svg className={cx('profile-image')} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                                    </svg>
                                                : <img className={cx('profile-image')} src={`/upload/images/${item.profile}`} alt="프로필 이미지" />
                                            }
                                            <span>{item.writer}</span>
                                            { item.num !== item.comment_group ? <i>@{item.target_id}</i> : null}
                                            <small>{item.regdate}</small>
                                            <Button variant="outline-success" size="sm" className="answer-btn" onClick={(e)=>{
                                                //현재 버튼의 텍스트
                                                const text=e.target.innerText
                                                if(text === "답글"){
                                                    e.target.innerText="취소"
                                                    item.ref.current.querySelector("."+cx("re-insert-form")).style.display="flex"
                                                }else{
                                                    e.target.innerText="답글"
                                                    item.ref.current.querySelector("."+cx("re-insert-form")).style.display="none"     
                                                }
                                            }}>답글</Button>
                                            { item.writer === userName && <> 
                                                <Button className="update-btn" variant="outline-warning" size="sm" onClick={(e)=>{
                                                    //현재 버튼의 텍스트
                                                    const text=e.target.innerText
                                                     if(text === "수정"){
                                                        e.target.innerText="수정취소"
                                                        item.ref.current.querySelector("."+cx("update-form"))
                                                            .style.display="flex"
                                                     }else{
                                                        e.target.innerText="수정"
                                                        item.ref.current.querySelector("."+cx("update-form"))
                                                            .style.display="none"
                                                     }
                                                }}>수정</Button>
                                                <Button variant="outline-danger" size="sm" onClick={()=>{
                                                    //handleDelete() 함수 호출하면서 댓글의 번호와 댓글이 출력된 li 의 참조를 전달
                                                    handleDelete(item.num, item.ref)
                                                }}>삭제</Button>
                                            </> 
                                            }
                                        </dt>
                                        <dd><pre>{item.content}</pre></dd>
                                    </dl>
                                }
                                <form action={`/cafes/${num}/comments`}
                                    className={cx(`re-insert-form`)}
                                    onSubmit={handleCommentSubmit}
                                    method="post">
                                    <input type="hidden" name="ref_group" defaultValue={state.num}/>
                                    <input type="hidden" name="target_id" defaultValue={item.writer}/>
                                    <input type="hidden" name="comment_group" defaultValue={item.comment_group}/>
                                    <textarea name="content"></textarea>
                                    <button type="submit" onClick={()=>{
                                        item.ref.current.querySelector("."+cx("re-insert-form"))
                                            .style.display="none"
                                        item.ref.current.querySelector(".answer-btn").innerText="답글"
                                        //새로운 댓글은 이 폼이 속해있는 댓글의 인덱스 바로 다음 인덱스에 추가 되어야 한다.
                                        commentIndex = index + 1
                                    }}>등록</button>
                                </form>
                                {
                                    item.writer === userName &&
                                    <form className={cx('update-form')}
                                        action={`/cafes/${num}/comments/${item.num}`}
                                        method="patch"
                                        onSubmit={handleUpdateSubmit}>
                                        <input type="hidden" name="num" defaultValue={item.num}/>
                                        <textarea name="content" defaultValue={item.content}></textarea>
                                        <button type="submit" onClick={()=>{
                                            item.ref.current.querySelector("."+cx("update-form")).style.display="none"
                                            item.ref.current.querySelector("."+cx("update-btn")).innerText="수정"
                                        }}>수정확인</button>
                                    </form>
                                }
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="d-grid col-md-6 mx-auto mb-5">
                    <Button variant="success" 
                        disabled={isLoading}
                        onClick={handleMoreComment}>
                        {
                            isLoading ? 
                            <span className="spinner-border spinner-grow-sm"></span> 
                            :
                            <span>댓글 더보기</span>
                        }
                    </Button>
            </div>    
        </div>
    );
}

export default CafeDetail;