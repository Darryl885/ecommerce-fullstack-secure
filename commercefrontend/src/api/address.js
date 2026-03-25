import axios from "axios";

const API_URL = "http://localhost:3001/api/addresses";


//     CREATE ADDRESS (POST)

export const createAddress = async (addressData, token) => {
  const res = await axios.post(API_URL, addressData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return res.data;
};


export const getAddresses = async (token) => {
  const res = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data; // tableau d'adresses
};