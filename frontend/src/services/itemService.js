import api from "./api";

export const getItems = async () => {
  const res = await api.get("/items");
  return res.data;
};

export const getItemById = async (id) => {
  const res = await api.get(`/items/${id}`);
  return res.data;
};

export const createItem = async (item) => {
  const res = await api.post("/items", item);
  return res.data;
};

export const updateItem = async (id, item) => {
  const res = await api.put(`/items/${id}`, item);
  return res.data;
};

export const deleteItem = async (id) => {
  await api.delete(`/items/${id}`);
};