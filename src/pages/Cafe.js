// src/pages/Cafe.js

import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";


function Cafe() {
    return (
        <>
            <Link to="/cafe/new">새글 작성</Link>
            <h1>Cafe 글 목록 입니다</h1>
            <Table striped bordered size="sm">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>조회수</th>
                        <th>등록일</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </Table>
        </>
    );
}

export default Cafe;