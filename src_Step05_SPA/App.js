
import { Component } from 'react';
import './App.css'
import { NavLink, Route, Routes } from 'react-router-dom';
// bootstrap css 로딩 
import "bootstrap/dist/css/bootstrap.css"
import { Home, NotFound, Play, Post, Study } from './pages';

//클래스형 component
class App extends Component{

  render(){

    return (
      <div className="container">
        <h1>React Router 를 이용한 SPA 테스트</h1>
        <p>Single Page Application</p>
        <ul className='nav nav-pills'>
          <li className='nav-item'><NavLink className='nav-link' to="/">Home</NavLink></li>
          <li className='nav-item'><NavLink className='nav-link' to="/play">Play</NavLink></li>
          <li className='nav-item'><NavLink className='nav-link' to="/study">Study</NavLink></li>
          <li className='nav-item'><NavLink className='nav-link' to="/post">Post</NavLink></li>
        </ul>
        <Routes>
          <Route path="/" Component={Home}/>
          <Route path="/play" Component={Play}/>
          <Route path="/study/*" Component={Study}/>
          <Route path="/post" Component={Post}/>
          <Route path="/*" Component={NotFound}/>
        </Routes>
      </div>
    )
  }
}

export default App;
