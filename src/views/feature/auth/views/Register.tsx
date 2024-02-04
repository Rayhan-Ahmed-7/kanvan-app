import { Box, Button, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from "@mui/material";
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
    confirmPassword: yup.string().min(8, 'password must be at least 8 characters.').required("confirm password is required.").test({ name: "passwords-match", message: "password didn't matched.", test: function (value, context) { return value === context.parent.password } }),
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
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor='username'>Username</InputLabel>
                            <OutlinedInput
                                fullWidth
                                required
                                onChange={handleChange}
                                value={values.username}
                                error={Boolean(errors.username && touched.username)}
                                disabled={dataStatus == DataStatus.loading ? true : false}
                                id="username"
                                name="username"
                            />
                        </Stack>
                        {
                            errors.username && touched.username && (
                                <FormHelperText error>
                                    {errors.username}
                                </FormHelperText>
                            )
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="password">password</InputLabel>
                            <OutlinedInput
                                fullWidth
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
                            />
                        </Stack>
                        {
                            errors.password && touched.password && (
                                <FormHelperText error>
                                    {errors.password}
                                </FormHelperText>
                            )
                        }
                    </Grid>
                    <Grid item xs={12}>

                        <Stack spacing={1}>
                            <InputLabel htmlFor="confirmPassword">confirm password</InputLabel>
                            <OutlinedInput
                                fullWidth
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
                            />
                        </Stack>
                        {
                            errors.confirmPassword && touched.confirmPassword && (
                                <FormHelperText error>
                                    {errors.confirmPassword}
                                </FormHelperText>
                            )
                        }
                    </Grid >
                    <LoadingButton
                        sx={{ mt: 3, mb: 2 }}
                        variant="outlined"
                        fullWidth
                        color="primary"
                        type="submit"
                        loading={dataStatus == DataStatus.loading ? true : false}
                    >
                        Register
                    </LoadingButton>
                    <Stack alignItems='center'>

                        <Typography
                            component={Link}
                            to='/login'
                            variant="body1"
                            sx={{ textDecoration: 'none' }}
                            color="primary"
                        >
                            Already have an account? Login
                        </Typography>
                    </Stack>
                </Box>
            )}
        </Formik>
    );
};

export default Register;