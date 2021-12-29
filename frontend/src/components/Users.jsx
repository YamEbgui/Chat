import { Container } from "@mui/material";
import React from "react";

export default function Users({ users }) {
  return (
    <Container className="activeUsers">
      <h2>Active Users</h2>
      {users.map((user) => {
        return <p>{user.toUpperCase()}</p>;
      })}
    </Container>
  );
}
