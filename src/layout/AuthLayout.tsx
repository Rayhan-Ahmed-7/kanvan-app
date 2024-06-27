import { Outlet, useNavigate } from "react-router-dom";
import { Box, Card, Container, Stack, useTheme } from "@mui/material";
import assets from "../assets";
import { useEffect, useState } from "react";
import authUtils from "../utils/authUtils";
import Loading from "../components/common/Loading";
import AuthBackground from "../views/feature/auth/views/AuthBackground";
import { dispatch } from "../store";
import { addUser } from "../store/reducer/userSlice";

const AuthLayout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated();
      if (!user) {
        setLoading(false);
      } else {
        dispatch(addUser(user?.data?.data));
        navigate("/");
      }
    };
    checkAuth();
  }, [navigate]);
  const theme = useTheme();
  return loading ? (
    <Loading fullHeight />
  ) : (
    <Container component="main">
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AuthBackground />
        <Card
          sx={{
            padding: 3,
            border: "1px solid",
            borderRadius: 1.5,
            borderColor: theme.palette.divider,
            width: { xs: 400, md: 480 },
          }}
        >
          <Stack alignItems="center" sx={{ padding: "15px 0px" }}>
            <img src={assets.logo.light} height={60} />
          </Stack>
          <Outlet />
        </Card>
      </Box>
    </Container>
  );
};

export default AuthLayout;
