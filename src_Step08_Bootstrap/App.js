
// bootstrap css 로딩   >npm install bootstrap 설치 했기 때문에 사용가능
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
// >npm install react-bootstrap 설치 했기때문에 사용가능 
import { Alert, Button, Col, Row } from 'react-bootstrap';

//함수형 component
function App() {

  return (
    <div className="container">
      <h1>인덱스 페이지 입니다</h1>
      <div className="row">
        <div className="col">칼럼1</div>
        <div className="col">칼럼2</div>
        <div className="col">칼럼3</div>
      </div>
      <Row>
          <Col>칼럼1</Col>
          <Col>칼럼2</Col>
          <Col>칼럼3</Col>
      </Row>
      <button className="btn btn-primary">primary 버튼</button>
      <Button variant='primary' size='lg'>primary 버튼</Button>
      <br />
      <AlertExample/>
    </div>
  );
}

//함수형 컴포넌트 
function AlertExample() {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          Change this and that and try again. Duis mollis, est non commodo
          luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
          Cras mattis consectetur purus sit amet fermentum.
        </p>
      </Alert>
    );
  }
  return <Button onClick={() => setShow(true)}>Show Alert</Button>;
}



//외부에서 App.js 를 import 하면 App 함수를 사용할수 있다. (src/index.js)
export default App;
