import { useState } from "react";
import { DataStatus } from "../../../../utils/types";
import AuthApi from "../api/authApi";
import { TLogin, TRegister } from "../types/authTypes";
import LocalStorageService from "../../../../services/ localStorageService";
import { dispatch } from "../../../../store";
import { openSnackbar } from "../../../../store/reducer/snackbar";
import { SnackbarType } from "../../../../store/types/snackbarType";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

const useAuth = () => {
  const _authApi = new AuthApi();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [dataStatus, setDataStatus] = useState<DataStatus>(DataStatus.idle);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const login = async (data: TLogin) => {
    try {
      setDataStatus(DataStatus.loading);
      const response = await _authApi.login(data);
      setData(response.data);
      dispatch(
        openSnackbar({
          message: "Login Successful.",
          type: SnackbarType.success,
        })
      );
      navigate("/");
      LocalStorageService.setAccessToken(response.data.data.access_token);
      setDataStatus(DataStatus.loaded);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // Server responded with a status code other than 2xx
        dispatch(
          openSnackbar({
            message: `${(axiosError.response.data as any).message}`,
            type: SnackbarType.error,
          })
        );
      } else if (axiosError.request) {
        // The request was made but no response was received
        console.error("No response received:", axiosError.request);
        dispatch(
          openSnackbar({
            message: "No response received",
            type: SnackbarType.error,
          })
        );
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Error setting up the request:", axiosError.message);
        dispatch(
          openSnackbar({
            message: "Error setting up the request",
            type: SnackbarType.error,
          })
        );
      }
      setDataStatus(DataStatus.error);
    }
  };
  const register = async (data: TRegister) => {
    try {
      setDataStatus(DataStatus.loading);
      const response = await _authApi.register(data);
      setData(response.data);
      dispatch(
        openSnackbar({
          message: `Register successful.`,
          type: SnackbarType.success,
        })
      );

      navigate("/login");
      setDataStatus(DataStatus.loaded);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // Server responded with a status code other than 2xx
        console.error(
          "Request failed with status:",
          axiosError.response.status
        );
        console.error(
          "Response data:",
          (axiosError.response.data as any).errors.toString()
        );
        dispatch(
          openSnackbar({
            message: `${(axiosError.response.data as any).errors[0].username}`,
            type: SnackbarType.error,
          })
        );
      } else if (axiosError.request) {
        // The request was made but no response was received
        console.error("No response received:", axiosError.request);
        dispatch(
          openSnackbar({
            message: "No response received",
            type: SnackbarType.error,
          })
        );
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Error setting up the request:", axiosError.message);
        dispatch(
          openSnackbar({
            message: "Error setting up the request",
            type: SnackbarType.error,
          })
        );
      }
      setDataStatus(DataStatus.error);
    }
  };

  return {
    data,
    dataStatus,
    login,
    register,
    showPassword,
    handleShowPassword,
    showConfirmPassword,
    handleShowConfirmPassword,
  };
};

export default useAuth;
