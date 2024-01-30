import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

class AxiosService {
    static client: AxiosInstance;
    init() {
        AxiosService.client = axios.create({
            baseURL: import.meta.env.API_URL,
            headers: {
                "Content-Type": "application/json"
            },
        })
        AxiosService.client.interceptors.request.use((req: InternalAxiosRequestConfig) => {
            req.headers.Authorization = 'hi';
            return req;
        }, (err: AxiosError) => {
            return err;
        });
        AxiosService.client.interceptors.response.use((res: AxiosResponse) => {
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