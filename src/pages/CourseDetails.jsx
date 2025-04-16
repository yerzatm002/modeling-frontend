import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Box, Button, CircularProgress, Grid, Card, CardContent, CardMedia, LinearProgress } from "@mui/material";
import { getCourseById, getLessonsByCourse, getUserProgress, saveUserProgress, getCourses } from "../api/api";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState({});
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseData = await getCourseById(id);
        const lessonsData = await getLessonsByCourse(id);
        const userProgress = await getUserProgress();
        const allCourses = await getCourses();
        
        setCourse(courseData);
        setLessons(lessonsData);
        setProgress(userProgress.reduce((acc, item) => {
          acc[item.lessonId] = item.completed;
          return acc;
        }, {}));
        setRecommendedCourses(allCourses.filter((c) => c.id !== id).slice(0, 3));
      } catch (error) {
        console.error("Ошибка загрузки данных", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleContinueCourse = async (lessonId) => {
    await saveUserProgress({ lessonId, completed: true });
    setProgress((prev) => ({ ...prev, [lessonId]: true }));
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
      <Typography variant="h4" fontWeight="bold">{course?.title}</Typography>
      <Typography variant="body1" sx={{ color: "#666", mt: 2 }}>{course?.description}</Typography>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h5" fontWeight="bold">Сабақтар</Typography>
        {lessons.map((lesson) => (
          <Card key={lesson.id} sx={{ mb: 2, borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">{lesson.title}</Typography>
              <Typography variant="body2" sx={{ color: "#666" }}>{lesson.content}</Typography>
              {lesson.videoUrl && (
                <Box sx={{ mt: 2 }}>
                {lesson.videoUrl.includes("youtube.com") || lesson.videoUrl.includes("youtu.be") ? (
                  <iframe
                    width="100%"
                    height="400"
                    src={lesson.videoUrl.replace("watch?v=", "embed/")}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video width="100%" controls>
                    <source src={lesson.videoUrl} type="video/mp4" />
                    Ваш браузер не поддерживает видео тег.
                  </video>
                )}
              </Box>
              
              )}
              <LinearProgress variant="determinate" value={progress[lesson.id] ? 100 : 0} sx={{ mt: 2 }} />
              <Button
                variant="contained"
                sx={{ mt: 2, backgroundColor: "black", color: "white", '&:hover': { backgroundColor: "#333" } }}
                onClick={() => handleContinueCourse(lesson.id)}
              >
                {progress[lesson.id] ? "Аяқталды" : "Сабақты жалғастыру"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Typography variant="h5" fontWeight="bold" sx={{ mt: 5 }}>Ұсынылған курстар</Typography>
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {recommendedCourses.map((rec) => (
          <Grid item xs={12} md={4} key={rec.id}>
            <Card sx={{ borderRadius: 2, boxShadow: 3, transition: "0.3s", '&:hover': { transform: "scale(1.05)" } }}>
              <CardMedia component="img" height="200" image={rec.imageUrl} alt={rec.title} />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">{rec.title}</Typography>
                <Typography variant="body2" sx={{ color: "#666" }}>{rec.description}</Typography>
                <Button
                  variant="contained"
                  sx={{ mt: 2, backgroundColor: "black", color: "white", '&:hover': { backgroundColor: "#333" } }}
                  onClick={() => navigate(`/courses/${rec.id}`)}
                >
                  Курсты қарау
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CourseDetails;