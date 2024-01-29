import { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import BaseApi from "./base_api";

class AxiosService extends BaseApi {
    static client: AxiosInstance;
    constructor() {
        super()
        AxiosService.client = this.api;
    }
    init() {
        this.api.interceptors.request.use((req: InternalAxiosRequestConfig) => {
            req.headers.Authorization = 'hi';
            return req;
        }, (err: AxiosError) => {
            return err;
        });
        this.api.interceptors.response.use((res: AxiosResponse) => {
            return res;
        }, (err: AxiosError) => {
            return err;
        });
        console.log("🍉 AxiosService initialized!")
    }
    static get = (url: string, data: object) => {
        return this.client.get(url, data);
    }
}
export default AxiosService;