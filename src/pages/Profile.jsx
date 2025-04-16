import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Avatar,
  IconButton,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { getProfile, getUserProgress, updateUser } from "../api/api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "" });
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getProfile();
        const progressData = await getUserProgress();
        setUser(userData);
        setProgress(progressData);
        setFormData({ firstName: userData.firstName, lastName: userData.lastName });
        setAvatar(userData.avatarUrl);
      } catch (error) {
        console.error("Профиль немесе прогресс жүктеу қатесі", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const updatedUser = await updateUser(user.id, formData);
      setUser(updatedUser);
      setEditMode(false);
    } catch (error) {
      console.error("Профиль жаңарту қатесі", error);
    }
  };

//   const handleAvatarUpload = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       try {
//         const uploadedAvatar = await uploadAvatar(file);
//         setAvatar(uploadedAvatar.url);
//         setUser({ ...user, avatarUrl: uploadedAvatar.url });
//       } catch (error) {
//         console.error("Аватарды жүктеу қатесі", error);
//       }
//     }
//   };

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box sx={{ p: 3, border: "1px solid #ddd", borderRadius: 2, textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Жеке кабинет
        </Typography>

        {/* Avatar Upload */}
        <Box sx={{ position: "relative", display: "inline-block", mb: 2 }}>
          <Avatar
            src={avatar || "https://via.placeholder.com/150"}
            sx={{ width: 120, height: 120, mx: "auto" }}
          />
          <IconButton
            sx={{
              position: "absolute",
              bottom: 0,
              right: 10,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              color: "#fff",
            }}
            component="label"
          >
            <PhotoCameraIcon />
            {/* <input type="file" hidden accept="image/*" onChange={handleAvatarUpload} /> */}
          </IconButton>
        </Box>

        {user ? (
          <>
            {editMode ? (
              <>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Аты"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Тегі"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>
                  Сақтау
                </Button>
                <Button variant="outlined" onClick={() => setEditMode(false)} sx={{ mt: 2, ml: 2 }}>
                  Болдырмау
                </Button>
              </>
            ) : (
              <>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  <strong>Аты:</strong> {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {user.email}
                </Typography>
                <Typography variant="body1">
                  <strong>Рөлі:</strong> {user.role}
                </Typography>
                <Button variant="contained" onClick={() => setEditMode(true)} sx={{ mt: 2 }}>
                  Өңдеу
                </Button>
              </>
            )}
          </>
        ) : (
          <Typography color="error">Профиль жүктеу қатесі</Typography>
        )}
      </Box>

      {/* Learning Progress */}
      <Box sx={{ p: 3, border: "1px solid #ddd", borderRadius: 2, mt: 3 }}>
        <Typography variant="h6" fontWeight="bold">
          Оқу прогресі
        </Typography>
        {progress.length > 0 ? (
          <List>
            {progress.map((item) => (
              <ListItem key={item.id}>
                <ListItemText
                  primary={item.lesson.title}
                  secondary={`Өтілді: ${item.completed ? "✅ Иә" : "❌ Жоқ"}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography color="textSecondary">Аяқталған сабақтар жоқ</Typography>
        )}
      </Box>
    </Container>
  );
};

export default Profile;
