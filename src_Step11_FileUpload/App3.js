import axios from "axios";
import { useRef, useState } from "react";


function App3() {

    const inputTitle = useRef()
    const inputFile = useRef()

    //미리 보기 이미지
    const [previewImage , setPreviewImage] = useState(null)

    //버튼을 눌렀을때 실행할 함수 
    const handleUpload = ()=>{
        //입력한 제목과 이미지 파일을 FormData 객체에 담는다 
        const formData=new FormData()
        formData.append("title", inputTitle.current.value)
        formData.append("image", inputFile.current.files[0])
        axios.post("/image/upload2", formData, {
            headers:{"Content-Type":"multipart/form-data"}
        })
        .then(res=>{
            console.log(res.data)
        })
    }
    //파일을 선택했을때 호출되는 함수 
    const handleChange = (e)=>{
        //선택한 파일
        const file=e.target.files[0]
        //선택한 파일로 부터 읽어들일 객체
        const reader=new FileReader()
        //읽어들이기
        reader.readAsDataURL(file)
        //다 읽었을때 실행할 함수 등록 
        reader.onload=(event)=>{
            //읽은 이미지 데이터
            const data = event.target.result
            console.log(data)
            //읽은 데이터를 상태값으로 반영하기
            setPreviewImage(data)
        }
    }

    // img 요소에 적용할 인라인 css object
    const imgStyle={
        width:"200px",
        borderRadius:"10px"  // 따옴표 없이 borderRadius 도 가능하다 
    }

    return (
        <div>
            <h3>이미지 업로드 테스트</h3>
            <p>
                이미지를 선택하면 선택된 이미지가 바로 보이도록 하고
                업로드 버튼을 누르면 spring boot 서버에 입력한 제목과 이미지가 
                전송되도록 프로그래밍 해 보세요.
                요청 url 은  "/image/upload2" 로 설정하세요 
            </p>
            <input type="text" placeholder="제목..." ref={inputTitle}/>
            <br />
            <input type="file" accept="image/*" ref={inputFile} onChange={handleChange}/>
            <br />
            { previewImage && <img style={imgStyle} src={previewImage} alt="선택한 이미지 미리보기" /> }
            <br />
            <button onClick={handleUpload}>업로드</button>
        </div>
    );
}

export default App3;