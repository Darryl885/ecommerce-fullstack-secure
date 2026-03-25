import axios from "axios";

const API_URL = "http://localhost:3001/api/products";

export const createProduct = async (data, token) => {
  const response = await axios.post(API_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// recuperer tous les produits 
// export const getAllProducts = async (filters = {}) => {
//   const query = new URLSearchParams(filters).toString();
//   const response = await axios.get(`${API_URL}?${query}`);
//   return response.data;
// };

// recuperer tous les produits (SECURE)
export const getAllProducts = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();
  const url = query ? `${API_URL}?${query}` : API_URL;

  const response = await axios.get(url);

  // On supporte plusieurs formats de backend
  const data = response.data;

  // Format A : API renvoie directement un tableau
  if (Array.isArray(data)) return data;

  // Format B : API renvoie { products: [...] }
  if (Array.isArray(data?.products)) return data.products;

  // Format C : API renvoie { data: [...] }
  if (Array.isArray(data?.data)) return data.data;

  // Sinon → on renvoie un tableau vide pour ne pas casser le front
  return [];
};


// récupère un produit par ID
export const getProductById = async (id) => {
  return (await axios.get(`${API_URL}/${id}`)).data;
};

//  DELETE product
export const deleteProduct = async (id) => {
  const res = await axios.delete(`/products/${id}`);
  return res.data;
};