import http from "../helpers/interceptors/axiosInterceptor";

const URL = "/personne";

export const signup = (data: any) => {
  return http.post(URL + "/signup", data);
};

export const signin = async (data: any) => {
  return await http.post(URL + "/signin", data);
};

export const getAll = (username: string, role: string) => {
  return http.get(URL + `?username=${username}&role=${role}`);
};

export const updatePending = (id: number) => {
  return http.put(URL + `/${id}`);
};

export const deletePersonne = (id: number) => {
  return http.delete(URL + `/${id}`);
};