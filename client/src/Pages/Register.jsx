import React, { useState, useEffect } from 'react'
import User from '../assets/img/user_img.png'
import {Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons';



const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    imgFile: null,
  });
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setData({ ...data, imgFile: file });
    console.log(e.target.files)
  }

  useEffect(()=>{
    axios.get('http://localhost:8000')
    .then((res)=>setData(res.data))
    .catch((error)=>console.log(error, 'its has an error'))
  },[])

  
  const registerUser = async (e) => {
    e.preventDefault();

    const {name, email, password, imgFile} = data
    try{
      const {data} = await  axios.post('/register', {
          name,
          email,
          password,
          imgFile: imgFile ? URL.createObjectURL(imgFile):null
      })
      if (data.error) {
        toast.error(data.error)
      } else {
        setData({})
        toast.success(`Login successful, welcome ${data.name}`)
        navigate('/login')
      }
    } catch (error){
      console.log(error);
    }

  }

  const handleClick = () => {
    // simulating an asynchronous task
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
    },2000)
  }

  

  return (
    <div className='form-group'>
      <form action="" onSubmit={registerUser}>
      <div className="cancelIcon">
        <Link to="/">
          <FontAwesomeIcon icon={faTimes} />
        </Link>
      </div>
        <div className='imgFile'>
           <label htmlFor='imgFile'>
             {data.imgFile ? (
              <img src={URL.createObjectURL(data.imgFile)} alt="" />
             ) : (
              <img src={User} alt="" />
             )}
             
           </label>
           <input type="file" name="imgFile" id="imgFile" onChange={handleImageChange}/>
        </div>
          <div>
           <label htmlFor="name">Name: </label>
           <input type="text" minLength="3" name="name" value={data.name} placeholder='Name of your choice ' required onChange={(e) => setData({...data, name: e.target.value})}/>
          </div>
          <div>
           <label htmlFor="email">Email: </label>
           <input type="email" minLength="3" name="email" placeholder='your mail' required value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
          </div>
          <div>
           <label htmlFor="password">Password: </label>
           <input type="password" minLength="8" name="password" placeholder='Enter your password' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required title="Must contain at least one number, one uppercase and lowercase letter, and be at least 8 characters long" value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
          </div>
          <p>Already have an account? <Link to='/login'>Login</Link></p>
          <button type='submit' className='b_btn' style={{
            alignSelf: "center"
          }}
          onClick={handleClick}
          disabled={loading}
          >
           {loading ? (
            <FontAwesomeIcon icon={faSpinner} spin />
           ) : (
            ' Submit'
           )}
          </button>
      </form>
    </div>
  )
}

export default Register