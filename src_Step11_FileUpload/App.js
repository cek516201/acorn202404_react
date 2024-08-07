// App.css 적용하기 (내부 css)
import { useRef, useState } from 'react';
import './App.css'
import axios from 'axios';

//함수형 component
function App() {

  //input 요소의 참조값을 활용하기 위해
  const inputFile = useRef()
  //서버에서 응답된 업로드된 이미지에 대한 정보를 state 로 관리하기 위해 
  const [imageData, setImageData] = useState({})

  //업로드 버튼을 눌렀을때 호출되는 함수 
  const handleUpload = ()=>{
    //선택한 파일 객체 
    const selectedFile = inputFile.current.files[0]
    //FormData 객체를 생성해서
    const formData = new FormData()
    //선택한 파일을 "image" 라는 파라미터명으로 담고 
    formData.append("image", selectedFile)
    //axios 를 이용해서 multipart 요청을 보낸다
    axios.post("/image/upload", formData, {
      headers:{
        "Content-Type":"multipart/form-data"
      }
    })
    .then(res=>{
      console.log(res.data)
      //응답된 데이터를 state 에 반영하기
      setImageData(res.data)
    })
    .catch(error=>{
      console.log(error)
    })
  }
  return (
    <div className="container">
      <h1>인덱스 페이지 입니다</h1>
      
      <input type="file" accept='image/*' ref={inputFile}/>
      <button onClick={handleUpload}>업로드</button>

      <p> 업로드된 파일명 : <strong>{imageData.orgFileName}</strong></p>
      { imageData.saveFileName && <img src={"/upload/images/"+imageData.saveFileName}/>}
    </div>
  );
}

//외부에서 App.js 를 import 하면 App 함수를 사용할수 있다. (src/index.js)
export default App;
