import axios from "axios";

const API_URL = "http://localhost:3001/api/orders";

export const createOrder = async (addressId, token) => {
  const res = await axios.post(
    API_URL,
    { addressId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};
