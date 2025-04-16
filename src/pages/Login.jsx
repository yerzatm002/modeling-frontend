import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";
import useUserStore from "../store/useUserStore";

const Login = () => {
  const { setUser } = useUserStore();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userdata = await loginUser(credentials);
      setUser(userdata.user);

      // 🔁 Роль бойынша бағыттау
      if (userdata.user.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/profile");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, border: "1px solid #ddd", borderRadius: 2 }}>
        <Typography variant="h5" fontWeight="bold">Кіру</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField fullWidth margin="normal" label="E-mail" name="email" onChange={handleChange} required />
          <TextField fullWidth margin="normal" type="password" label="Құпиясөз" name="password" onChange={handleChange} required />
          <Button type="submit" variant="contained" sx={{ mt: 2, backgroundColor: "black", color: "white" }}>Кіру</Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
