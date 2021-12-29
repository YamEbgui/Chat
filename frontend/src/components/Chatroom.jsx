import React, { useEffect, useRef, useState } from "react";
import { Button, Card, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import io from "socket.io-client";
import ChatLog from "./ChatLog";
import { removeUser } from "../utils";
import Users from "./Users";
import { Form } from "react-bootstrap";

export default function Chatroom({ user }) {
  const [currentMessage, setCurrentMessage] = useState({ message: "" });
  const [chat, setChat] = useState([]);
  const [users, setUsers] = useState([]);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect(`http://localhost:3000/`, {
      query: { user },
    });

    socketRef.current.on("connectionSucceed", ({ users }) => {
      setUsers(users);
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

  return (
    <Card variant="outlined" className="card d-flex flex-column ">
      <div className="topOfCard d-flex flex-row">
        <ChatLog messages={chat} />
        <Users users={removeUser(users, user)} />
      </div>
      <Form className="buttonOfCard" onSubmit={onMessageSubmit}>
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
        <Button
          sx={{ backgroundColor: "green" }}
          type="submit"
          variant="contained"
          endIcon={<SendIcon />}
        >
          Send
        </Button>
      </Form>
    </Card>
  );
}
