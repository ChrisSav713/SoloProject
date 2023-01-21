import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './components/Register'
import Game from './components/Game'
import Login from './components/Login'
import Splash from './components/Splash'
import Users from './components/Users'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" default element={<Register/>} />
          <Route path="/register" default element={<Register/>} />
          <Route path="/login" default element={<Login/>} />
          <Route path="/users" default element={<Users/>} />
          <Route path="/game" default element={<Game/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
