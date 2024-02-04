import { Outlet, useNavigate } from "react-router-dom";
import { Box, Card, Container, Stack, useTheme } from "@mui/material";
import assets from "../assets";
import { useEffect, useState } from "react";
import authUtils from "../utils/authUtils";
import Loading from "../components/common/Loading";

const AuthLayout = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const checkAuth = async () => {
            const user = await authUtils.isAuthenticated();
            if (!user) {
                setLoading(false);
            } else {
                navigate('/');
            }
        }
        checkAuth();
    }, [navigate]);
    const theme = useTheme()
    return loading ? (
        <Loading fullHeight />
    ) : (
        <Container component='main'>
            <Box sx={{
                height:'100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent:'center',
            }}>
                <Card sx={{
                    padding:3,
                    border: '1px solid',
                    borderRadius: 1.5,
                    borderColor: theme.palette.divider,
                    width: { xs: 400, md: 480 }
                }}>
                    <Stack alignItems='center'>
                        <img src={assets.logo.light} height={100} />
                    </Stack>
                    <Outlet />
                </Card>
            </Box>
        </Container>
    )
};

export default AuthLayout;