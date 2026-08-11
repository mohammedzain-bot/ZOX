'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Categories', path: '/collections', icon: '◬' },
    { name: 'Cart', path: '/cart', icon: '🛒' },
    { name: 'Account', path: '/about', icon: '👤' } // mapping account to about for now
  ];

  return (
    <>
      <div className="bottom-nav-spacer"></div>
      <nav className="bottom-nav">
        {navItems.map((item) => {
          const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
          return (
            <Link href={item.path} key={item.name} className={`nav-item ${isActive ? 'active' : ''}`}>
              <div className="nav-icon">{item.icon}</div>
              <span className="nav-label">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <style dangerouslySetInnerHTML={{__html: `
        .bottom-nav-spacer {
          height: 80px;
          display: none;
        }
        .bottom-nav {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          background: var(--color-white);
          border-top: 1px solid var(--color-border);
          padding: 0.5rem 1rem 1.5rem 1rem;
          z-index: 1000;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 -4px 12px rgba(0,0,0,0.05);
        }
        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--color-text-secondary);
          width: 25%;
          padding: 0.5rem;
          border-radius: 20px;
          transition: var(--transition);
        }
        .nav-item.active {
          color: var(--color-primary);
          background-color: var(--color-tertiary);
        }
        .nav-item.active .nav-icon {
          color: var(--color-primary);
        }
        .nav-icon {
          font-size: 1.25rem;
          margin-bottom: 0.25rem;
        }
        .nav-label {
          font-size: 0.75rem;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .bottom-nav-spacer { display: block; }
          .bottom-nav { display: flex; }
        }
      `}} />
    </>
  );
}
