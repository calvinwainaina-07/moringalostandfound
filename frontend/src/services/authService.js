import api from "./api";

export const login = (email, password) => {
  return api
    .post("/auth/login", { email, password })
    .then((res) => res.data);
};

export const register = (email, password, name, role) => {
  return api
    .post("/auth/register", {
      email,
      password,
      name,
      role,
    })
    .then((res) => res.data);
};
