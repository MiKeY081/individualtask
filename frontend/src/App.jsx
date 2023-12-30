import './App.css'
import axios from 'axios'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import { Route, Routes } from 'react-router-dom'

axios.defaults.baseURL = "https://individualtask-backend.vercel.app";
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
