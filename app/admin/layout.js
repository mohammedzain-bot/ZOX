'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './admin.module.css';
import AdminBottomNav from '@/components/AdminBottomNav';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth');
    if (auth === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'zoxfashion' && password === 'zoxfashion') {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Products', path: '/admin/products' },
    { name: 'Add Product', path: '/admin/products/add' },
    { name: 'Orders', path: '/admin/orders' },
  ];

  if (!isAuthenticated) {
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5'}}>
        <div style={{backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px'}}>
          <h1 style={{textAlign: 'center', marginBottom: '1.5rem', color: '#333'}}>ZOX Admin Login</h1>
          {error && <p style={{color: 'red', textAlign: 'center', marginBottom: '1rem'}}>{error}</p>}
          <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            <input 
              type="text" 
              placeholder="Username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              style={{padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px'}}
              required
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              style={{padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px'}}
              required
            />
            <button type="submit" style={{padding: '0.8rem', backgroundColor: '#0A4C2E', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'}}>
              Login
            </button>
          </form>
          <div style={{textAlign: 'center', marginTop: '1rem'}}>
            <Link href="/" style={{color: '#666', textDecoration: 'none', fontSize: '0.9rem'}}>← Back to Store</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>ZOX ADMIN</div>
        <nav className={styles.nav}>
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.path} 
                href={item.path}
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
              >
                {item.name}
              </Link>
            );
          })}
          <Link href="/" className={styles.navLink} style={{marginTop: 'auto'}}>
            &larr; Back to Store
          </Link>
        </nav>
      </aside>
      <main className={styles.mainContent}>
        {children}
      </main>
      <AdminBottomNav />
    </div>
  );
}
