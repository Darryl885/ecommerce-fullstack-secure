// hooks/useProducts.js
import { useEffect, useState } from "react";
import { getAllProducts } from "../../api/product";

export default function useProducts(filters = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await getAllProducts(filters);
      setProducts(data);
      setLoading(false);
    };
    load();
  }, [filters]);

  return { products, loading };
}
