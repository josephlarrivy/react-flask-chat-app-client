import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useNavigate, useParams } from 'react-router-dom';
import useLocalStorage from "../hooks/useLocalStorage";
import Navbar from './Navbar';

const socket = io.connect('http://localhost:5000');

const ChatRoom = () => {

  const [localStoreUsername, localRemoveUsername, localRetrieveUsername] = useLocalStorage()

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typingMessage, setTypingMessage] = useState();
  const [username, setUsername] = useState('none')
  const { roomName } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    const storedUsername = localRetrieveUsername()
    setUsername(storedUsername)
  }, []);

  useEffect(() => {
    socket.emit('join', { room: roomName, username });
    return () => {
      socket.emit('leave', { room: roomName, username });
    };
  }, [roomName, username]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const handleSubmit = e => {
    e.preventDefault();
    socket.emit('message', { room: roomName, username, message: input });
    setInput('');
  };

  return (
    <div>
      <Navbar />

      <h1>Joined <b>{roomName}</b> as <b>{username}</b></h1>
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
  );
};

export default ChatRoom;
