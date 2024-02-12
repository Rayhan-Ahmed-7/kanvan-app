import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import LocalStorageService from "./ localStorageService";
const baseUrl = import.meta.env.VITE_API_URL
class AxiosService {
    static client: AxiosInstance;
    init() {
        AxiosService.client = axios.create({
            baseURL: baseUrl,
            headers: {
                "Content-Type": "application/json"
            },
        })
        AxiosService.client.interceptors.request.use((req: InternalAxiosRequestConfig) => {
            req.headers.Authorization = `Bearer ${LocalStorageService.getAccessToken()}`;
            return req;
        }, (err: AxiosError) => {
            return Promise.reject(err);
        });
        AxiosService.client.interceptors.response.use((res: AxiosResponse) => {
            return res;
        }, async (err: AxiosError) => {
            if (err.response?.status == 401) {
                try {
                    let res = await this.getRefreshToken();
                    LocalStorageService.setAccessToken(res.data?.data?.access_token);
                    if (err.config && err.config.headers && res.data && res.data.data && res.data.data.access_token) {
                        err.config.headers.Authorization = `b ${res.data.data.access_token}`;
                    }
                    // Return the modified config to continue with the request
                    return axios(err.config!);
                } catch (refreshTokenError) {
                    // Handle refreshTokenError
                    return Promise.reject(refreshTokenError);
                }
            }
            return Promise.reject(err)
        });
        console.log("🍉 AxiosService initialized!")
    }
    static get = (url: string, data?: object,) => {
        return this.client.get(url, {
            data: data,
            withCredentials: true
        });
    }
    static post = (url: string, data: object, options?: AxiosRequestConfig) => {
        return this.client.post(url, data, {
            ...options,
            withCredentials: true
        });
    }
    static put = (url: string, data: object, options?: AxiosRequestConfig) => {
        return this.client.put(url, data, {
            ...options,
            withCredentials: true
        });
    }
    static delete = (url: string, options?: AxiosRequestConfig) => {
        return this.client.delete(url, {
            ...options,
            withCredentials: true
        });
    }
    getRefreshToken = async () => {
        return axios.get(baseUrl + 'auth/refresh-token', { withCredentials: true });
    }
}
export default AxiosService;