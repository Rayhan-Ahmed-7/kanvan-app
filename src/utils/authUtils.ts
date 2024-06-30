import { ACCESS_TOKEN } from "../constants/constant";
import Urls from "../helper/urls";
import AxiosService from "../services/axios_service";

const authUtils = {
  isAuthenticated: async () => {
    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (!token) {
        return false;
      }
      const user = await AxiosService.get(Urls.verifyToken);

      return user;
    } catch (err) {
      return false;
    }
  },
};
export default authUtils;
