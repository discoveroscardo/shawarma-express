import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    preparing: 'bg-blue-100 text-blue-800',
    out_for_delivery: 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800'
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/orders`);
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/orders/${orderId}/status`, {
        status: newStatus
      });
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestión de Pedidos</h1>
      
      {loading ? (
        <p>Cargando pedidos...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border">ID</th>
                <th className="py-2 px-4 border">Cliente</th>
                <th className="py-2 px-4 border">Items</th>
                <th className="py-2 px-4 border">Total</th>
                <th className="py-2 px-4 border">Estado</th>
                <th className="py-2 px-4 border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">#{order._id.slice(-6)}</td>
                  <td className="py-2 px-4 border">User #{order.userId}</td>
                  <td className="py-2 px-4 border">
                    <ul className="list-disc pl-5">
                      {order.items.map((item, idx) => (
                        <li key={idx}>{item.name} x{item.quantity}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-2 px-4 border">{order.total}€</td>
                  <td className="py-2 px-4 border">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
                      {order.status === 'pending' && 'Pendiente'}
                      {order.status === 'preparing' && 'En preparación'}
                      {order.status === 'out_for_delivery' && 'En reparto'}
                      {order.status === 'completed' && 'Completado'}
                    </span>
                  </td>
                  <td className="py-2 px-4 border">
                    <select 
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className="border rounded p-1 text-sm"
                    >
                      <option value="pending">Pendiente</option>
                      <option value="preparing">En preparación</option>
                      <option value="out_for_delivery">En reparto</option>
                      <option value="completed">Completado</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}