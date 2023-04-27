import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

import useLocalStorage from "../hooks/useLocalStorage";
import Navbar from "./Navbar";

const Home = () => {

  const [localStoreUsername, localRemoveUsername, localRetrieveUsername] = useLocalStorage()
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState('');
  const [createOrJoin, setCreateOrJoin] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const user = localRetrieveUsername()
    if (user !== null) {
      setCurrentUser(user)
    } else {
      setCurrentUser(null)
    }
  }, [])

  const handleCreateChat = (e) => {
    e.preventDefault();
    console.log(inputValue);
    axios.post('http://localhost:5002/createChat', {
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
    axios.post('http://localhost:5002/getChatByCode', {
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
      <Navbar />

      <h1>Welcome to the Chat App!</h1>

      {currentUser
        ?
        <>
          <p>Would you like to create a chat or join a chat?</p>
          <button onClick={() => setCreateOrJoin('create')}>Create</button>
          <button onClick={() => setCreateOrJoin('join')}>Join</button>
        </>
        :
        <>
          <p>Register to create chats or use a private code to enter and existing chat</p>
          <button onClick={() => navigate('/register')}>Register</button>
          <button onClick={() => setCreateOrJoin('join')}>Join</button>
        </>
      }
      

      {createOrJoin === 'create' && 
        <form onSubmit={handleCreateChat}>
          <input type="text" placeholder="create chat name" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          <button type="submit">Create</button>
        </form>
      }
      {createOrJoin === 'join' &&
        <form onSubmit={handleGetChatByCode}>
          <input type="text" placeholder="enter private code" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          <button type="submit">Join</button>
        </form>
      }
      
     
    </div>
  );
}

export default Home;
