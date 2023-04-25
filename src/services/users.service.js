import httpService from "./http.service";
const usersEndpoint = "profiles/";
const userssearch = "profiles";

const usersService = {
  getAll: async (page) => {
    const { data } = await httpService.get(usersEndpoint + `?page=${page}`);
    return data;
  },
  search: async (payload) => {
    console.log(payload);
    const { data } = await httpService.get("profiles", {
      params: {
        skills: payload.skills,
        experienceFrom: payload.experienceFrom,
        experienceTo: payload.experienceTo,
        candidateType: payload.candidateType,
        openToTravel: payload.openToTravel,
        city: payload.city,
      },
    });
    return data;
  },
  getById: async (userId) => {
    const { data } = await httpService.get(usersEndpoint + userId);
    return data;
  },
};

export default usersService;
