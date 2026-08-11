'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../admin.module.css';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await fetch(`/api/products/${id}`, { method: 'DELETE' });
        fetchProducts();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <h1>Manage Products</h1>
        <Link href="/admin/products/add" className="btn-primary">Add Product</Link>
      </div>

      <table className={styles.productTable}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td data-label="Image">
                {product.images && product.images[0] ? (
                  <img src={product.images[0]} alt={product.name} style={{width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px'}} />
                ) : (
                  <div style={{width: '50px', height: '50px', backgroundColor: '#eee', borderRadius: '8px'}}></div>
                )}
              </td>
              <td data-label="Name">{product.name}</td>
              <td data-label="Category">{product.category}</td>
              <td data-label="Price">₹{product.price}</td>
              <td data-label="Stock">{product.stock}</td>
              <td data-label="Actions">
                <Link href={`/admin/products/edit/${product.id}`} className={styles.actionBtn} style={{color: 'white', backgroundColor: '#0A4C2E', marginRight: '0.5rem'}}>Edit</Link>
                <button className={styles.actionBtn} style={{color: 'white', backgroundColor: '#c0392b'}} onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan="6" style={{textAlign: 'center', padding: '2rem'}}>No products found. Add one!</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
