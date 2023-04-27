import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import Navbar from './Navbar';

const Register = () => {
  const [localStoreUsername, localRemoveUsername, localRetrieveUsername] = useLocalStorage();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    axios
      .post('http://localhost:5002/register', {
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
      <Navbar />
      <h1>Register</h1>
      <label>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;