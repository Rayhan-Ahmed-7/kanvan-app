import { Box, Button, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import useAuth from "../hooks/useAuth";
import { DataStatus } from "../../../../utils/types";
import { FormEvent } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const { data, dataStatus, login } = useAuth();
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(e)
    }
    return (
        <Box
            component={'form'}
            sx={{ mt: 1 }}
            onSubmit={handleSubmit}
            noValidate
        >
            <TextField
                margin="normal"
                fullWidth
                required
                disabled={dataStatus == DataStatus.loading ? true : false}
                id="username"
                label="username"
                name="username"
            />
            <TextField
                margin="normal"
                fullWidth
                required
                disabled={dataStatus == DataStatus.loading ? true : false}
                id="password"
                label="password"
                name="password"
                type="password"
            />
            <LoadingButton
                sx={{ mt: 3, mb: 2 }}
                variant="outlined"
                fullWidth
                color="success"
                type="submit"
                loading={dataStatus == DataStatus.loading ? true : false}
            >
                Login
            </LoadingButton>
            <Button component={Link} to={'/register'} sx={{textTransform:'none'}}>
                Don't have an account? Register
            </Button>
        </Box>
    );
};

export default Login;