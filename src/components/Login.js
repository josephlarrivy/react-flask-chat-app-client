import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import useLocalStorage from "../hooks/useLocalStorage";
import Navbar from './Navbar';

import './styles/Login.css'

const Login = () => {

  const [localStoreUsername, localRemoveUsername, localRetrieveUsername] = useLocalStorage()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()


  const handleLogin = () => {
    axios.post('http://localhost:5002/login', {
      username: username,
      password: password
    })
      .then(response => {
        if (response.data.success) {
          localStoreUsername(username);
          navigate('/');
        } else {
          console.log(response.data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }


  return (
    <div>



      <div id='navbar-container-login'>
        <Navbar />
      </div>




      <div id='content-container-login'>
        <h1>Login</h1>
        <form className='form-container-login'>


        <div className='form-input-login'>
          <label className='form-label-login'>Username:</label>
            <input className='form-text-login' type="text" value={username} onChange={handleUsernameChange} />
        </div>



        <div className='form-input-login'>
          <label className='form-label-login'>Password:</label>
          <input className='form-text-login' type="password" value={password} onChange={handlePasswordChange} />
          
        </div>

          <button className='form-submit-login' onClick={handleLogin}>Login</button>
        </form>
      </div>



      
    </div>
  );
};

export default Login;
