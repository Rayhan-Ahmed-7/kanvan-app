import { AxiosResponse } from 'axios';
import AxiosService from "../../../../services/axios_service";
import { TLogin, TRegister } from "../types/authTypes";

class AuthApi {
    private loginUrl: string = "auth/login";
    private registerUrl: string = "auth/register";

    login = async (data: TLogin): Promise<AxiosResponse> => {
        return await AxiosService.post(this.loginUrl, data,);
    }
    register = async (data: TRegister): Promise<AxiosResponse> => {
        return await AxiosService.post(this.registerUrl, data,);
    }
}
export default AuthApi;