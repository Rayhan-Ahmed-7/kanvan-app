import { Outlet, useNavigate } from "react-router-dom";
import { Box, Card, Container } from "@mui/material";
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
    }, [navigate])
    return loading ? (
        <Loading fullHeight />
    ) : (
        <Container component='main' maxWidth='xs'>
            <Box sx={{
                marginTop: 8,
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
                <Card>
                    <img src={assets.logo.light} height={100} />
                    <Outlet />
                </Card>
            </Box>
        </Container>
    )
};

export default AuthLayout;