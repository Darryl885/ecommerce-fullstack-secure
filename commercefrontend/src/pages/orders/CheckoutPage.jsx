import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetAddresses from "../../hooks/address/useGetAddresses";
import useCreateOrder from "../../hooks/order/useCreateOrder";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { addresses, fetchAddresses } = useGetAddresses();
  const { loading, handleCreateOrder } = useCreateOrder();

  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    fetchAddresses().then((data) => {
      const def = data.find((a) => a.isDefault);
      if (def) setSelectedAddress(def.id);
    });
  }, );

  const handleConfirm = async () => {
    const order = await handleCreateOrder(selectedAddress);
    if (order) navigate(`/order-success/${order.id}`);
  };

  return (
    <div className="container mt-4">
      <h2>📦 Validation de la commande</h2>

      {addresses.map((a) => (
        <div key={a.id} className="form-check border p-2 mb-2">
          <input
            type="radio"
            className="form-check-input"
            checked={selectedAddress === a.id}
            onChange={() => setSelectedAddress(a.id)}
          />
          <label className="form-check-label">
            {a.fullName} – {a.city}, {a.street}
            {a.isDefault && <strong> (par défaut)</strong>}
          </label>
        </div>
      ))}

      <button
        className="btn btn-success mt-3"
        disabled={!selectedAddress || loading}
        onClick={handleConfirm}
      >
        {loading ? "Création..." : "Confirmer la commande"}
      </button>
    </div>
  );
}
