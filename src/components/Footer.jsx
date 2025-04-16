import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box component="footer" sx={{ textAlign: "center", mt: 5, p: 3, backgroundColor: "#f0f0f0" }}>
      <Typography variant="h6">Байланыс</Typography>
      <Typography variant="body2">Email: support@modelmaster.com</Typography>
      <Typography variant="body2">Телефон: +123 456 7890</Typography>
      <Box mt={2}>
        <Link to="#">Facebook</Link> | 
        <Link to="#"> Twitter</Link> | 
        <Link to="#"> Instagram</Link>
      </Box>
    </Box>
  );
};

export default Footer;
