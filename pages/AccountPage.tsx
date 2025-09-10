
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { orderService } from '../services/orderService';
import { Order } from '../types';
import { CURRENCY_SYMBOL } from '../constants';

const AccountPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          setLoading(true);
          const userOrders = await orderService.getOrders(user.id);
          setOrders(userOrders);
        } catch (error) {
          console.error("Failed to fetch orders", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return <p>Please log in to view your account.</p>;
  }

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-green-800">My Account</h1>
        <p className="text-gray-600 mt-2">Welcome back, <span className="font-semibold">{user.name}</span>!</p>
        <p className="text-gray-600">Email: <span className="font-semibold">{user.email}</span></p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-green-800 mb-4">Order History</h2>
        {loading ? (
          <p>Loading your orders...</p>
        ) : orders.length === 0 ? (
          <p>You have not placed any orders yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-bold">Order ID: {order.id}</p>
                    <p className="text-sm text-gray-500">Date: {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {order.status}
                  </span>
                </div>
                <div className="border-t pt-2 mt-2">
                  {order.items.map(item => (
                    <div key={item.product.id} className="flex justify-between items-center py-1">
                      <span>{item.product.name} x {item.quantity}</span>
                      <span>{CURRENCY_SYMBOL}{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-2 mt-2 font-bold text-right">
                  Total: {CURRENCY_SYMBOL}{order.total.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
