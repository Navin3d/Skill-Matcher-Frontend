import httpService from "./http.service";
import localStorageService from "./localStorage.service";
import axios from "axios";
import configFile from "../config.json";

const accountEndpoint = "profiles/";

const accountService = {
  get: async () => {
    const id = localStorageService.getUserId();
    const { data } = await httpService.get(accountEndpoint + id);
    return data;
  },
  delete: async () => {
    const id = localStorageService.getUserId();
    const { data } = await httpService.delete(accountEndpoint + id);
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(accountEndpoint, payload);
    // await updatePhoto(payload)
    return data;
  },
  post: async (payload) => {
    const { oldPassword, newPassword } = payload;
    const { data } = await httpService.post(
      accountEndpoint + `reset?oldPassword=${oldPassword}&newPassword=${newPassword}`
    );
    // await updatePhoto(payload)
    return data;
  },
  updatePhoto: async ({ photo, id }) => {
    const formdata = new FormData();
    formdata.append("photo", photo[0]);
    formdata.append("id", id);
    const res = await httpService.post(accountEndpoint + "photo", formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },
};

export default accountService;
