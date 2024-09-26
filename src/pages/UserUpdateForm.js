// src/pages/UserUpdateForm.js

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

//초기 상태로 되돌리기 위해 필요한 변수
let savedImageSrc

function UserUpdateForm() {
    
    const [userInfo, setUserInfo] = useState({})
    // 프로필 이미지 src 에 적용할 값을 state 로 관리 하기
    const [imageSrc, setImageSrc] = useState(null)

    useEffect(()=>{
        axios.get("/user")
        .then(res=>{
            setUserInfo(res.data)
            //만일 등록된 프로필 이미지가 있다면
            if(res.data.profile){
                setImageSrc(`/upload/images/${res.data.profile}`)
                savedImageSrc=`/upload/images/${res.data.profile}`
            }else{//없다면 
                // person svg 이미지를 읽어들여서 data url 로 만든다음 imageSrc 에 반영하기 
                // svg 이미지를 2 진 데이터 문자열로 읽어들여서 
                const svgString=new XMLSerializer().serializeToString(personSvg.current)
                // 2진데이터 문자열을 btoa (binary to ascii) 함수를 이용해서 ascii 코드로 변경
                const encodedData = btoa(svgString)
                // 변경된 ascii 코드를 이용해서 dataUrl 을 구성한다 
                const dataUrl = "data:image/svg+xml;base64," + encodedData;
                setImageSrc(dataUrl)
                console.log(dataUrl)
                savedImageSrc=dataUrl
            }
        })
        .catch(error=>{
            console.log(error)
        })
    },[])

    // 이미지 input 요소의 참조값을 사용하기 위해 
    const imageInput = useRef()
    // drop zone div 요소의 참조값을 사용하기 위해 
    const dropZone = useRef()
    const personSvg = useRef()

    const dropZoneStyle={
        minHeight:"300px",
        border:"3px solid #cecece",
        borderRadius:"10px",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        cursor:"pointer"
    }
    const profileStyle={
        width: "200px",
        height: "200px",
        border: "1px solid #cecece",
        borderRadius: "50%"
    }
    const profileStyle2={
        width: "200px",
        height: "200px",
        border: "1px solid #cecece",
        borderRadius: "50%",
        display: "none"
    }
    // input type="file" 요소에 change 이벤트가 일어 났을때 호출되는 함수 
    const handleChange = (e)=>{
        //선택한 파일 객체
        const file=e.target.files[0]
        //파일로 부터 데이터를 읽어들일 객체 생성
        const reader=new FileReader()
        //파일을 DataURL 형식의 문자열로 읽어들이기
        reader.readAsDataURL(file)
        //로딩이 완료(파일데이터를 모드 읽었을때) 되었을때 실행할 함수 등록
        reader.onload=(event)=>{
            //읽은 파일 데이터 얻어내기 
            const data=event.target.result
            setImageSrc(data)
        }
    }
    // drop zone div 에 drop 이벤트가 일어 났을때 호출되는 함수 
    const handleDrop = (e)=>{
        e.preventDefault()
        //drop 된 파일 객체 얻어내기 
		const file=e.dataTransfer.files[0];	
        const reg=/image/;
        if(!reg.test(file.type)){ //파일의 type 이 만일 정규표현식을 통과하지 못하면
            console.log("이미지 파일이 아닙니다")
            return;
        }

        //파일로 부터 데이터를 읽어들일 객체 생성
        const reader=new FileReader()
        //파일을 DataURL 형식의 문자열로 읽어들이기
        reader.readAsDataURL(file)
        //로딩이 완료(파일데이터를 모드 읽었을때) 되었을때 실행할 함수 등록
        reader.onload=(event)=>{
            //읽은 파일 데이터 얻어내기 
            const data=event.target.result
            setImageSrc(data)
        }

        // input 요소에 drop 된 파일의 정보 넣어주기 
        imageInput.current.files=e.dataTransfer.files;
    }

    //폼에 reset 이벤트가 일어 났을때 호출되는 함수 
    const handleReset = ()=>{
        setImageSrc(savedImageSrc)
    }

    const navigate = useNavigate()

    //폼 submit 이벤트가 일어 났을때 호출되는 함수
    const handleSubmit = (e)=>{
        e.preventDefault()
        //이벤트가 일어난 form 요소에 입력하거나 선택된 내용을 FormData 객체로 얻어내기
        const formData = new FormData(e.target)

        axios.patch("/user", formData, {
            headers:{"Content-Type":"multipart/form-data"}
        })
        .then(res=>{
            console.log(res.data)
            alert("수정 했습니다")
            navigate("/user/detail")
        })
        .catch(error=>{
            console.log(error)
        })
    }

    return (
        <>
            <svg ref={personSvg} style={profileStyle2}  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
            <h1>개인 정보 수정 양식</h1>
            <Form onReset={handleReset} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>사용자명</Form.Label>
                    <Form.Control name="userName" defaultValue={userInfo.userName} readOnly/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>이메일</Form.Label>
                    <Form.Control name="email" defaultValue={userInfo.email}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>프로필 이미지 ( click or drag-drop to Edit ) </Form.Label>
                    <Form.Control onChange={handleChange} ref={imageInput} style={{display:"none"}} type="file" name="image" accept="image/*"/>
                </Form.Group>
                <div className="mb-3">
                    <a href="about:blank" onClick={(e)=>{
                        e.preventDefault()
                        // input  type="file" 요소를 강제 클릭 
                        imageInput.current.click()
                    }}>
                        <div style={dropZoneStyle} ref={dropZone} onDragOver={(e)=>e.preventDefault()} onDrop={handleDrop}>
                            <img style={profileStyle} src={imageSrc} alt="프로필 이미지"/>
                        </div>
                    </a>
                </div>
                <Button type="submit" variant="success" size="sm">수정확인</Button>
                <Button className="ms-1" type="reset" variant="danger" size="sm">Reset</Button>
            </Form>
        </>
    );
}

export default UserUpdateForm;