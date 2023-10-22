import httpForm from "../helpers/interceptors/axiosFormInterceptor";
import http from "../helpers/interceptors/axiosInterceptor";
import articleUpdate from "../types/article/articleUpdate";

const URL = "/article";

export const create = (data: FormData, onUploadProgress: any) => {
  return httpForm.post(URL, data, {
    onUploadProgress,
  });
};

export const getAll = (
  catArt: string,
  condArt: string,
  utvArt: string,
  desArt: string
) => {
  return http.get(
    URL +
      `?catArt=${catArt}&condArt=${condArt}&utvArt=${utvArt}&desArt=${desArt}`
  );
};

export const deleteArt = (id: string) => {
  return http.delete(URL + `/${id}`);
};

export const updateArt = (data: articleUpdate) => {
  return http.put(URL, data);
};
