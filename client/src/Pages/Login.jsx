import React, { useState } from 'react'
import {Link } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  })
  

  const loginUser = (e) => {
    e.preventDefault();
    axios.get('/')
  }

  return (
    <div className='form-group'>
      <form action="" onSubmit={loginUser}>
        <div className="cancelIcon">
          <Link to="/">
            <p> &times; </p>
          </Link>
        </div>
          
          <div>
           <label htmlFor="email">Email: </label>
           <input type="email" name="email" placeholder='your mail' required value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
          </div>

          <div>
           <label htmlFor="password">Password: </label>
           <input type="password" name="password" placeholder='Enter your password' value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
          </div>
          <p>Don't have an account? <Link to='/register'>SignUp</Link></p>
          <button type='submit' className='b_btn' style={{
            alignSelf: "center"
          }}
          
          >
            Submit
          </button>
      </form>
    </div>
  )
}

export default Login