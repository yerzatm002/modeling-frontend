import React from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const ProfileSidebar = () => {
  return (
    <Box sx={{ width: 250, p: 2, backgroundColor: "#f7f7f7", height: "100vh" }}>
      <Typography variant="h6">Профиль</Typography>
      <List>
        <ListItem button component={Link} to="/profile/courses">
          <ListItemText primary="Менің курстарым" />
        </ListItem>
        <ListItem button component={Link} to="/profile/progress">
          <ListItemText primary="Прогресс" />
        </ListItem>
        <ListItem button component={Link} to="/profile/settings">
          <ListItemText primary="Баптаулар" />
        </ListItem>
      </List>
    </Box>
  );
};

export default ProfileSidebar;
