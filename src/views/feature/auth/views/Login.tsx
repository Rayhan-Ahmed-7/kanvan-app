import { Box, Button, FormControl, FormHelperText, IconButton, InputLabel, OutlinedInput, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import useAuth from "../hooks/useAuth";
import { DataStatus } from "../../../../utils/types";
import { Link } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Formik } from "formik"
import * as yup from 'yup'
import { TLogin } from "../types/authTypes";

const loginValidation: yup.ObjectSchema<TLogin> = yup.object({
    username: yup.string().required("username is required."),
    password: yup.string().min(8, 'password must be at least 8 characters.').required("password is required."),
})

const Login = () => {
    const { dataStatus, login, showPassword, handleShowPassword } = useAuth();

    const handleSubmit = (values: TLogin) => {
        login(values);
    }
    return (
        <Formik
            initialValues={{
                username: '',
                password: ''
            }}
            onSubmit={handleSubmit}
            validationSchema={loginValidation}
        >
            {({ touched, errors, handleChange,handleSubmit ,values}) => (
                <Box
                    component={'form'}
                    sx={{ mt: 1 }}
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <TextField
                        margin="normal"
                        fullWidth
                        value={values.username}
                        onChange={handleChange}
                        required
                        disabled={dataStatus == DataStatus.loading ? true : false}
                        id="username"
                        label="username"
                        name="username"
                        error={Boolean(touched.username && errors.password)}
                    />
                    {touched.username && errors.username && (
                        <FormHelperText error>
                            {errors.username}
                        </FormHelperText>
                    )}
                    <FormControl margin="normal" fullWidth variant="outlined">
                        <InputLabel>password</InputLabel>
                        <OutlinedInput
                            id="password"
                            name="password"
                            label="password"
                            disabled={dataStatus == DataStatus.loading ? true : false}
                            onChange={handleChange}
                            value={values.password}
                            type={showPassword ? "text" : "password"}
                            endAdornment={
                                <IconButton
                                    onClick={handleShowPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            }
                            error={Boolean(touched.password && errors.password)}
                        />
                        {touched.password && errors.password && (
                            <FormHelperText sx={{marginLeft:'none !important'}} error>
                                {errors.password}
                            </FormHelperText>
                        )}
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
            )}
        </Formik>
    );
};

export default Login;