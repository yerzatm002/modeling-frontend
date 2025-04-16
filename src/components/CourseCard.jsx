import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const CourseCard = ({ course }) => {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardMedia component="img" height="140" image={course.image} alt={course.title} />
      <CardContent>
        <Typography variant="h6" fontWeight="bold">{course.title}</Typography>
        <Typography variant="body2" color="textSecondary">{course.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
