import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('/login', {
        email: data.email,
        password: data.password,
      });

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({});
        toast.success(`Login successful!`);
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="form-group">
      <form action="" onSubmit={loginUser}>
        <h1>Login Form</h1>
        <div className="cancelIcon">
          <Link to="/">
            <FontAwesomeIcon icon={faTimes} />
          </Link>
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Your mail"
            required
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <p>
          Don't have an account? <Link to="/register">SignUp</Link>
        </p>
        <button
          type="submit"
          className="b_btn"
          style={{
            alignSelf: 'center',
          }}
          disabled={loading}
        >
          {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Login;
