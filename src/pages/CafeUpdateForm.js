// src/pages/CafeUpdateForm.js

import { Link } from "react-router-dom";


function CafeUpdateForm() {

    return (
        <>
            <nav>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to="/cafes">Cafe</Link></li>
                    <li className="breadcrumb-item active">Update</li>
                </ol>
		    </nav>
            <h1>글 수정 양식 입니다</h1>

        </>
    );
}

export default CafeUpdateForm;