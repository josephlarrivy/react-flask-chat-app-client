import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import useLocalStorage from "../hooks/useLocalStorage";

const Home = () => {

  const [localStoreUsername, localRemoveUsername, localRetrieveUsername] = useLocalStorage()
  const navigate = useNavigate()

  return (
    <div>
      <button onClick={() => { navigate('/') }}>Home</button>
      <button onClick={() => { navigate('/login') }}>Log In</button>
      <button onClick={() => { localRemoveUsername() }}>Log Out</button>

      <h1>Welcome to the Chat App!</h1>
      <p>Please select a chatroom.</p>
      <button onClick={() => navigate('/room/testRoom')}>testRoom</button>
      <button onClick={() => navigate('/room/testRoom2')}>testRoom2</button>
    </div>
  );
}

export default Home