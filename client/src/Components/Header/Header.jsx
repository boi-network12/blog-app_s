import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/img/bj-2.webp'

const Header = () => {
  return (
    <div className="Header">
      <div className="input_logo">
        <Link to="/">
          <img src={Logo} alt="logo for this webpage" className='logo'/>
        </Link>
      </div>
      <div className="input_profile">
        <Link to="/login">
          <button className='b_btn'>
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className='w_btn'>
            SignUp
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Header