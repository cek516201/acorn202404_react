// src/components/ConfirmModal.js

import { Button, Modal, ModalBody } from "react-bootstrap";

//Confirm 모달 
function ConfirmModal({show, message, yes, no}) {
   
    return (
        <Modal show={show}>
            <Modal.Header>알림</Modal.Header>
            <ModalBody>{message}</ModalBody>
            <Modal.Footer>
                <Button variant="success" onClick={()=>yes()}>확인</Button>
                <Button variant="danger" onClick={()=>no()}>취소</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmModal;