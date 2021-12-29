import React, { useEffect, useRef, useState } from "react";
import { TextField } from "@mui/material";
import io from "socket.io-client";

export default function Chatroom({ user }) {
  const [currentMessage, setCurrentMessage] = useState({ message: "" });
  const [chat, setChat] = useState([]);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect(`http://localhost:3000/`, {
      query: { user },
    });

    socketRef.current.on("messageBack", ({ id, name, message }) => {
      setChat((prevState) => {
        return [...prevState, { id, name, message }];
      });
    });
  }, []);

  const onTextChange = (e) => {
    setCurrentMessage({ ...currentMessage, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const { message } = currentMessage;
    socketRef.current.emit("message", { message });
    setCurrentMessage({ message: "" });
  };

  const renderChat = () => {
    return chat.map(({ id, name, message }) => (
      <div key={id}>
        {!message && <h4>{name} has disconnected</h4>}
        {message && (
          <h3>
            {name}: <span>{message}</span>
          </h3>
        )}
      </div>
    ));
  };

  return (
    <div className="card">
      <form onSubmit={onMessageSubmit}>
        <h1>Messenger</h1>
        <div>
          <TextField
            name="message"
            onChange={(e) => onTextChange(e)}
            value={currentMessage.message}
            id="outlined-multiline-static"
            variant="outlined"
            label="Message"
          />
        </div>
        <button>Send Message</button>
      </form>
      <div className="render-chat">
        <h1>Chat Log</h1>
        {renderChat()}
      </div>
    </div>
  );
}
