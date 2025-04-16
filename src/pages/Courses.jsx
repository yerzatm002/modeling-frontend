import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAllLessons } from "../api/api";

const Courses = () => {
  const [lessons, setLessons] = useState([]);
  const [filteredLessons, setFilteredLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const data = await getAllLessons();
        console.log("Ответ с сервера:", data);
        setLessons(data);
        setFilteredLessons(data);
      } catch (error) {
        console.error("Сабақтарды жүктеу қатесі", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, []);

  useEffect(() => {
    const filtered = lessons.filter((lesson) =>
      lesson.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredLessons(filtered);
  }, [search, lessons]);

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
        Сабақтар тізімі
      </Typography>

      <TextField
        fullWidth
        label="Сабақ атауын іздеу"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Grid container spacing={3}>
        {filteredLessons.length > 0 ? (
          filteredLessons.map((lesson) => (
            <Grid item xs={12} md={4} key={lesson.id}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: "0.3s",
                  '&:hover': { transform: "scale(1.05)" },
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={lesson.imageUrl || "https://via.placeholder.com/400x200.png?text=Сабақ"}
                  alt={lesson.title}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">{lesson.title}</Typography>
                  <Typography variant="body2" sx={{ color: "#666", minHeight: 50 }}>
                    {lesson.content?.slice(0, 80)}...
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ mt: 2, backgroundColor: "black", color: "white", '&:hover': { backgroundColor: "#333" } }}
                    onClick={() => navigate(`/lessons/${lesson.id}`)}
                  >
                    Қарау
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" color="textSecondary" align="center" sx={{ width: "100%", mt: 4 }}>
            Сабақ табылмады
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Courses;
