// src/pages/CafeUpdateForm.js

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { initEditor } from "../editor/SmartEditor";

function CafeUpdateForm() {
    // "/cafes/:num/edit" 에서 num 에 해당되는 경로 파라미터 값 읽어오기
    const {num} = useParams()

    //SmartEditor 에 작성한 내용을 textarea 의 value 로 넣어 줄때 필요한 함수가 editorTool 이다 
    const [editorTool, setEditorTool] = useState([])
    //입력한 내용을 얻어오기 위한 useRef()  
    const inputTitle=useRef()
    const inputContent=useRef()
    //경로 이동을 할 함수 
    const navigate = useNavigate()
    //취소를 눌렀을때 수정된 내용을 취소 하기 위해 
    const [savedData, setSavedData]=useState({})

    //취소 버튼을 눌렀을때 호출되는 함수 
    const handleCancel = ()=>{
        //저장된 내용을 이용해서 원상 복귀 시킨다
        inputTitle.current.value=savedData.title
        //저장된 내용을 SmartEditor 에 덮어쓰기 한다 
        editorTool.setContents(savedData.content)
    }

    useEffect(()=>{
        // initEditor() 함수를 호출해야 SmartEditor 가 초기화된다.
        setEditorTool(initEditor("content")); 
        //num 에 해당하는 글 자세한 정보를 얻어와서 수정 폼에 출력할수 있도록 한다.
        axios.get(`/cafes/${num}/edit`)
        .then(res=>{
            //글정보가 들어 있는 object 이다 
            console.log(res.data)
            //응답받은 데이터를 state 에 넣어주기
            setSavedData(res.data)
            //응답받은 글 내용을 UI 에 출력하기 
            inputTitle.current.value=res.data.title
            inputContent.current.value=res.data.content
        })
        .catch(error=>{
            console.log(error)
        })
        
        const handleResize = ()=>{
            //리사이즈 될때마다 초기화를 다시한다 
            setEditorTool(initEditor("content")); 
        }
        //window 가 resize 될때 마다 동작할 리스너 함수 등록하기
        window.addEventListener("resize", handleResize)
        
        console.log("CafeUpdateForm 이 활성화됨")
        /*
            useEffect() 에 전달한 함수 안에서 리턴해주는 함수는 해당 컴포넌트가
            비활성화 되는 시점에 호출된다. 따라서 해당 컴포넌트에서 무언가 마무리 작업을 
            할께 있으면 리턴해주는 함수 안에서 작업하면 된다. 
        */
        return ()=>{
            console.log("언제 호출되지?")
            //이벤트 리스너 제거 하기 
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return (
        <>
            <nav>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to="/cafes">Cafe</Link></li>
                    <li className="breadcrumb-item active">Update</li>
                </ol>
		    </nav>
            <h1>글 수정 양식 입니다</h1>
            <Form>
                <FloatingLabel label="제목" className="mb-3" controlId="title">
                    <Form.Control ref={inputTitle} type="text" placeholder="제목 입력..."/>
                </FloatingLabel>
                <Form.Group className="mb-3"  controlId="content">
                    <Form.Label>내용</Form.Label>
                    <Form.Control ref={inputContent} as="textarea" style={{height:"300px"}}/>
                </Form.Group>
                <Button type="submit" onClick={(e)=>{
                    //폼 제출 막기(새로고침 방지)
                    e.preventDefault()
                    //에디터 tool 을 이용해서 SmartEditor 에 입력한 내용을 textarea 의 value 값으로 변환
                    editorTool.exec();
                    //입력한 제목과 내용을 읽어와서
                    const title=inputTitle.current.value
                    const content=inputContent.current.value
                    //axios 를 이용해서 api 서버에 전송
                    axios.put(`/cafes/${num}`, {title, content})
                    .then(res=>{
                        console.log(res.data)
                        alert("수정했습니다")
                        //해당글 자세히 보기로 이동
                        navigate(`/cafes/${num}`)
                    })
                    .catch(error=>{
                        console.log(error)
                    })
                }}>수정확인</Button>
                <Button onClick={handleCancel} variant="danger">취소</Button>
            </Form>
        </>
    );
}

export default CafeUpdateForm;