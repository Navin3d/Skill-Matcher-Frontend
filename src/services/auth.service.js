import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const authEndpoint = "auth/";

const authService = {
  registration: async (payload) => {
    const { data } = await httpService.post(authEndpoint + "signUp", payload);
    return data;
  },
  login: async (payload) => {
    const { data } = await httpService.post(authEndpoint + "signIn", payload);
    return data;
  },
  refresh: async () => {
    const { data } = await httpService.post(authEndpoint + "refreshToken", {
      refreshToken: localStorageService.getRefreshToken(),
    });
    return data;
  },
};

export default authService;
