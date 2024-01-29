import axios, { AxiosInstance } from 'axios';

export default class BaseApi {
    api: AxiosInstance
    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.API_URL,
            headers: {
                "Content-Type": "application/json"
            },
        })
    }
}