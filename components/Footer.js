import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--color-off-white)',
      padding: 'var(--spacing-xl) 0 var(--spacing-md)',
      marginTop: 'auto'
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 'var(--spacing-lg)',
        marginBottom: 'var(--spacing-xl)'
      }}>
        
        <div>
          <h2 style={{fontSize: '1.5rem', fontWeight: '700', letterSpacing: '0.1em', marginBottom: '1rem'}}>ZOX</h2>
          <p style={{color: 'var(--color-dark-grey)', fontSize: '0.9rem', maxWidth: '250px', marginBottom: '1rem'}}>
            Contemporary clothing designed for everyday confidence. Premium materials and modern fits.
          </p>
          <div style={{color: 'var(--color-dark-grey)', fontSize: '0.85rem', display: 'flex', gap: '0.5rem', alignItems: 'flex-start'}}>
            <span>📍</span>
            <p>Near Allen Solley,<br />Virajpet, Kodagu,<br />Karnataka</p>
          </div>
        </div>

        <div>
          <h3 style={{fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', textTransform: 'uppercase'}}>Shop</h3>
          <ul style={{listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--color-dark-grey)'}}>
            <li><Link href="/shop?category=New Arrivals">New Arrivals</Link></li>
            <li><Link href="/shop?category=T-Shirts">T-Shirts</Link></li>
            <li><Link href="/shop?category=Shirts">Shirts</Link></li>
            <li><Link href="/shop?category=Hoodies">Hoodies</Link></li>
            <li><Link href="/shop?category=Pants">Pants</Link></li>
            <li><Link href="/shop?category=Accessories">Accessories</Link></li>
          </ul>
        </div>

        <div>
          <h3 style={{fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', textTransform: 'uppercase'}}>Customer Care</h3>
          <ul style={{listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--color-dark-grey)'}}>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/shipping">Shipping</Link></li>
            <li><Link href="/returns">Returns</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h3 style={{fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', textTransform: 'uppercase'}}>Company</h3>
          <ul style={{listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--color-dark-grey)'}}>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>

        <div>
          <h3 style={{fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', textTransform: 'uppercase'}}>Social</h3>
          <ul style={{listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--color-dark-grey)'}}>
            <li><a href="#" target="_blank">Instagram</a></li>
            <li><a href="#" target="_blank">Facebook</a></li>
            <li><a href="#" target="_blank">WhatsApp</a></li>
          </ul>
        </div>

      </div>

      <div className="container" style={{
        borderTop: '1px solid var(--color-light-grey)',
        paddingTop: 'var(--spacing-md)',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.8rem',
        color: 'var(--color-dark-grey)'
      }}>
        <p>&copy; {new Date().getFullYear()} ZOX. All rights reserved.</p>
        <p>Built for style.</p>
      </div>
    </footer>
  );
}
