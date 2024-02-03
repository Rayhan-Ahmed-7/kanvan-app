import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import useAuth from "../hooks/useAuth";
import { DataStatus } from "../../../../utils/types";
import { Link } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as yup from 'yup'
import { TRegister } from "../types/authTypes";
import { Formik } from "formik";

const registerValidation: yup.ObjectSchema<TRegister> = yup.object({
    username: yup.string().required("username is required."),
    password: yup.string().min(8, 'password must be at least 8 characters.').required("password is required."),
    confirmPassword: yup.string().min(8, 'password must be at least 8 characters.').required("confirm password is required.").test({ name: "passwords-match", message: "password didn't matched.", test: function (value) { return value === this.parent.password } }),
})
const Register = () => {
    const { dataStatus, register, showPassword, handleShowPassword, showConfirmPassword, handleShowConfirmPassword } = useAuth();
    const handleSubmit = (values: TRegister) => {
        register(values);
    }
    return (
        <Formik
            onSubmit={handleSubmit}
            initialValues={{
                username: '',
                password: '',
                confirmPassword: ''
            }}
            validationSchema={registerValidation}
        >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
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
                        onChange={handleChange}
                        value={values.username}
                        error={Boolean(errors.username && touched.username)}
                        disabled={dataStatus == DataStatus.loading ? true : false}
                        id="username"
                        label="username"
                        name="username"
                    />
                    {
                        errors.username && touched.username && (
                            <FormHelperText error>
                                {errors.username}
                            </FormHelperText>
                        )
                    }
                    <FormControl margin="normal" fullWidth variant="outlined">
                        <InputLabel htmlFor="password">password</InputLabel>
                        <OutlinedInput
                            id="password"
                            name="password"
                            onChange={handleChange}
                            value={values.password}
                            error={Boolean(errors.password && touched.password)}
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                        {
                            errors.password && touched.password && (
                                <FormHelperText error>
                                    {errors.password}
                                </FormHelperText>
                            )
                        }
                    </FormControl>
                    <FormControl margin="normal" fullWidth variant="outlined">
                        <InputLabel htmlFor="confirmPassword">confirm password</InputLabel>
                        <OutlinedInput
                            id="confirmPassword"
                            name="confirmPassword"
                            error={Boolean(errors.confirmPassword && touched.confirmPassword)}
                            onChange={handleChange}
                            value={values.confirmPassword}
                            type={showConfirmPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        sx={{ borderRadius: 8 }}
                                        onClick={handleShowConfirmPassword}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="confirmPassword"
                        />
                        {
                            errors.confirmPassword && touched.confirmPassword && (
                                <FormHelperText error>
                                    {errors.confirmPassword}
                                </FormHelperText>
                            )
                        }
                    </FormControl>
                    <LoadingButton
                        sx={{ mt: 3, mb: 2 }}
                        variant="outlined"
                        fullWidth
                        color="success"
                        type="submit"
                        loading={dataStatus == DataStatus.loading ? true : false}
                    >
                        Register
                    </LoadingButton>
                    <Button component={Link} to={'/login'} sx={{ textTransform: 'none', textAlign: "center" }}>
                        Already have an account? login
                    </Button>
                </Box>
            )}
        </Formik>
    );
};

export default Register;