import React from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from '../hooks/useLocalStorage';


const Navbar = () => {

  const [localStoreUsername, localRemoveUsername, localRetrieveUsername] = useLocalStorage();

  const navigate = useNavigate()

  return (
    <div>
      <button onClick={() => navigate('/')}>Home</button>
      <button onClick={() => navigate('/register')}>Register</button>
      <button onClick={() => navigate('/login')}>Log In</button>
      <button onClick={() => localRemoveUsername()}>Log Out</button>
    </div>
  )
}

export default Navbar;