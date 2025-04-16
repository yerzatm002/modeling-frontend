import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";

const Header = () => {
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  const renderAdminLinks = () => (
    <>
      <Button sx={{ color: "black" }} component={Link} to="/admin/dashboard">Студенттер және статистика</Button>
      <Button sx={{ color: "black" }} component={Link} to="/admin/submissions">Тапсырмалар</Button>
    </>
  );

  const renderUserLinks = () => (
    <>
      <Button sx={{ color: "black" }} component={Link} to="/">Басты бет</Button>
      <Button sx={{ color: "black" }} component={Link} to="/courses">Курстар</Button>
      <Button sx={{ color: "black" }} component={Link} to="/tools">Практикалық тапсырмалар</Button>
    </>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: "#dce600" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: "black" }}>
        3D Qadam
        </Typography>

        {user?.role === "ADMIN" ? renderAdminLinks() : renderUserLinks()}

        {user ? (
          <>
            <Button sx={{ color: "black" }} component={Link} to="/profile">Профиль</Button>
            <Button sx={{ color: "black" }} onClick={handleLogout}>Шығу</Button>
          </>
        ) : (
          <>
            <Button sx={{ color: "black" }} component={Link} to="/login">Кіру</Button>
            <Button sx={{ color: "black" }} component={Link} to="/register">Тіркелу</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
