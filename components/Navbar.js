'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();
  const router = useRouter();

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Initial cart load
    updateCartCount();
    // Listen for cart updates
    window.addEventListener('cartUpdated', updateCartCount);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0, width: '100%',
      backgroundColor: scrolled || searchOpen || mobileMenuOpen ? 'rgba(255,255,255,0.95)' : 'transparent',
      backdropFilter: scrolled || searchOpen || mobileMenuOpen ? 'blur(10px)' : 'none',
      borderBottom: scrolled || searchOpen || mobileMenuOpen ? '1px solid var(--color-light-grey)' : '1px solid transparent',
      transition: 'var(--transition)',
      zIndex: 1000
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '80px'
      }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <button 
            className="mobile-menu-btn" 
            onClick={() => { setMobileMenuOpen(!mobileMenuOpen); setSearchOpen(false); }}
            style={{display: 'none', fontSize: '1.5rem', marginRight: '1rem'}}
          >
            ☰
          </button>
          
          <nav className="desktop-nav" style={{ display: 'flex', gap: '2rem' }}>
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/collections">Collections</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>

        <Link href="/" style={{
          fontSize: '1.8rem',
          fontWeight: '700',
          letterSpacing: '0.1em',
          textTransform: 'uppercase'
        }}>
          ZOX
        </Link>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: '1.5rem', alignItems: 'center' }}>
          <button onClick={() => { setSearchOpen(!searchOpen); setMobileMenuOpen(false); }} style={{fontSize: '1.2rem'}}>🔍</button>
          <Link href="/cart" style={{fontSize: '1.2rem', position: 'relative'}}>
            🛒
            {cartCount > 0 && (
              <span style={{
                position: 'absolute', top: '-8px', right: '-12px',
                backgroundColor: 'var(--color-foreground)', color: 'var(--color-background)',
                fontSize: '0.7rem', fontWeight: 'bold',
                width: '18px', height: '18px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {searchOpen && (
        <div style={{
          position: 'absolute', top: '80px', left: 0, width: '100%',
          backgroundColor: 'var(--color-white)', padding: '1rem',
          borderBottom: '1px solid var(--color-light-grey)', display: 'flex', justifyContent: 'center'
        }}>
          <form onSubmit={handleSearch} style={{display: 'flex', width: '100%', maxWidth: '500px', gap: '0.5rem'}}>
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              style={{flex: 1, padding: '0.75rem', border: '1px solid var(--color-light-grey)', borderRadius: '4px'}}
            />
            <button type="submit" className="btn-primary" style={{padding: '0 1.5rem'}}>Search</button>
          </form>
        </div>
      )}

      {mobileMenuOpen && (
        <div className="mobile-menu" style={{
          position: 'absolute', top: '80px', left: 0, width: '100%',
          backgroundColor: 'var(--color-white)',
          padding: '1rem',
          borderBottom: '1px solid var(--color-light-grey)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/collections">Collections</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}} />
    </header>
  );
}
