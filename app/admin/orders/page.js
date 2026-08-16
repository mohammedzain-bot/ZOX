'use client';
import { useEffect, useState } from 'react';
import styles from '../admin.module.css';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        console.error('API returned an error:', data);
        setOrders([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (id, status) => {
    try {
      await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 style={{marginBottom: '2rem'}}>Manage Orders</h1>

      <table className={styles.productTable}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>{order.customer?.name || 'Guest'}</td>
              <td>₹{order.total}</td>
              <td>{order.paymentStatus}</td>
              <td>
                <span style={{
                  padding: '4px 8px', 
                  borderRadius: '12px', 
                  fontSize: '0.8rem',
                  backgroundColor: order.status === 'Delivered' ? '#dcfce7' : '#fef3c7',
                  color: order.status === 'Delivered' ? '#166534' : '#92400e'
                }}>
                  {order.status}
                </span>
              </td>
              <td>
                <select 
                  value={order.status} 
                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                  className={styles.select}
                  style={{padding: '0.25rem', fontSize: '0.8rem', width: 'auto'}}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan="7" style={{textAlign: 'center', padding: '2rem'}}>No orders found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
