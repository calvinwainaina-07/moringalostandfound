import api from "./api";

export const getItems = () => {
  return api.get("/items").then((res) => res.data);
};

export const getItemById = (id) => {
  return api.get(`/items/${id}`).then((res) => res.data);
};