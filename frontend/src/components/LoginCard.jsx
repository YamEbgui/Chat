import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Container } from "react-bootstrap";

export default function LoginCard({ handleLogin }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(username);
  };

  const handleInput = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  return (
    <Container className=" mt-3 d-flex flex-column align-items-center">
      <Box
        className="d-flex flex-column align-items-center"
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 3 }}
      >
        <TextField
          onInput={handleInput}
          helperText="Please enter your username"
          label="Username"
          sx={{ mt: 3 }}
        />
        <Button sx={{ mt: 6 }} type="submit" variant="contained">
          Log in
        </Button>
      </Box>
    </Container>
  );
}
