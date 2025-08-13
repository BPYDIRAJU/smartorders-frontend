import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const AddOrder = () => {
  const { material = "", supplierName = "" } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const subtype = searchParams.get("subtype");

  const [formData, setFormData] = useState({
    customerName: "",
    quantity: "",
    deliveryDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Optional stricter check
    if (!formData.customerName.trim() || !formData.quantity || !formData.deliveryDate) {
      alert("❌ Please fill in all required fields.");
      return;
    }

    const orderDetails = {
      material,
      supplierName,
      subtype,
      ...formData,
    };

    console.log("✅ Order Placed:", orderDetails);

    alert("✅ Order placed successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-white to-blue-50 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white/70 backdrop-blur-md px-8 py-10 rounded-2xl shadow-xl w-full max-w-md space-y-6 border border-blue-100"
      >
        <h1 className="text-2xl font-bold text-blue-700 text-center flex items-center justify-center gap-2">
          ➕ Place New Order
        </h1>

        {/* Material Info */}
        <div className="space-y-1">
          <label className="block text-sm font-semibold text-gray-700">Material:</label>
          <div className="text-base font-medium text-blue-900">{material.toUpperCase()}</div>
        </div>

        {/* Supplier Info */}
        <div className="space-y-1">
          <label className="block text-sm font-semibold text-gray-700">Supplier:</label>
          <div className="text-base font-medium text-blue-900">{supplierName || "N/A"}</div>
        </div>

        {/* Subtype Info */}
        {subtype && (
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-700">Subtype:</label>
            <div className="text-base font-medium text-blue-900">{subtype}</div>
          </div>
        )}

        {/* Customer Name */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Customer Name:</label>
          <input
            type="text"
            name="customerName"
            required
            placeholder="Customer name"
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 hover:border-blue-400 outline-none transition-all capitalize"
            onChange={handleChange}
            value={formData.customerName}
          />
        </div>

        {/* Quantity */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Quantity:</label>
          <input
            type="number"
            name="quantity"
            required
            min={1}
            placeholder="e.g. 5 tons"
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 hover:border-blue-400 outline-none transition-all"
            onChange={handleChange}
            value={formData.quantity}
          />
        </div>

        {/* Delivery Date */}
       {/* Delivery Date */}
<div className="space-y-2">
  <label className="block text-sm font-semibold text-gray-700">Delivery Date:</label>
  <input
    type="date"
    name="deliveryDate"
    required
    value={formData.deliveryDate}
    onChange={handleChange}
    min={new Date().toISOString().split("T")[0]}
    max={new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
    className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 hover:border-blue-400 outline-none transition-all"
  />
</div>


        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all active:scale-[0.98]"
        >
          🚚 Place Order
        </button>
      </form>
    </div>
  );
};

export default AddOrder;
