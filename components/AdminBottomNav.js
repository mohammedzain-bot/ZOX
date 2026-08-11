'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { name: 'Dashboard', path: '/admin', icon: '📊' },
  { name: 'Products', path: '/admin/products', icon: '👕' },
  { name: 'Add', path: '/admin/products/add', icon: '➕' },
  { name: 'Orders', path: '/admin/orders', icon: '📦' },
  { name: 'Store', path: '/', icon: '🏪' },
];

export default function AdminBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="admin-bottom-nav">
      {tabs.map(tab => {
        const isActive = pathname === tab.path;
        return (
          <Link
            key={tab.path}
            href={tab.path}
            className={`admin-tab ${isActive ? 'admin-tab-active' : ''}`}
          >
            <span className="admin-tab-icon">{tab.icon}</span>
            <span className="admin-tab-label">{tab.name}</span>
          </Link>
        );
      })}

      <style dangerouslySetInnerHTML={{__html: `
        .admin-bottom-nav {
          display: none;
        }

        @media (max-width: 768px) {
          .admin-bottom-nav {
            display: flex;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: white;
            border-top: 1px solid #E0E0E0;
            z-index: 500;
            height: 70px;
            align-items: stretch;
            box-shadow: 0 -4px 16px rgba(0,0,0,0.08);
          }

          .admin-tab {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 3px;
            color: #999;
            text-decoration: none;
            transition: background 0.15s;
            -webkit-tap-highlight-color: transparent;
          }

          .admin-tab:active {
            background-color: #F4F6F5;
          }

          .admin-tab-active {
            color: #0A4C2E;
          }

          .admin-tab-icon {
            font-size: 1.3rem;
            line-height: 1;
          }

          .admin-tab-label {
            font-size: 0.65rem;
            font-weight: 500;
            letter-spacing: 0.02em;
          }

          .admin-tab-active .admin-tab-label {
            font-weight: 700;
          }
        }
      `}} />
    </nav>
  );
}
