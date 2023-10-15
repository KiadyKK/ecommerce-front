import http from "../helpers/interceptors/axiosInterceptor";
import httpForm from "../helpers/interceptors/axiosFormInterceptor";
import article1 from "../types/article/article1";

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
  article: string
) => {
  return http.get(
    URL +
      `?catArt=${catArt}&condArt=${condArt}&utvArt=${utvArt}&article=${article}`
  );
};

export const deleteArt = (id: number) => {
  return http.delete(URL + `/${id}`);
};

export const updateArt = (data: article1) => {
  return http.put(URL, data);
};
