import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useLocalStorage from "../hooks/useLocalStorage";
import Navbar from './Navbar';

import './styles/ChatRoom.css'

const socket = io.connect('http://localhost:5000');

const ChatRoom = () => {

  const [localStoreUsername, localRemoveUsername, localRetrieveUsername] = useLocalStorage()

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typingMessage, setTypingMessage] = useState();
  const [username, setUsername] = useState('none')
  const [chatCode, setChatCode] = useState(null)
  const { chatName } = useParams();


  useEffect(() => {
    const storedUsername = localRetrieveUsername()
    setUsername(storedUsername)

    const getChatCode = async () => {
      axios.post('http://localhost:5002/getCodeByName', {
        "chat_name": chatName
      })
        .then(response => {
          if (response.data.success) {
            const chat_id = response.data.chat_id
            setChatCode(chat_id)
          } else {
            console.log(response.data.message);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
    getChatCode()
  }, []);

  useEffect(() => {
    if (username !== 'none') {
      socket.emit('join', { room: chatName, username });
      return () => {
        socket.emit('leave', { room: chatName, username });
      };
    }
  }, [chatName, username]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const handleSubmit = e => {
    e.preventDefault();
    socket.emit('message', { room: chatName, username, message: input });
    setInput('');
  };

  return (
    <div>
      <div id='navbar-container'>
        <Navbar />
      </div>

      <div id='content-container'>
        <h1>Joined <b>{chatName}</b> as <b>{username}</b></h1>
        <p>{chatCode}</p>
        <ul>
          {messages.map((message, i) => (
            <li key={i}>{message}</li>
          ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
