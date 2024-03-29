import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

import useLocalStorage from "../hooks/useLocalStorage";
import Navbar from "./Navbar";
import socketIOClient from 'socket.io-client';


import'./styles/Home.css'

const Home = () => {

  const [localStoreUsername, localRemoveUsername, localRetrieveUsername] = useLocalStorage()
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState('');
  const [createOrJoin, setCreateOrJoin] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const socket = socketIOClient.connect('https://clearchat-server.herokuapp.com');

  useEffect(() => {
    const user = localRetrieveUsername()
    if (user !== null) {
      setCurrentUser(user)
    }
  }, [])

  const handleCreateChat = (e) => {
    e.preventDefault();
    console.log(inputValue);
    axios.post('https://clearchat-server.herokuapp.com/createChat', {
      "chatname" : inputValue,
      "owner" : currentUser
    })
      .then(response => {
        if (response.data.success) {
          const chatName = inputValue
          navigate(`/chat/${chatName}`)
        } else {
          console.log(response.data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    setInputValue('');
  }

  const handleGetChatByCode = (e) => {
    e.preventDefault();
    console.log(inputValue);
    axios.post('https://clearchat-server.herokuapp.com/getChatByCode', {
      "chat_id": inputValue
    })
      .then(response => {
        if (response.data.success) {
          const chatName = response.data.chat_name
          navigate(`/chat/${chatName}`)
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
      <div id='navbar-container-home'>
        <Navbar />
      </div>

      <div id='content-container-home'>

      <h1>Welcome to clearchat</h1>
<br></br>
<br></br>

        {currentUser
          ?
          <>
            <p>Would you like to create a chat or join a chat?</p>
            <button onClick={() => setCreateOrJoin('create')}>Create</button>
            <button onClick={() => setCreateOrJoin('join')}>Join</button>
          </>
          :
          <>
            <p>Register to create a chat or use a private code to enter and existing chat</p>
            <button onClick={() => navigate('/register')}>Register</button>
            <button onClick={() => setCreateOrJoin('join')}>Join</button>
          </>
        }
        

        {createOrJoin === 'create' && 
          <form onSubmit={handleCreateChat}>
            <input className="form-input-home" type="text" placeholder="create chat name" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <br></br>
            <button type="submit-home">Create</button>
          </form>
        }
        {createOrJoin === 'join' &&
          <form onSubmit={handleGetChatByCode}>
            <input className="form-input-home" type="text" placeholder="enter code" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <br></br>
            <button type="submit-home">Join</button>
          </form>
        }
      </div>
    </div>
  );
}

export default Home;
