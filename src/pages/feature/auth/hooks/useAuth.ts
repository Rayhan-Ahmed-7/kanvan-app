import { useState } from "react";
import { DataStatus } from "../../../../utils/types";
import AuthApi from "../api/authApi";
import { TLogin, TRegister } from "../types/authTypes";

const useAuth = () => {
    const _authApi = new AuthApi();
    const [data, setData] = useState();
    const [dataStatus, setDataStatus] = useState<DataStatus>(DataStatus.idle);

    const login = async (data: TLogin) => {
        try {
            setDataStatus(DataStatus.loading);
            const response = await _authApi.login(data);
            setData(response.data);
            setDataStatus(DataStatus.loaded);
        } catch (error) {
            setDataStatus(DataStatus.error);
        }
    }
    const register = async (data: TRegister) => {
        try {
            setDataStatus(DataStatus.loading);
            const response = await _authApi.register(data);
            setData(response.data);
            setDataStatus(DataStatus.loaded);
        } catch (error) {
            setDataStatus(DataStatus.error);
        }
    }

    return { data, dataStatus, login, register };
}

export default useAuth;