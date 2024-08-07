import axios from "axios";
import { useRef, useState } from "react";


function App2() {
    //input 요소의 참조값을 활용하기 위해
    let inputFile=useRef()

    const [fileData, setFileData]=useState({
        orgFileName:"",
        saveFileName:"",
        fileSize:0,
        url:""
    })

    const handleUpload = ()=>{
        //FormData 객체를 생성해서 
        const formData=new FormData()
        //선택한 파일을 myFile 라는 파라미터명으로 담는다
        formData.append("myFile", inputFile.current.files[0])
        //axios 를 이용해서 multipart 요청을 보낸다
        axios.post("/file/upload", formData, {
            headers:{
              "Content-Type":"multipart/form-data"
            }
        })
        .then(res=>{
            //다운로드 요청을 할 url 구성
            const url="http://localhost:8888/file/download?"+
                "orgFileName="+res.data.orgFileName+
                "&saveFileName="+res.data.saveFileName+
                "&fileSize="+res.data.fileSize;
            //상태값 변경
            setFileData({
                orgFileName:res.data.orgFileName,
                saveFileName:res.data.saveFileName,
                fileSize:res.data.fileSize,
                url
            })
        })
        .catch(error=>{
            console.log(error)
        })
    }

    return (
        <div>
            <h1>파일 업로드 테스트</h1>

            <input type="file" ref={inputFile}/>
            <button onClick={handleUpload}>업로드</button>
            {
                fileData.fileSize !== 0 &&
                <div>
                    <p>원본 파일명 : <strong>{fileData.orgFileName}</strong></p>
                    <p>저장 파일명 : <strong>{fileData.saveFileName}</strong></p>
                    <p>파일의 크기 : <strong>{fileData.fileSize}</strong> byte</p>
                    <a href={fileData.url}>다운로드</a>
                </div>
            }
        </div>
    );
}

export default App2;