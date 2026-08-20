import api from "./api";

export const login = (email, password) => {
  return api.post("/login", { email, password }).then((res) => res.data);
};

export const register = (email, password) => {
  return api.post("/register", { email, password }).then((res) => res.data);
};