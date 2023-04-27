import React, { useState } from 'react';
import useLocalStorage from "../hooks/useLocalStorage";


const Login = () => {

  const [localStoreUsername, localRemoveUsername, localRetrieveUsername] = useLocalStorage()
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    localStoreUsername(username)
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  return (
    <div>
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
