import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';

const socket = io.connect('http://localhost:5000');

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const { roomName } = useParams();

  const username = 'test'

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

  useEffect(() => {
    console.log(roomName)
  }, [])

  const handleSubmit = e => {
    e.preventDefault();
    socket.emit('message', { room: roomName, username, message: input });
    setInput('');
  };

  return (
    <div>
      <h1>Chat Room: {roomName}</h1>
      <ul>
        {messages.map((message, i) => (
          <li key={i}>{message}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={e => setInput(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatRoom;