import http from "../helpers/interceptors/axiosInterceptor";

const URL = "/personne";

export const signup = (data: any) => {
  return http.post(URL + "/signup", data);
};

export const signin = async (data: any) => {
  return await http.post(URL + "/signin", data);
};

export const getAll = (username: string) => {
  return http.get(URL + `?username=${username}`);
};
