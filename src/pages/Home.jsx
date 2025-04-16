import React from "react";
import { Container, Typography, Button, Grid, Card, CardContent, CardMedia, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ textAlign: "center", mt: 4 }}>
      {/* Заголовок и описание */}
      <Typography variant="h3" fontWeight="bold" sx={{ color: "#333" }}>
        ModelMaster бағдарламасына қош келдіңіз!
      </Typography>
      <Typography variant="h6" sx={{ color: "#555", mt: 1 }}>
       3D модельдеу мен 3D басып шығаруға бастайтын жол!
      </Typography>
      
      {/* Кнопка "Бастау" */}
      <Button
        variant="contained"
        sx={{
          backgroundColor: "black",
          color: "white",
          mt: 3,
          px: 4,
          py: 1,
          fontSize: "1.1rem",
          borderRadius: "20px",
          "&:hover": { backgroundColor: "#333" }
        }}
        onClick={() => navigate("/login")}
      >
        Бастау
      </Button>

      {/* Информационные блоки */}
      <Grid container spacing={3} sx={{ mt: 5 }}>
        {/* Платформаға шолу */}
      <Grid item xs={12} md={4}>
        <Card
          sx={{ borderRadius: 2, boxShadow: 3, backgroundColor: "#f9f9f9", cursor: "pointer" }}
          onClick={() => navigate("/about")}
        >
          <CardMedia component="img" height="200" image="https://eccmarket.ru/upload/iblock/abf/qnar2vqf8fwfhq88bq7og66prt6l3ys6.jpg" alt="3D принтер" />
          <CardContent>
            <Typography variant="h6" fontWeight="bold">Платформаға шолу</Typography>
            <Typography variant="body2" sx={{ color: "#666" }}>
              3D модельдеу және басып шығару үшін ModelMaster пайдалану мүмкіндіктері мен артықшылықтарын ашыңыз.
            </Typography>
          </CardContent>
        </Card>
      </Grid>

        {/* Таңдаулы оқулықтар */}
      <Grid item xs={12} md={4}>
        <Card
          sx={{ borderRadius: 2, boxShadow: 3, backgroundColor: "#fdf6c5", cursor: "pointer" }}
          onClick={() => navigate("/courses")}
        >
          <CardMedia component="img" height="200" image="https://spb.hse.ru/data/2023/05/19/2016081458/3HSE%20Physics30318.jpg" alt="Оқулықтар" />
          <CardContent>
            <Typography variant="h6" fontWeight="bold">Таңдаулы оқулықтар</Typography>
            <Typography variant="body2" sx={{ color: "#666" }}>
              Оқу процесінде сізге бағыт-бағдар беруге арналған біздің қадамдық оқулықтарымызды зерттеңіз.
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Интерактивті құралдар */}
      <Grid item xs={12} md={4}>
        <Card
          sx={{ borderRadius: 2, boxShadow: 3, backgroundColor: "#e5fbe5", cursor: "pointer" }}
          onClick={() => navigate("/tools")}
        >
          <CardMedia component="img" height="200" image="https://gb.ru/blog/wp-content/uploads/2022/07/shutterstock_1335833942.jpg" alt="Интерактивті құралдар" />
          <CardContent>
            <Typography variant="h6" fontWeight="bold">Практикалық тапсырмалар</Typography>
            <Typography variant="body2" sx={{ color: "#666" }}>
              Модельдеу және басып шығару тәжірибеңізді жақсарту үшін инновациялық құралдарымызды пайдаланыңыз.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
