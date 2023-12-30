import './App.css'
import axios from 'axios'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import { Route, Routes } from 'react-router-dom'

axios.defaults.baseURL = "http://localhost:3000/api/v1";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/home' element={<Home/>}></Route>
      </Routes>
    </>
  )
}

export default App
