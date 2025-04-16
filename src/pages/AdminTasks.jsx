import React, { useEffect, useState } from "react";
import {
  Container, Typography, Grid, Card, CardContent, Button, CircularProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAllTasks } from "../api/api";

const AdminTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getAllTasks();
        setTasks(data);
      } catch (err) {
        console.error("Тапсырмаларды жүктеу қатесі", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Барлық практикалық тапсырмалар
      </Typography>

      <Grid container spacing={3}>
        {tasks.map((task) => (
          <Grid item xs={12} md={6} key={task.id}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {task.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  {task.objectives?.slice(0, 100)}...
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ backgroundColor: "black" }}
                  onClick={() => navigate(`/admin/tasks/${task.id}`)}
                >
                  Жауаптарды көру
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminTasks;
