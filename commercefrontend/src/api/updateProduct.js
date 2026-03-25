import axios from "axios";
const API_URL = "http://localhost:3001/api/products"; // ta route backend

export const updateProduct = async (id, data, token) => {
  const res = await axios.put(`${API_URL}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
