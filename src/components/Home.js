import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import useLocalStorage from "../hooks/useLocalStorage";
import Navbar from "./Navbar";

const Home = () => {

  const [localStoreUsername, localRemoveUsername, localRetrieveUsername] = useLocalStorage()
  const navigate = useNavigate()

  return (
    <div>
      <Navbar />

      <h1>Welcome to the Chat App!</h1>
      <p>Please select a chatroom.</p>
      <button onClick={() => navigate('/room/testRoom')}>testRoom</button>
      <button onClick={() => navigate('/room/testRoom2')}>testRoom2</button>
    </div>
  );
}

export default Home