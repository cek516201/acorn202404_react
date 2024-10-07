// src/router/router.js
import App from '../App' //App Component 를 최상위 component 로 사용하기 위해
import ProtectedRoute from '../components/ProtectedRoute'
import Cafe from '../pages/Cafe'
import CafeDetail from '../pages/CafeDetail'
import CafeForm from '../pages/CafeForm'
import CafeUpdateForm from '../pages/CafeUpdateForm'
import Gallery from '../pages/Gallery'
import GalleryDetail from '../pages/GalleryDetail'
import GalleryForm from '../pages/GalleryForm'
import Home from '../pages/Home'
import Member from '../pages/Member'
import MemberForm from '../pages/MemberForm'
import MemberUpdateForm from '../pages/MemberUpdateForm'
import NotFound from '../pages/NotFound'
import UserDetail from '../pages/UserDetail'
import UserForm from '../pages/UserForm'
import UserPwdUpdateForm from '../pages/UserPwdUpdateForm'
import UserUpdateForm from '../pages/UserUpdateForm'

const { createBrowserRouter } = require("react-router-dom")

//라우트 정보를 배열에 저장
const routes=[
    // spring boot 서버에 넣어서 실행하면 최초 로딩될때  /index.html 경로로 로딩된다.
    // 그럴때도  Home 컴포넌트가 활성화 될수 있도록 라우트 정보를 추가한다. 
    {path:"/index.html", element: <Home/>},
    {path:"/", element: <Home/>},
    {path:"/members", element: <Member/>},
    {path:"/members/new", element: <MemberForm/>},
    {path:"/members/:num/edit", element:<MemberUpdateForm/>},
    {path:"/gallery", element:<Gallery/>},
    {path:"/gallery/new", element: <ProtectedRoute><GalleryForm/></ProtectedRoute>},
    {path:"/gallery/:num", element: <GalleryDetail/>},
    {path:"/cafes", element: <Cafe/>},
    {path:"/cafes/new", element: <ProtectedRoute><CafeForm/></ProtectedRoute>},
    {path:"/cafes/:num", element: <CafeDetail/>},
    {path:"/cafes/:num/edit", element : <ProtectedRoute><CafeUpdateForm/></ProtectedRoute>},
    {path:"/user/new", element:<UserForm/>},
    {path:"/user/detail", element:<ProtectedRoute><UserDetail/></ProtectedRoute>},
    {path:"/user/edit", element:<ProtectedRoute><UserUpdateForm/></ProtectedRoute>},
    {path:"/user/password/edit", element:<ProtectedRoute><UserPwdUpdateForm/></ProtectedRoute>},
    {path:"*", element:<NotFound/>}
]

//BrowserRouter 를 만들기
const router = createBrowserRouter([{
    path:"/",
    element:<App/>,
    children: routes.map((route)=>{
        return {
            index: route.path === "/", //자식의 path 가 "/" 면 index 페이지 역활을 하게 하기 
            path: route.path === "/" ? undefined : route.path, // path 에 "/" 두개가 표시되지 않게  
            element: route.element //어떤 컴포넌트를 활성화 할것인지 
        }
    })
}])

// import 한 곳에 router(BrowserRouter) 를 사용하도록 
export default router