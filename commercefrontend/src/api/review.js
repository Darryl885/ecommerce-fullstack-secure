import axios from "axios";

const API_URL = "http://localhost:3001/api/reviews";

// CREATE Review
export const createReview = async (data, token) => {
  const res = await axios.post(API_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// GET Reviews by product ID
export const getReviewsByProduct = async (productId) => {
  const res = await axios.get(`${API_URL}/product/${productId}`);
  return res.data;
};
