import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import useLocalStorage from "../hooks/useLocalStorage";
import Navbar from './Navbar';


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
      <Navbar />

      <h1>Login</h1>
      <label>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
