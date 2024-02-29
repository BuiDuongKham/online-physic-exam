import React from "react";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { useAppSelector } from "../store";

const NavBarWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const Layout = ({ children }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    auth: { userDetails },
  } = useAppSelector((state) => state);

  const handleLogout = () => {
    dispatch(logoutUser());
    handleNavigate('/')
  };

  const handleNavigate = (path: any) => {
    navigate(path);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flex: 1 }}
            onClick={() => handleNavigate("/")}
          >
            Dashboard
          </Typography>
          <NavBarWrapper>
            {userDetails?.role === "admin" && (
              <>
                <Button
                  color="inherit"
                  onClick={() => handleNavigate("/manage-users")}
                >
                  Quản lý người dùng
                </Button>
              </>
            )}
            {(userDetails?.role === "admin" ||
              userDetails?.role === "host") && (
              <Button
                color="inherit"
                onClick={() => handleNavigate("/manage-tests")}
              >
                Quản lý đề thi
              </Button>
            )}
            <Button
              color="inherit"
              onClick={() => handleNavigate("/take-exam")}
            >
              Làm đề thi
            </Button>
          </NavBarWrapper>
          <Button
            color="inherit"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
};

export default Layout;
