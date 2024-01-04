import React, { useContext, useState  } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/bj-2.webp';
import UserImg from '../../assets/img/user_img.png'
import LogOutImg from '../../assets/img/logout.png'
import { UserContext } from '../../Context/userContext';

const Header = ({onDashboardClick}) => {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);

 
  return (
    <div className='Header'>
      <div className="input_logo">
        <Link to="/">
          <img src={Logo} alt="logo for this webpage" className='logo'/>
        </Link>
      </div>
      <div className="input_profile">
        {user ? (
          <div className='menu_trigger'>
            <div className="trigger" onClick={() => {setOpen(!open)}}>
              <span>{user.name}</span> {/* Display user.name if user exists */}
              <img src={user.imgFile} alt="" />
            </div>
            <div className={`menu ${open? 'active' : 'inactive'}`}>
              <p className='m_f'>{user.email}</p>
                <DropdownItem/>
            </div>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

function DropdownItem(){
  return (
    <li className="dropdownItem">
      <Link to="dashboard">
        
        <p><img src={UserImg} style={{borderRadius : '50%'}} alt="" /> profile</p>
      </Link>
      <Link to='/login' >
        <p style={{color : "red"}}><img style={{borderRadius : 'none', width: '25px', height: '25%', transform: 'rotate(180deg)'}} src={LogOutImg} alt="" /> LogOut</p>
      </Link>
    </li>
  )
}

export default Header;
