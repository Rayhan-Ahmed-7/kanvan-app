import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

class AxiosService {
    static client: AxiosInstance;
    init() {
        AxiosService.client = axios.create({
            baseURL: import.meta.env.VITE_API_URL,
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
    static get = (url: string, data?: object) => {
        console.log(this.client,"asfdasf")
        return this.client.get(url, data);
    }
    static post = (url: string, data: object, options?: object) => {
        return this.client.post(url, data, options);
    }
}
export default AxiosService;