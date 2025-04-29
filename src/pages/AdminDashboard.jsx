// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import {
  Container, Typography, Grid, Card, CardContent,
  CircularProgress, Table, TableHead, TableRow, TableCell, TableBody
} from "@mui/material";
import { getAdminUsers, getAdminDashboard } from "../api/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [statsData, usersData] = await Promise.all([
          getAdminDashboard(),
          getAdminUsers()
        ]);
        setStats(statsData);
        setUsers(usersData);
      } catch (err) {
        console.error("Қате:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        📊 Админ панелі
      </Typography>

      <Grid container spacing={3} sx={{ mb: 5 }}>
        {[
          ["Пайдаланушылар", stats.users],
          ["Сабақтар", stats.lessons],
          ["Тапсырмалар", stats.practicalTasks],
          ["Орындалған тапсырмалар", stats.taskSubmissions]
        ].map(([label, value], i) => (
          <Grid item xs={12} md={4} key={i}>
            <Card>
              <CardContent>
                <Typography variant="h6">{label}</Typography>
                <Typography variant="h4" fontWeight="bold">{value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        👥 Пайдаланушылар тізімі
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Аты</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Рөлі</TableCell>
            {/* <TableCell>Тіркелген күні</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.firstName} {user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              {/* <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default AdminDashboard;
