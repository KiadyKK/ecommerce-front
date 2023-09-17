import http from "../helpers/interceptors/axiosInterceptor";
import conditionnement from "../types/conditionnement/conditionnement";

const URL = "/conditionnement";

export const create = (data: any) => {
  return http.post(URL, data);
};

export const getAll = (condArt: any) => {
  return http.get(URL + `?condArt=${condArt}`);
};

export const deleteCond = (id: number) => {
  return http.delete(URL + `/${id}`);
};

export const updateCond = (data: conditionnement) => {
  return http.put(URL, data);
};