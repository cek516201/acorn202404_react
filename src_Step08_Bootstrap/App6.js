// src/App6.js

import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react';
import { Button, Container, Modal } from 'react-bootstrap';

function App6() {
    return (
        <Container>
            <h3>모달 테스트</h3>
            <Button variant='success'>자세히보기</Button>
            <MyModal/>
        </Container>
    );
}

function MyModal() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default App6;