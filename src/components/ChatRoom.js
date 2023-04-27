import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useLocalStorage from "../hooks/useLocalStorage";
import Navbar from './Navbar';
import socketIOClient from 'socket.io-client';


import './styles/ChatRoom.css'
import Message from './Message';

const socket = socketIOClient.connect('https://clearchat-server.herokuapp.com');

const ChatRoom = () => {

  const [localStoreUsername, localRemoveUsername, localRetrieveUsername] = useLocalStorage()

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typingMessage, setTypingMessage] = useState();
  const [username, setUsername] = useState('none')
  const [chatCode, setChatCode] = useState(null)
  const { chatName } = useParams();
  const socket = io.connect('https://clearchat-server.herokuapp.com');

  const liveChatRef = useRef(null)

  useEffect(() => {
    const user = localRetrieveUsername()
    if (user !== null) {
      setUsername(user)
    } else {
      setUsername("Guest User")
    }

    const getChatCode = async () => {
      axios.post('https://clearchat-server.herokuapp.com/getCodeByName', {
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
    if (input.length > 0) {
      socket.emit('message', { room: chatName, username, message: input });
      setInput('');
    }
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
                <Message key={i} message={item.message} username={item.username} currentUser={username}/>
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
            <h4>You have joined: {chatName}</h4>
            <p>username: <b>{username}</b></p>
            <br></br>

            <p>The code for this chat is:</p>
            <p><b>{chatCode}</b></p>
            <p> People that you wish to connect can use this code on the homepage to find this chat.</p>
            <br></br>
            <p>This is not an encrypted chat. However, be careful because once you leave or refresh your page there is no way to retreive your previous messages.</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ChatRoom;
