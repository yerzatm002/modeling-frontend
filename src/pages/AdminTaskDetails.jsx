// src/pages/AdminTaskDetails.jsx
import React, { useEffect, useState } from "react";
import {
  Container, Typography, Box, CircularProgress,
  Grid, Card, CardContent, TextField, Button
} from "@mui/material";
import { useParams } from "react-router-dom";
import { getTaskById, getSubmissionsByTask, gradeSubmission } from "../api/api";

const AdminTaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [grading, setGrading] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taskData = await getTaskById(id);
        const submissionData = await getSubmissionsByTask(id);
        console.log(submissionData)
        setTask(taskData);
        setSubmissions(submissionData);
      } catch (err) {
        console.error("Қате жүктеу кезінде", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleGrade = async (submissionId) => {
    const { grade, feedback } = grading[submissionId] || {};
    if (!grade) return;
    try {
      await gradeSubmission(submissionId, Number(grade), feedback);
      const updated = await getSubmissionsByTask(id);
      setSubmissions(updated);
    } catch (err) {
      console.error("Оценка қате", err);
    }
  };

  const updateGradingState = (submissionId, field, value) => {
    setGrading(prev => ({
      ...prev,
      [submissionId]: {
        ...prev[submissionId],
        [field]: value
      }
    }));
  };

  if (loading) return <Container sx={{ mt: 5, textAlign: "center" }}><CircularProgress /></Container>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>{task.title}</Typography>
      <Typography sx={{ mb: 3 }}>{task.description}</Typography>

      <Typography variant="h6" fontWeight="bold" sx={{ mt: 4 }}>📥 Сабмиттер</Typography>
      {submissions.length === 0 ? (
        <Typography color="textSecondary">Сабмиттер жоқ</Typography>
      ) : (
        <Grid container spacing={2}>
          {submissions.map((sub) => (
            <Grid item xs={12} key={sub.id}>
              <Card>
              <CardContent>
  <Typography fontWeight="bold">
    Студент: {sub.student.firstName} {sub.student.lastName}
  </Typography>

  <Box sx={{ display: "flex", gap: 2, my: 1 }}>
    <a
      href={sub.fileUrl}
      download
      style={{ textDecoration: "none" }}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button variant="outlined">📥 Файлды жүктеу</Button>
    </a>

    {sub.fileUrl.endsWith(".stl") && (
      <a
        href={`https://www.viewstl.com/?url=${encodeURIComponent(sub.fileUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }}
      >
        <Button variant="outlined">👁️ Қарау (ViewSTL)</Button>
      </a>
    )}
  </Box>

  <Typography>Пікір: {sub.comment || "—"}</Typography>

  {sub.grade !== null ? (
    <>
      <Typography sx={{ mt: 1 }}>
        ✅ Баға қойылды: <strong>{sub.grade} балл</strong>
      </Typography>
      {sub.feedback && (
        <Typography color="textSecondary">Пікір: {sub.feedback}</Typography>
      )}
    </>
  ) : (
    <>
      <TextField
        label="Балл"
        type="number"
        sx={{ mt: 2, mr: 2, width: 100 }}
        onChange={(e) => updateGradingState(sub.id, "grade", e.target.value)}
      />
      <TextField
        label="Пікір"
        sx={{ mt: 2, mr: 2 }}
        onChange={(e) => updateGradingState(sub.id, "feedback", e.target.value)}
      />
      <Button
        variant="contained"
        onClick={() => handleGrade(sub.id)}
        sx={{ mt: 2 }}
      >
        Баға қою
      </Button>
    </>
  )}
</CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default AdminTaskDetails;
