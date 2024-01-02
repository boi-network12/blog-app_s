import { Routes, Route } from 'react-router-dom'
import './App.css';
import Header from "./Components/Header/Header"
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import axios from "axios"
import { Toaster } from 'react-hot-toast'



axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;


function App() {
  return (
    <>
      <Header />
      <Toaster position="bottom-right" toastOptions={{duration : 3000}}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>

  );
}

export default App;
