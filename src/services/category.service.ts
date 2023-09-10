import http from "../helpers/interceptors/axiosInterceptor";

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