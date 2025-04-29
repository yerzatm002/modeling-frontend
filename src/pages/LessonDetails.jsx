import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import {
  Container, Typography, Box, CircularProgress,
  Card, CardContent, Button, Grid, LinearProgress
} from "@mui/material";
import {
  getLessonById, getTasksByLesson, getQuizzesByLesson, getUserProgress, submitQuizAnswer, saveUserProgress
} from "../api/api";

const LessonDetails = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [progress, setProgress] = useState({});
  const [showResult, setShowResult] = useState(false);


  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        const lessonData = await getLessonById(id);
        const taskData = await getTasksByLesson(id);
        const quizData = await getQuizzesByLesson(id);
        const userProgress = await getUserProgress();
        setLesson(lessonData);
        console.log(lessonData);
        setTasks(taskData);
        setQuizzes(quizData);
        setProgress(userProgress.reduce((acc, item) => {
          acc[item.lessonId] = item.completed;
          return acc;
        }, {}));
      } catch (err) {
        console.error("Деректерді жүктеу қатесі", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLessonData();
  }, [id]);

  const handleNext = () => {
    if (step + 1 < quizzes.length) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleAnswer = async (quizId, selected) => {
    try {
      const res = await submitQuizAnswer(quizId, selected);
      console.log(res)
      setAnswers((prev) => ({ ...prev, [quizId]: selected }));
      setFeedback((prev) => ({ ...prev, [quizId]: res.result }));
    } catch (err) {
      console.error("Тест қатесі", err);
    }
  };

    const handleContinueCourse = async (lessonId) => {
      await saveUserProgress({ lessonId, completed: true });
      setProgress((prev) => ({ ...prev, [lessonId]: true }));
    };

  if (loading) return <Container sx={{ mt: 5, textAlign: "center" }}><CircularProgress /></Container>;
  if (!lesson) return <Typography sx={{ mt: 4 }}>Сабақ табылмады</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {lesson.title}
      </Typography>

      <Typography variant="subtitle1" sx={{ mb: 2 }}>{lesson.content}</Typography>

      {lesson.imageUrl && (
        <Box sx={{ mb: 4 }}>
          <img src={lesson.imageUrl} alt="Lesson" width="100%" style={{ borderRadius: 10, maxHeight: 400, objectFit: "cover" }} />
        </Box>
      )}

      {lesson.videoUrl && (
        <Box sx={{ mb: 4 }}>
          <iframe
            width="100%" height="400"
            src={lesson.videoUrl.replace("watch?v=", "embed/")}
            title="Video"
            style={{ borderRadius: 10 }}
            frameBorder="0"
            allowFullScreen
          ></iframe>
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
      <br></br>
      <Typography variant="h6" fontWeight="bold"  sx={{ mb: 2,  mt: 5}}>📘 Теориялық бөлім</Typography>
      <Typography sx={{ whiteSpace: "pre-line", mb: 4 }}>{lesson.theory}</Typography>

      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>🧠 Мини-тест</Typography>

      {quizzes.length === 0 && (
        <Typography color="textSecondary">Мини-тесттер жоқ</Typography>
      )}

      {quizzes.length > 0 && !showResult && (
        <Box>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
            {step + 1} / {quizzes.length}
          </Typography>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
            >
              <Card sx={{ borderRadius: 2, mb: 3 }}>
                <CardContent>
                  <Typography fontWeight="bold" sx={{ mb: 1 }}>
                    {step + 1}. {quizzes[step].question}
                  </Typography>

                  {quizzes[step].options.map((opt, idx) => {
                    const selected = answers[quizzes[step].id] === opt.value;
                    const isCorrect = feedback[quizzes[step].id];

                    let color = "primary";
                    if (selected) {
                      color = isCorrect ? "success" : "error";
                    }

                    return (
                      <Button
                        key={idx}
                        variant={selected ? "contained" : "outlined"}
                        color={color}
                        disabled={feedback[quizzes[step].id] !== undefined}
                        onClick={() => handleAnswer(quizzes[step].id, opt.value)}
                        sx={{ mt: 1, mr: 1, textTransform: "none" }}
                      >
                        {opt.value}
                      </Button>
                    );
                  })}
                </CardContent>
              </Card>

              {feedback[quizzes[step].id] !== undefined && (
                <Button variant="contained" onClick={handleNext}>
                  Келесі сұрақ
                </Button>
              )}
            </motion.div>
          </AnimatePresence>
        </Box>
      )}

      {showResult && (
        <Box sx={{ my: 4 }}>
          <Typography variant="h6" fontWeight="bold" color="success.main">
            ✅ Нәтиже: {Object.values(feedback).filter(Boolean).length} / {quizzes.length} дұрыс жауап
          </Typography>
          <Button sx={{ mt: 2 }} onClick={() => {
            setStep(0);
            setAnswers({});
            setFeedback({});
            setShowResult(false);
          }}>
            Қайталап өту
          </Button>
        </Box>
      )}




      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>🧪 Практикалық тапсырмалар</Typography>
      {tasks.length > 0 ? (
        <Grid container spacing={2}>
          {tasks.map((task) => (
            <Grid item xs={12} key={task.id}>
              <Card sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold">{task.title}</Typography>
                  <Typography sx={{ whiteSpace: "pre-line", mt: 1 }} color="textSecondary">
                    {task.instruction}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography color="textSecondary" sx={{ mb: 4 }}>Практикалық тапсырмалар жоқ</Typography>
      )}


      <Typography variant="h5" fontWeight="bold" align="center" gutterBottom sx={{ mt: 5 }}>
        📝 ҚМЖ (Қысқа мерзімді сабақ жоспары)
      </Typography>

      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => window.open(lesson.materialUrl, "_blank")}
        >
          ҚМЖ-ны жүктеу
        </Button>
      </Box>

      <Box sx={{ mb: 5 }}>
        <iframe
          src={lesson.materialUrl}
          width="100%"
          height="600px"
          style={{ borderRadius: "8px", border: "1px solid #ccc" }}
          allow="autoplay"
        ></iframe>
      </Box>

    </Container>
  );
};

export default LessonDetails;
