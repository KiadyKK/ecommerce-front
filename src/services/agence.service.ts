import http from "../helpers/interceptors/axiosInterceptor";
import agence from "../types/agence/agence";

const URL = "/agence";

export const create = (data: agence) => {
  return http.post(URL, data);
};

export const getAll = (agc: string) => {
  return http.get(URL + `?agc=${agc}`);
};

export const remove = (abrAgc: string) => {
  return http.delete(URL + `/${abrAgc}`);
};

export const update = (data: agence) => {
  return http.put(URL, data);
};
