import { Box, Button, FormControl, IconButton, InputLabel, OutlinedInput, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import useAuth from "../hooks/useAuth";
import { DataStatus } from "../../../../utils/types";
import { FormEvent } from "react";
import { Link } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
    const { data, dataStatus, login, showPassword, handleShowPassword } = useAuth();
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        let formData = new FormData(e.target as HTMLFormElement);
        let username = formData.get('username') as string;
        let password = formData.get('password') as string;
        console.log(username, password)
        if (username != null && password != null) {
            login({ username, password});
        }
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
            <FormControl margin="normal" fullWidth variant="outlined">
                <InputLabel>password</InputLabel>
                <OutlinedInput
                    id="password"
                    name="password"
                    label="password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                        <IconButton
                            onClick={handleShowPassword}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    }
                />
            </FormControl>
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
            <Button component={Link} to={'/register'} sx={{ textTransform: 'none', textAlign: "center" }}>
                Don't have an account? Register
            </Button>
        </Box>
    );
};

export default Login;