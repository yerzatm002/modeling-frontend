// TaskDetails.jsx (обновлённый фрагмент)
import React, { useEffect, useState } from "react";
import {
  Container, Typography, Box, CircularProgress,
  Button, TextField, Grid, Card, CardContent, List, ListItem, ListItemText
} from "@mui/material";
import { useParams } from "react-router-dom";
import { getTaskById, submitTask } from "../api/api";

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [file, setFile] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await getTaskById(id);
        setTask(data);
      } catch (err) {
        console.error("Тапсырма жүктеу қатесі", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleSubmit = async () => {
    if (!file) return alert("Файлды таңдаңыз!");
    try {
      setSubmitting(true);
      await submitTask(id, file, comment);
      setSubmitted(true);
    } catch (err) {
      console.error("Сабмит қатесі", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Container sx={{ mt: 5, textAlign: "center" }}><CircularProgress /></Container>;
  if (!task) return <Typography>Тапсырма табылмады</Typography>;

 

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>{task.title}</Typography>
      <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 3 }}>{task.description}</Typography>

      <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>🎯 Міндеттер</Typography>
      <Box sx={{ mb: 4 }}>
  {(task.objectives || "")
    .split(/\r?\n|\r|\\n/)
    .filter(line => line.trim() !== "")
    .map((line, index) => (
      <Typography key={index} variant="body1" sx={{ display: "flex", alignItems: "start", mb: 1 }}>
        •&nbsp;{line.trim()}
      </Typography>
    ))}
</Box>


      <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>📊 Бағалау критерийлері</Typography>
      <Grid container spacing={1}>
        {[
          ["Құрылымның нақтылығы (геометрия)", 5],
          ["Құралдарды дұрыс қолдану", 5],
          ["Шығармашылық және дизайн", 5],
          ["STL-файлдың дұрыстығы", 3],
          ["Жоба сипаттамасы", 2]
        ].map(([title, score], i) => (
          <Grid item xs={12} key={i}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>{title}</Typography>
                <Typography fontWeight="bold">{score} балл</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>📤 Жауапты жіберу</Typography>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <TextField
          label="Комментарий (қалауыңыз бойынша)"
          fullWidth
          multiline
          rows={3}
          sx={{ mt: 2 }}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
          disabled={submitting || submitted}
        >
          {submitted ? "Жіберілді ✅" : "Жіберу"}
        </Button>
      </Box>
    </Container>
  );
};

export default TaskDetails;
