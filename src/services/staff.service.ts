import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/staff";

export const getPersons = (username: string, roles: string) => {
  return axios.get(API_URL + `/?username=${username}&roles=${roles}`, {
    headers: authHeader(),
  });
};

export const updatePending = (id: number) => {
  return axios.put(API_URL + `/${id}`, {}, { headers: authHeader() });
};

export const deletePerson = (id: number) => {
  return axios.delete(API_URL + `/${id}`, { headers: authHeader() });
};
