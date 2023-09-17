import http from "../helpers/interceptors/axiosInterceptor";
import uniteVente from "../types/uniteVente/uniteVente";

const URL = "/uniteVente";

export const create = (data: any) => {
  return http.post(URL, data);
};

export const getAll = (utvArt: any) => {
  return http.get(URL + `?utvArt=${utvArt}`);
};

export const deleteUtv = (id: number) => {
  return http.delete(URL + `/${id}`);
};

export const updateUtv = (data: uniteVente) => {
  return http.put(URL, data);
};