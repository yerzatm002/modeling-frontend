import React, { useEffect, useState } from "react";
import {
  Container, Typography, Grid, Card, CardContent, CardMedia, Button,
  CircularProgress, TextField, Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAllTasks, getMySubmissions  } from "../api/api";

const Tools = () => {
  const [submissions, setSubmissions] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taskData = await getAllTasks();
        setTasks(taskData);
      } catch (error) {
        console.error("Практикалық тапсырмаларды жүктеу қатесі", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const data = await getMySubmissions();
        setSubmissions(data);
      } catch (error) {
        console.error("Сабмиттерді жүктеу қатесі", error);
      }
    };
    fetchSubmissions();
  }, []);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase()) ||
    task.objectives?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
        Практикалық тапсырмалар
      </Typography>

      <TextField
        label="Іздеу"
        variant="outlined"
        fullWidth
        sx={{ mb: 4 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Grid container spacing={3} sx={{ mb: 5 }}>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <Grid item xs={12} md={4} key={task.id}>
              <Card sx={{ borderRadius: 2, boxShadow: 3, transition: "0.3s", '&:hover': { transform: "scale(1.03)" } }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">{task.title}</Typography>
                  <Typography variant="body2" sx={{ color: "#666", mb: 2 }}>{task.objectives?.slice(0, 100)}...</Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ backgroundColor: "black", color: "white", '&:hover': { backgroundColor: "#333" } }}
                    onClick={() => navigate(`/tasks/${task.id}`)}
                  >
                    Көру
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography color="textSecondary" sx={{ ml: 2 }}>Тапсырма табылмады</Typography>
        )}
      </Grid>

      <Typography variant="h5" fontWeight="bold" align="center" gutterBottom sx={{ mt: 5 }}>
  📤 Менің орындаған тапсырмаларым</Typography>

{submissions.length === 0 ? (
  <Typography align="center" color="textSecondary">Жіберілген тапсырмалар жоқ</Typography>
) : (
  <Grid container spacing={2} sx={{ mt: 2 }}>
    {submissions.map((s) => (
      <Grid item xs={12} key={s.id}>
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight="bold">{s.task?.title}</Typography>
            <Typography>Жіберілген күні: {new Date(s.submittedAt).toLocaleDateString()}</Typography>
            <Typography>Баға: {s.grade !== null ? `${s.grade} балл` : "Күтілуде"}</Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
)}


      <Typography variant="h5" fontWeight="bold" align="center" gutterBottom sx={{ mt: 5 }}>
        3D Принтер Симулятор
      </Typography>

      <Grid container spacing={3} sx={{ mb: 5 }} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 2, boxShadow: 3, transition: "0.3s", '&:hover': { transform: "scale(1.05)" } }}>
            <CardMedia component="img" height="200" image="https://i.pcmag.com/imagery/roundups/06msR0ZNV3Oc2GfpqCu9AcT-24..v1667861420.jpg" alt="3D Принтер Симулятор" />
            <CardContent>
              <Typography variant="h6" fontWeight="bold">3D Принтер Симулятор</Typography>
              <Typography variant="body2" sx={{ color: "#666" }}>Онлайн 3D принтер жұмысын симуляциялау</Typography>
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2, backgroundColor: "black", color: "white", '&:hover': { backgroundColor: "#333" } }}
                onClick={() => window.open("https://www.figuro.io/Designer", "_blank")}
              >
                Симуляторды бастау
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h5" fontWeight="bold" align="center" gutterBottom sx={{ mt: 5 }}>
        📝 Нұсқаулық (PDF)
      </Typography>

      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => window.open("https://drive.google.com/file/d/1JqdTb1-4b1uWXl1hbQhnJBdAvQR5gXib/view?usp=sharing", "_blank")}
        >
          Нұсқаулықты жүктеу (PDF)
        </Button>
      </Box>

      <Box sx={{ mb: 5 }}>
        <iframe
          src="https://drive.google.com/file/d/1JqdTb1-4b1uWXl1hbQhnJBdAvQR5gXib/preview"
          width="100%"
          height="600px"
          style={{ borderRadius: "8px", border: "1px solid #ccc" }}
          allow="autoplay"
        ></iframe>
      </Box>
    </Container>
  );
};

export default Tools;
