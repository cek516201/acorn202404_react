
import { Component } from 'react';
import './App.css'

//클래스형 component
class App2 extends Component{
  //상태값 (UI 에서 사용하는 데이터) 
  state={
    posts:[]
  }

  //App 컴포넌트가 준비 완료 되었을때 최초 한번 호출되는 함수(개발환경에서는 2번)
  componentDidMount(){
    this.getPosts();
  }

  //전체 글 목록을 받아오는 함수 
  getPosts = ()=>{
    fetch("/v1/posts")
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      //서버로 부터 응답된 data 로 상태값을 변경한다(UI 는 자동 update)
      this.setState({
        posts:data
      })
    })
  }

  render(){
    return (
      <div className="container">
        <h3>새글 작성 폼</h3>
        <form action="/v2/posts" method="post" onSubmit={(e)=>{
          e.preventDefault();//폼 전송 막기 
          //요청 url 
          const url=e.target.action;
          //전송할 폼 데이터
          const formData=new FormData(e.target);
          //FormData 에 들어 있는 내용을 이용해서 json 문자열 만들어내기 
          const formObject={}
          formData.forEach((value, key)=>{
            formObject[key]=value;
          });
          const jsonString = JSON.stringify(formObject);

          fetch(url, {
            method:"post",
            headers:{"Content-Type":"application/json"},
            body:jsonString
          })
          .then(res=>res.json())
          .then(data=>{
            alert(data.id+ "번 post 로 등록 되었습니다");
            this.getPosts();
          })
          .catch(error=>{
            console.log("에러 발생", error)
          });
        }}>
          <input type="text" name="title" placeholder='제목...'/>
          <input type="text" name="author" placeholder='작성자...'/>
          <button type="submit">저장</button>
        </form>
        <h3>글 목록입니다</h3>
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>수정</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(item => 
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td><button onClick={()=>{
                  const title=prompt(item.id+" 번글의 수정할 제목 입력...")
                  //수정할 정보를 object 에 담는다.
                  const obj = {
                    title:title,
                    author:item.author
                  }
                  //object 를 이용해서 json 문자열을 얻어낸다.
                  const jsonString = JSON.stringify(obj);

                  fetch("/v2/posts/"+item.id, {
                    method:"put",
                    headers:{"Content-Type":"application/json"},
                    body:jsonString
                  })
                  .then(res=>res.json())
                  .then(data=>{
                    this.getPosts();
                  });

                }}>수정</button></td>
                <td><button onClick={()=>{
                  fetch("/v1/posts/"+item.id,{
                    method:"delete"
                  })
                  .then(res=>res.json())
                  .then(data=>{
                    //목록을 다시 받아와서 화면 update
                    //this.getPosts();
                    //현재 목록에서 삭제된 아이템을 제거한 새로운 배열로 state 변경하기 
                    this.setState({
                      posts:this.state.posts.filter(it=> data.id !== it.id)
                    })
                  })  
                }}>x</button></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}


export default App2;
