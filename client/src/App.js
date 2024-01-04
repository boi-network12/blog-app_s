import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import axios from "axios";
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from './Context/userContext';
import Dashboard from './Pages/Dashboard';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {



  return (
    <UserContextProvider>
      <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
