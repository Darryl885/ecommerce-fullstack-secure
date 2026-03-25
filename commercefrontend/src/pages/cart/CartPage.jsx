import { useContext, useEffect } from "react"; // 👈 Ajout de useEffect
import { CartContext } from "../../context/CartContext";
import useUpdateCartItem from "../../hooks/cart/useUpdateCartItem";
import useGetAddresses from "../../hooks/address/useGetAddresses";
import useCreateOrder from "../../hooks/order/useCreateOrder";
import { useNavigate } from "react-router-dom";
import useStripePayment from "../../hooks/payment/useStripePayment";

export default function CartPage() {
  // On récupère tout ce qu'il faut du contexte global
  const { cartItems, setCartItems, loading: cartLoading, fetchCartItems } = useContext(CartContext);
  
  const { loading: updateLoading, handleUpdateCartItem } = useUpdateCartItem();
  const { addresses, loading: loadingAddresses } = useGetAddresses(); 
  const { loading: orderLoading, error: orderError, handleCreateOrder } = useCreateOrder();
  const { handleStripePayment } = useStripePayment();
  const navigate = useNavigate();

  // 🚀 Force le rafraîchissement des produits au montage de la page
  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return; // Sécurité métier : pas de quantité négative
    const updatedItem = await handleUpdateCartItem(itemId, newQuantity);
    if (updatedItem) {
      setCartItems((prev) =>
        prev.map((item) => (item.id === itemId ? updatedItem : item))
      );
    }
  };

  const handleCheckout = async () => {
    if (loadingAddresses || orderLoading) return;

    if (addresses && addresses.length > 0) {
      const selectedAddress = addresses.find((a) => a.isDefault) || addresses[0];
      const order = await handleCreateOrder(selectedAddress.id);

      if (order) {
        handleStripePayment({
          amount: total,
          currency: "eur", // Changé en EUR pour la cohérence
          productName: "Votre commande sur notre boutique",
          orderId: order.id,
        });
      }
    } else {
      navigate("/addresses/new");
    }
  };

  // Calcul du total avec sécurité si product est indéfini
  const total = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  if (cartLoading && cartItems.length === 0) {
    return <div className="container mt-5 text-center"><h3>🔄 Chargement de votre panier...</h3></div>;
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h3>🛒 Votre panier est vide</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/products")}>
          Voir les produits
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🛒 Mon Panier</h2>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Produit</th>
              <th>Prix</th>
              <th>Quantité</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong>{item.product?.name || "Produit inconnu"}</strong>
                </td>
                <td>{item.product?.price || 0} €</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    className="form-control"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, Number(e.target.value))
                    }
                    disabled={updateLoading}
                    style={{ width: "80px" }}
                  />
                </td>
                <td>{((item.product?.price || 0) * item.quantity).toFixed(2)} €</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card shadow-sm mt-4 p-4 bg-light">
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <h3 className="mb-0">
            Total à payer : <span className="text-primary">{total.toFixed(2)} €</span>
          </h3>
          
          <button
            className="btn btn-success btn-lg mt-2 mt-md-0"
            onClick={handleCheckout}
            disabled={orderLoading || loadingAddresses || updateLoading}
          >
            {orderLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Traitement...
              </>
            ) : (
              "💳 Payer avec Stripe"
            )}
          </button>
        </div>
      </div>

   {((orderError || updateLoading === false) && cartItems.length > 0 && !total) && (
  <div className="alert alert-danger mt-3">
    {orderError || "Erreur lors du calcul du panier"}
  </div>
)}
      
      {loadingAddresses && (
        <div className="text-center mt-3">
          <small className="text-muted">🔄 Vérification des informations de livraison...</small>
        </div>
      )}
    </div>
  );
}