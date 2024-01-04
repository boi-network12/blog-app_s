import React, { useContext } from 'react';
import { UserContext } from '../Context/userContext';
import { Link } from 'react-router-dom';
import UserImg from '../assets/img/user_img.png'
import LogOutImg from '../assets/img/logout.png'
import UpdateImg from '../assets/img/updating.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <div className='dashboard'>
      <h1>Dashboard</h1>

      {!!user && (
        
        <div className='dashboardInfo'>
                <div className="cancelIcon">
                <Link to="/">
                    <FontAwesomeIcon icon={faTimes} />
                </Link>
                </div>
            <div className="img">
            {!user.imgFile && <img src={UserImg} alt="Default Logo" />}
            </div>
          {/* Display user.name inside an input */}
          <input type='text' value={`Name : ${user.name}`} readOnly />

          {/* Display user.id inside an input */}
          <input type='text' value={`Id : ${user.id}`} readOnly />

          {/** Display user.email inside an input */}
          <input style={{width: '92%'}} type="email" value={`Email : ${user.email}`} readOnly/>

          <div className="dashboardBtn">
          <Link to='/login' >
            <p style={{
                color : "red",
                background: '#ddd',
                padding: '10px',
                borderRadius: '5px',
                width: '130px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                }}><img style={{borderRadius : 'none', width: '20px', height: '20%', transform: 'rotate(180deg)', marginRight: '10px'}} src={LogOutImg} alt="" /> LogOut</p>
            
         </Link>
          <Link to='' >
            <p style={{
                color : "#ddd",
                background: '#016afb',
                padding: '10px',
                borderRadius: '5px',
                width: '130px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                }}><img style={{borderRadius : 'none', width: '20px', height: '20%', transform: 'rotate(180deg)', marginRight: '10px'}} src={UpdateImg} alt="" /> Update</p>
            
         </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
