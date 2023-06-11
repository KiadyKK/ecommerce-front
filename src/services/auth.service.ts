import http from "../http-common";

export const signup = (data: any) => {
  return http.post("/signup", data);
};

export const signin = async (data: any) => {
  const response = await http.post("/signin", data);
  if (response.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const user: string | null = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
