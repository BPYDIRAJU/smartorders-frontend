import React from 'react';

interface OrderCardProps {
  orderId: string;
  customer: string;
  amount: number;
  status: string;
}

const OrderCard: React.FC<OrderCardProps> = ({ orderId, customer, amount, status }) => {
  return (
    <div className="border p-4 rounded-md shadow-sm bg-white">
      <h2 className="text-lg font-semibold">Order #{orderId}</h2>
      <p>Customer: {customer}</p>
      <p>Amount: ₹{amount}</p>
      <p>Status: <span className="font-medium">{status}</span></p>
    </div>
  );
};

export default OrderCard;
