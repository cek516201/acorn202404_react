//src/components/Fortune.js

import { useSelector } from "react-redux";


function Fortune() {
    //로그인 여부 
    const isLogin = useSelector(state=>state.isLogin)

    return (
        <div>
            { isLogin && <p>로그인 중 이시군요...</p>}
            <p>오늘의 운세: 동쪽으로 가면 귀인을 만나요</p>
        </div>
    );
}

export default Fortune;