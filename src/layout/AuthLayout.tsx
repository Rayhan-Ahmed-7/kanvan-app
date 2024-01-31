import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import authUtils from "../utils/authUtils";
import Loading from "../components/common/Loading";
import { Box, Container } from "@mui/material";

const AuthLayout = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const checkAuth = async () => {
            console.log("calling")
            const isAuth = await authUtils.isAuthenticated();
            if (isAuth) {
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
                <img src='assets/logo/logo.svg' />
                <Outlet/>
            </Box>
        </Container>
    )
};

export default AuthLayout;