import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import authUtils from "../utils/authUtils";
import Loading from "../components/common/Loading";
import { Box } from "@mui/material";
import Sidebar from "../components/common/Sidebar";
import { dispatch } from "../store";
import { addUser } from "../store/reducer/userSlice";

const AppLayout = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const checkAuth = async () => {
            const user = await authUtils.isAuthenticated();
            if (!user) {
                navigate('/login');
                setLoading(false);
            } else {
                dispatch(addUser(user?.data?.data))
                setLoading(false)
            }
        }
        checkAuth();
    }, [navigate])
    return loading ? (
        <Loading fullHeight />
    ) : (
        <Box sx={{
            display: 'flex',
        }}>
            <Sidebar />
            <Box sx={{
                flexGrow: 1,
                p: 1,
                width: 'max-content'
            }}>
                <Outlet />
            </Box>
        </Box>
    )
};

export default AppLayout;