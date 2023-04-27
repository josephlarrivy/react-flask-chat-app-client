import React, { useEffect, useState } from "react";
import './styles/Message.css'

const Message = ({ message, username }) => {
  const [timestamp, setTimestamp] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsed(Math.round((Date.now() - timestamp) / 1000));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [timestamp]);

  return (
    <div className="single-message-container">
      <p className="single-message-message">{message}</p>
      <p className="single-message-username">{username}</p>
      <p className="single-message-time">{`${elapsed} seconds ago`}</p>
    </div>
  );
};

export default Message;
