import { useState, useEffect } from "react"; // 👈 Ajoute useEffect
import { getAddresses } from "../../api/address";

export default function useGetAddresses() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true); //  Commence à true
  const [error, setError] = useState("");

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const data = await getAddresses(token);
      
      // 🛡️ Vérifie si data est bien un tableau (Dépend de ton API)
      setAddresses(Array.isArray(data) ? data : data.addresses || []);
      
    } catch (err) {
      setError(err.response?.data?.error || "Erreur chargement adresses");
    } finally {
      setLoading(false);
    }
  };

  // AJOUT CRUCIAL : Appeler la fonction au montage du composant
  useEffect(() => {
    fetchAddresses();
  }, []); 

  return { addresses, loading, error, fetchAddresses };
}