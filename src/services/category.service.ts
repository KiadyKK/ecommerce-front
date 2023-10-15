import http from "../helpers/interceptors/axiosInterceptor";
import category from "../types/categorie/categorie";

const URL = "/categorie";

export const create = (data: any) => {
  return http.post(URL, data);
};

export const getAll = (catArt: any) => {
  return http.get(URL + `?catArt=${catArt}`);
};

export const deleteCat = (id: number) => {
  return http.delete(URL + `/${id}`);
};

export const updateCat = (data: category) => {
  return http.put(URL, data);
};