import React, { useState } from "react";
import { Container, Typography, Box, Button, IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";

const PrinterSimulator = () => {
  const [fullscreen, setFullscreen] = useState(false);

  const handleReload = () => {
    document.getElementById("figuro-frame").src += "";
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
        3D Принтер Симулятор
      </Typography>

      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: fullscreen ? "100vh" : "600px",
          borderRadius: fullscreen ? 0 : 2,
          overflow: "hidden",
          boxShadow: 3,
        }}
      >
        <WebView source={{ uri: "https://www.figuro.io/Designer" }} />


        {/* Панель управления */}
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            display: "flex",
            gap: 1,
          }}
        >
          <IconButton onClick={handleReload} sx={{ bgcolor: "white", ":hover": { bgcolor: "#ddd" } }}>
            <RefreshIcon />
          </IconButton>
          <IconButton onClick={toggleFullscreen} sx={{ bgcolor: "white", ":hover": { bgcolor: "#ddd" } }}>
            {fullscreen ? <CloseFullscreenIcon /> : <FullscreenIcon />}
          </IconButton>
        </Box>
      </Box>

      {!fullscreen && (
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ backgroundColor: "black", color: "white", ":hover": { backgroundColor: "#333" } }}
            onClick={() => window.open("https://www.figuro.io/Designer", "_blank")}
          >
            Толық экранда ашу
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default PrinterSimulator;
