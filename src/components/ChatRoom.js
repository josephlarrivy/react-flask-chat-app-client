import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useLocalStorage from "../hooks/useLocalStorage";
import Navbar from './Navbar';

import './styles/ChatRoom.css'
import Message from './Message';

const socket = io.connect('http://localhost:5000');

const ChatRoom = () => {

  const [localStoreUsername, localRemoveUsername, localRetrieveUsername] = useLocalStorage()

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typingMessage, setTypingMessage] = useState();
  const [username, setUsername] = useState('none')
  const [chatCode, setChatCode] = useState(null)
  const { chatName } = useParams();

  const liveChatRef = useRef(null)

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
    console.log(messages)
  }, [messages]);

  useLayoutEffect(() => {
    liveChatRef.current.scrollTop = liveChatRef.current.scrollHeight;
  }, [messages]);

  const handleSubmit = e => {
    e.preventDefault();
    socket.emit('message', { room: chatName, username, message: input });
    setInput('');
  };

  return (
    <div>
      <div id='navbar-container-chatroom'>
        <Navbar />
      </div>

      <div id='content-container-chatroom'>
        <div id='chat-display-container'>
          <div id='chat-container'>
            <div id='live-chat-area' ref={liveChatRef}>
              {messages.map((item, i) => (
                <Message key={i} message={item.message} username={item.username}/>
              ))}
            </div>
            <form className='input-form' onSubmit={handleSubmit}>
              <input
                type="text-area"
                value={input}
                onChange={e => setInput(e.target.value)}
              />
              <button type="submit">Send</button>
            </form>
          </div>

          <div id='right-container'>
            <h1>Joined <b>{chatName}</b> as <b>{username}</b></h1>
            <p>{chatCode}</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ChatRoom;
