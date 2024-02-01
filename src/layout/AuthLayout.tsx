import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import authUtils from "../utils/authUtils";
import Loading from "../components/common/Loading";
import { Box, Container } from "@mui/material";
import assets from "../assets";

const AuthLayout = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    console.log("hi")
    useEffect(() => {
        const checkAuth = async () => {
            const user = await authUtils.isAuthenticated();
            if (!user) {
                navigate('/login');
                setLoading(false);
            } else {
                setLoading(false)
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
                <img src={assets.logo.light} height={100}/>
                <Outlet/>
            </Box>
        </Container>
    )
};

export default AuthLayout;