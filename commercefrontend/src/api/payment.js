import axios from "axios";

const API_URL = "http://localhost:3001/api/payments";

export const createCheckoutSession = async (data, token) => {
  const res = await axios.post(
    `${API_URL}/createCheckoutSession`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
