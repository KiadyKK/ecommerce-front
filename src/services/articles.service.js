import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/articles";

//Catégories
export const createCatArt = (data) => {
  return axios.post(
    API_URL + `/catArt`,
    { catArt: data },
    { headers: authHeader() }
  );
};

export const getCatArt = (catArt) => {
  return axios.get(API_URL + `/catArt?catArt=${catArt}`, {
    headers: authHeader(),
  });
};

export const deleteCatArt = (data) => {
  const catArt = encodeURIComponent(data);
  return axios.delete(API_URL + `/catArt/${catArt}`, { headers: authHeader() });
};

//Conditionnements
export const createCondArt = (data) => {
  return axios.post(
    API_URL + `/condArt`,
    { condArt: data },
    { headers: authHeader() }
  );
};

export const getCondArt = (condArt) => {
  return axios.get(API_URL + `/condArt?condArt=${condArt}`, {
    headers: authHeader(),
  });
};

export const deleteCondArt = (data) => {
  const condArt = encodeURIComponent(data);
  return axios.delete(API_URL + `/condArt/${condArt}`, {
    headers: authHeader(),
  });
};

//Unité de ventes
export const createUtvArt = (data) => {
  return axios.post(
    API_URL + `/utvArt`,
    { utvArt: data },
    { headers: authHeader() }
  );
};

export const getUtvArt = (utvArt) => {
  return axios.get(API_URL + `/utvArt?utvArt=${utvArt}`, {
    headers: authHeader(),
  });
};

export const deleteUtvArt = (data) => {
  const utvArt = encodeURIComponent(data);
  return axios.delete(API_URL + `/utvArt/${utvArt}`, { headers: authHeader() });
};

//Article
export const createArt = (data, options) => {
  return axios.post(API_URL, data, { headers: authHeader(), ...options });
};

export const getArt = (desArt, catArt) => {
  return axios.get(API_URL + `?desArt=${desArt}&catArt=${catArt}`, {
    headers: authHeader(),
  });
};

export const deleteArt = (data) => {
  return axios.delete(API_URL + `/${data}`, { headers: authHeader() });
};

export const updateArt = (data) => {
  const ref = encodeURIComponent(data);
  return axios.put(API_URL, data, { headers: authHeader() });
};
