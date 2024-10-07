// src/pages/NotFound.js

import { Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

function NotFound(props) {
    //현재 위치를 알아내기 위한 hook
    const location = useLocation()
    //위치 이동을 위한 hook 
    const navigate = useNavigate();

    return (
        <>
            <h1>404 NotFound!</h1>
            <p>
                <strong>{location.pathname}</strong> 경로는 존재 하지 않는 경로 입니다!
            </p>
            <Button variant="warning" className="me-1" onClick={()=>navigate(-1)}>뒤로가기</Button>
            <Button variant="success" as={Link} to="/">인덱스로 가기</Button>
        </>
    );
}

export default NotFound;