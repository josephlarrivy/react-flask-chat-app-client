import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import Navbar from './Navbar';
import './styles/Register.css'

const Register = () => {
  const [localStoreUsername, localRemoveUsername, localRetrieveUsername] = useLocalStorage();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    axios
      .post('https://clearchat-server.herokuapp.com/register', {
        username: username,
        password: password,
        email: email,
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
  };

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  return (
    <div>
      <div id='navbar-container-register'>
        <Navbar />
      </div>

      <div id='content-container-register'>
        <h1>Register</h1>
        <form className='form-container-register'>
          <div className='form-input-register'>
            <label className='form-label-register'>Username:</label>
            <input className='form-text-register' type="text" value={username} onChange={handleUsernameChange} />
          </div>
          <div className='form-input-register'>
            <label className='form-label-register'>Password:</label>
            <input className='form-text-register' type="password" value={password} onChange={handlePasswordChange} />
          </div>
          <div className='form-input-register'>
            <label className='form-label-register'>Email:</label>
            <input className='form-text-register' type="email" value={email} onChange={handleEmailChange} />
          </div>
          <button className='form-submit-register' onClick={handleRegister}>Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;