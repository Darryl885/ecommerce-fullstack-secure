// src/context/CartContext.jsx
import { createContext, useState, useContext, useCallback, useEffect } from "react"; // 👈 Ajout de useEffect
import { getCartItems, addToCart as apiAddToCart } from "../api/cart";
import { UserContext } from "./UserContext";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 1️⃣ Fonction pour récupérer le panier depuis l'API
  const fetchCartItems = useCallback(async () => {
    // Si pas d'utilisateur, on vide le panier local et on arrête
    if (!user) {
      setCartItems([]);
      return;
    }
    
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const data = await getCartItems(token);
      
      // On s'assure de stocker un tableau
      setCartItems(Array.isArray(data) ? data : data.items || []);
    } catch (err) {
      console.error("Erreur chargement panier:", err);
      setError(err.response?.data?.error || "Impossible de charger le panier");
    } finally {
      setLoading(false);
    }
  }, [user]);

  // 2️⃣ Appeler fetchCartItems automatiquement au démarrage ou quand l'user change
  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  // 3️⃣ Ajouter un produit au panier
  const handleAddToCart = async (productId, quantity = 1) => {
    if (!user) {
      setError("Vous devez être connecté");
      return;
    }
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      // Envoi au backend
      await apiAddToCart({ productId: Number(productId), quantity: Number(quantity) }, token);
      
      setSuccess("Produit ajouté au panier !");
      
      // 🔄 Crucial : On rafraîchit la liste locale après l'ajout réussi sur le serveur
      await fetchCartItems(); 
    } catch (err) {
      setError(err.response?.data?.error || "Erreur ajout panier");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(""), 2000);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        loading,
        error,
        success,
        fetchCartItems,
        handleAddToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}