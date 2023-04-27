import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import useLocalStorage from "../hooks/useLocalStorage";
import Navbar from './Navbar';


const Login = () => {

  const [localStoreUsername, localRemoveUsername, localRetrieveUsername] = useLocalStorage()
  const [username, setUsername] = useState('');
  const navigate = useNavigate()


  const handleLogin = () => {
    localStoreUsername(username)
    axios.post('http://localhost:5002/login', {
      username: username,
      password: 'pass' // replace with the actual password input
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



  return (
    <div>
      <Navbar />

      <h1>Login</h1>
      <label>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;