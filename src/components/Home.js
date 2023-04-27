import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

import useLocalStorage from "../hooks/useLocalStorage";
import Navbar from "./Navbar";

const Home = () => {

  const [localStoreUsername, localRemoveUsername, localRetrieveUsername] = useLocalStorage()
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState('');

  const handleCreateChat = (e) => {
    e.preventDefault();
    console.log(inputValue);
    axios.post('http://localhost:5002/createChat', {
      "chatname" : inputValue
    })
      .then(response => {
        if (response.data.success) {
          // navigate('/');
        } else {
          console.log(response.data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });

    setInputValue('');
  }

  return (
    <div>
      <Navbar />

      <h1>Welcome to the Chat App!</h1>
      <p>Please select a chatroom.</p>

      <form onSubmit={handleCreateChat}>
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button type="submit">Submit</button>
      </form>


<br></br>
<br></br>
<br></br>

      <button onClick={() => navigate('/room/testRoom')}>testRoom</button>
      <button onClick={() => navigate('/room/testRoom2')}>testRoom2</button>

     
    </div>
  );
}

export default Home;
