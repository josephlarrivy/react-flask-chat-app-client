import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

const Home = () => {

  const navigate = useNavigate()

  return (
    <div>
      <h1>Welcome to the Chat App!</h1>
      <p>Please select a chatroom.</p>
      <Login />
      <button onClick={() => navigate('/room/testRoom')}>testRoom</button>
      <button onClick={() => navigate('/room/testRoom2')}>testRoom2</button>
    </div>
  );
}

export default Home