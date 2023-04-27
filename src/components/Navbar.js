import React from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from '../hooks/useLocalStorage';

import './styles/Navbar.css'

const Navbar = () => {

  const [localStoreUsername, localRemoveUsername, localRetrieveUsername] = useLocalStorage();

  const navigate = useNavigate()

  const logOut = () => {
    localRemoveUsername()
    navigate('/')
  }

  return (
    <div id="navbar-self-container">
      <div className="circle"></div>
      <button onClick={() => navigate('/')}>Home</button>
      <button onClick={() => navigate('/register')}>Register</button>
      <button onClick={() => navigate('/login')}>Log In</button>
      <button onClick={() => logOut()}>Log Out</button>
    </div>
  )
}

export default Navbar;
