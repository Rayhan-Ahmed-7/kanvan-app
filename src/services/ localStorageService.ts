import { ACCESS_TOKEN } from "../constants/constant"

class LocalStorage {
    getAccessToken = () => {
        return localStorage.getItem(ACCESS_TOKEN);
    }
    setAccessToken(token: string) {
        localStorage.setItem(ACCESS_TOKEN, token);
    }
    removeAccessToken() {
        localStorage.removeItem(ACCESS_TOKEN);
    }
}

export default new LocalStorage();