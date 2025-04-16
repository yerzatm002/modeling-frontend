import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";

const Register = () => {
  const [formData, setFormData] = useState({ email: "", password: "", firstName: "", lastName: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await registerUser(formData);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, border: "1px solid #ddd", borderRadius: 2 }}>
        <Typography variant="h5" fontWeight="bold">Тіркелу</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField fullWidth margin="normal" label="E-mail" name="email" onChange={handleChange} required />
          <TextField fullWidth margin="normal" type="password" label="Құпиясөз" name="password" onChange={handleChange} required />
          <TextField fullWidth margin="normal" label="Аты" name="firstName" onChange={handleChange} required />
          <TextField fullWidth margin="normal" label="Тегі" name="lastName" onChange={handleChange} required />
          <Button type="submit" variant="contained" sx={{ mt: 2, backgroundColor: "black", color: "white" }}>Тіркелу</Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
