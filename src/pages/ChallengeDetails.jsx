import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box, Button, CircularProgress, TextField } from "@mui/material";
import { getChallengeById, uploadFile } from "../api/api";

const ChallengeDetails = () => {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const challengeData = await getChallengeById(id);
        setChallenge(challengeData);
      } catch (error) {
        console.error("Ошибка загрузки данных челленджа", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      await uploadFile(file);
      alert("Файл успешно загружен!");
    } catch (error) {
      console.error("Ошибка загрузки файла", error);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold">{challenge?.title}</Typography>
      <Typography variant="body1" sx={{ color: "#666", mt: 2 }}>{challenge?.description}</Typography>
      
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "black", color: "white", '&:hover': { backgroundColor: "#333" } }}
        >
          Принять вызов
        </Button>
      </Box>
      
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Загрузить документ</Typography>
        <TextField type="file" onChange={handleFileChange} sx={{ mt: 2 }} fullWidth />
        <Button
          variant="contained"
          sx={{ mt: 2, backgroundColor: "black", color: "white", '&:hover': { backgroundColor: "#333" } }}
          onClick={handleFileUpload}
          disabled={!file || uploading}
        >
          {uploading ? "Загрузка..." : "Загрузить файл"}
        </Button>
      </Box>
    </Container>
  );
};

export default ChallengeDetails;
