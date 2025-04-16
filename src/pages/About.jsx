import React from "react";
import { Container, Typography, Box, Paper } from "@mui/material";

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, textAlign: "center" }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, backgroundColor: "#f9f9f9" }}>
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Біздің сайт туралы
        </Typography>
        
        <Box sx={{ mt: 3 }}>
          <Typography variant="body1" sx={{ color: "#444", mb: 2, fontSize: "1.1rem" }}>
            <strong>"3D Qadam"</strong> — жоғары сынып оқушыларына арналған үшөлшемді модельдеу мен 3D басып шығарудың негіздерін меңгеруге бағытталған инновациялық білім беру алаңы. Біздің миссиямыз – интерактивті құралдар мен оқулықтардың көмегімен цифрлық өндіріс әлемін қолжетімді ету.
          </Typography>
          
          <Typography variant="h5" fontWeight="bold" sx={{ mt: 3 }} color="secondary">
            Неліктен біз?
          </Typography>
          <Typography variant="body1" sx={{ color: "#555", mb: 2, fontSize: "1rem" }}>
            ✅ Интерактивті оқыту: қадамдық оқулықтар және практикалық тапсырмалар. <br/>
            ✅ Заманауи құралдар: 3D модельдеу бағдарламалары мен принтер симуляторлары. <br/>
            ✅ Қолжетімділік: барлық пайдаланушылар үшін ыңғайлы және түсінікті интерфейс. <br/>
          </Typography>

          <Typography variant="h5" fontWeight="bold" sx={{ mt: 3 }} color="secondary">
            Біздің мақсатымыз
          </Typography>
          <Typography variant="body1" sx={{ color: "#555", mb: 2, fontSize: "1rem" }}>
            Біз 3D технологияларды оқушылар мен мұғалімдер үшін оңай және қызықты еткіміз келеді. Біздің платформа 3D модельдеуді үйренуге, басып шығару процесін түсінуге және шығармашылық әлеуетті дамытуға мүмкіндік береді.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default About;
