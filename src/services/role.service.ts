import http from "../helpers/interceptors/axiosInterceptor";

const URL = "/role";

export const getAll = () => {
  return http.get(URL);
};
