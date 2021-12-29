import { Card, Container } from "@mui/material";
import React from "react";

export default function ChatLog({ user, messages }) {
  return (
    <Container className="chatLog">
      <h2>Chat Log</h2>
      {messages.map(({ id, name, message }) => {
        return (
          <Card variant="outlined" key={id}>
            {!message && <h4>{name} has disconnected</h4>}
            {message && (
              <>
                <p className="mb-0">
                  <strong> {name.toUpperCase()} </strong>
                </p>
                <p className="mt-0 pl-2">{message}</p>
              </>
            )}
          </Card>
        );
      })}
    </Container>
  );
}
