// App.css 적용하기 (내부 css)
import { NavLink, useOutlet } from 'react-router-dom';
import './App.css'

//함수형 component
function App() {

  //현재 route 된 정보를 출력해주는 hook
  const currentOutlet = useOutlet()

  return (
    <>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/members">Member</NavLink></li>
      </ul>
      <div className="container">
        <div>{currentOutlet}</div>
      </div>
    </>
  );
}

//외부에서 App.js 를 import 하면 App 함수를 사용할수 있다. (src/index.js)
export default App;
