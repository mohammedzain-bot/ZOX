'use client';
import { useEffect, useState } from 'react';
import styles from './admin.module.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, sales: 0 });

  useEffect(() => {
    // In a real app, fetch these from an API
    Promise.all([
      fetch('/api/products').then(res => res.json()),
      fetch('/api/orders').then(res => res.json())
    ]).then(([products, orders]) => {
      const pArray = Array.isArray(products) ? products : [];
      const oArray = Array.isArray(orders) ? orders : [];
      
      const totalSales = oArray.reduce((sum, order) => sum + (order.total || 0), 0);
      setStats({
        products: pArray.length || 0,
        orders: oArray.length || 0,
        sales: totalSales
      });
    }).catch(err => console.error("Error fetching stats:", err));
  }, []);

  return (
    <div>
      <h1 style={{marginBottom: '2rem'}}>Dashboard Overview</h1>
      
      <div className={styles.dashboardGrid}>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>Total Products</div>
          <div className={styles.statValue}>{stats.products}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>Total Orders</div>
          <div className={styles.statValue}>{stats.orders}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>Total Sales</div>
          <div className={styles.statValue}>₹{stats.sales.toFixed(2)}</div>
        </div>
      </div>
      
      <div className={styles.statCard}>
        <h2>Recent Activity</h2>
        <p style={{marginTop: '1rem', color: 'var(--color-dark-grey)'}}>No recent activity to display.</p>
      </div>
    </div>
  );
}
