import axios from "axios"; 

const API_URL = process.env.REACT_APP_API_URL + "/personne";

export const signup = (data: any) => {
  return axios.post(API_URL + "/signup", data);
};

export const signin = async (data: any) => {
  return await axios.post(API_URL + "/signin", data);
};

export const logout = () => {
  localStorage.removeItem("user");
};