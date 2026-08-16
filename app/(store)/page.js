import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { readDB } from '@/lib/db';
import NewsletterForm from '@/components/NewsletterForm';

async function getFeaturedProducts() {
  const products = await readDB('products.json');
  return products.slice(0, 4);
}

export default async function Home() {
  const products = await getFeaturedProducts();

  return (
    <div className="home-container">
      {/* SEARCH BAR (Mobile specific style) */}
      <div className="search-container">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search products" />
        </div>
      </div>

      {/* PREMIUM HERO SECTION */}
      <section className="hero-premium">
        {/* Left editorial panel */}
        <div className="hero-left">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-line"></span>
            <span className="hero-eyebrow-text">NEW COLLECTION 2025</span>
          </div>
          <h1 className="hero-headline">
            <span className="hero-line hero-line-1">WEAR</span>
            <span className="hero-line hero-line-2">YOUR</span>
            <span className="hero-line hero-line-3">IDENTITY<span className="hero-dot">.</span></span>
          </h1>
          <p className="hero-subheadline">
            Redefining modern luxury — contemporary silhouettes crafted with uncompromising quality for the forward-thinking individual.
          </p>
          <div className="hero-actions">
            <Link href="/shop" className="hero-btn-primary">
              <span>Explore Collection</span>
              <span className="hero-btn-arrow">→</span>
            </Link>
            <Link href="/collections" className="hero-btn-secondary">View Lookbook</Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-num">500+</span>
              <span className="hero-stat-label">Styles</span>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <span className="hero-stat-num">100%</span>
              <span className="hero-stat-label">Organic</span>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <span className="hero-stat-num">10K+</span>
              <span className="hero-stat-label">Happy Customers</span>
            </div>
          </div>
        </div>

        {/* Right image panel */}
        <div className="hero-right">
          <div className="hero-img-frame">
            <div className="hero-img-inner">
              <img src="/images/hero.jpg" alt="ZOX Premium Fashion" className="hero-img" />
              <div className="hero-img-overlay"></div>
            </div>
            <div className="hero-img-badge">
              <span className="hero-badge-icon">✦</span>
              <span>Premium Quality</span>
            </div>
          </div>
          <div className="hero-float-tag">AW'25</div>
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="category-section">
        <div className="section-header">
          <h3>Shop by Category</h3>
          <Link href="/collections" className="view-all">View All →</Link>
        </div>
        <div className="category-grid">
          {[{title: 'Men', img: '/images/streetwear.jpg'}, {title: 'Women', img: '/images/essentials.jpg'}, {title: 'Kids', img: '/images/kids.jpg'}, {title: 'Accessories', img: '/images/premium.jpg'}].map((cat, i) => (
            <Link href={`/shop?category=${cat.title}`} key={i} className="category-card">
              <img src={cat.img} alt={cat.title} />
              <div className="category-overlay">
                <span>{cat.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* DEALS OF THE DAY */}
      <section className="deals-section">
        <div className="section-header">
          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <h3>Deals of the Day</h3>
            <span className="timer">⏰ 04:22:15</span>
          </div>
        </div>
        
        {products.length > 0 ? (
          <div className="product-scroll">
            {products.map(product => (
              <div key={product.id} className="scroll-item">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <p style={{color: 'var(--color-text-muted)'}}>No deals today.</p>
        )}
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter-section">
        <h3 style={{color: 'var(--color-primary)', fontWeight: '600'}}>Join the ZOX Club</h3>
        <p>Sign up for early access to drops and exclusive members-only deals.</p>
        <NewsletterForm />
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        .home-container {
          padding: 1rem;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        /* SEARCH BAR */
        .search-container {
          width: 100%;
        }
        .search-bar {
          background-color: var(--color-background);
          border: 1px solid var(--color-border);
          border-radius: 8px;
          display: flex;
          align-items: center;
          padding: 0.8rem 1rem;
          background: #f7f9f8;
        }
        .search-icon {
          margin-right: 10px;
          opacity: 0.5;
        }
        .search-bar input {
          border: none;
          background: transparent;
          width: 100%;
          outline: none;
          font-size: 1rem;
          color: var(--color-text-primary);
        }

        /* ── PREMIUM HERO ─────────────────────────────── */
        .hero-premium {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 88vh;
          background: linear-gradient(135deg, #021710 0%, #0A3D22 50%, #031F14 100%);
          border-radius: 28px;
          overflow: hidden;
          position: relative;
        }
        .hero-premium::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 10% 50%, rgba(41,201,110,0.12) 0%, transparent 55%),
            radial-gradient(ellipse at 90% 20%, rgba(41,201,110,0.07) 0%, transparent 45%);
          pointer-events: none;
        }

        /* LEFT PANEL */
        .hero-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 4rem 3rem 4rem 4rem;
          position: relative;
          z-index: 2;
        }

        .hero-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
          animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards;
          opacity: 0;
        }
        .hero-eyebrow-line {
          display: block;
          width: 40px;
          height: 1px;
          background: #29C96E;
        }
        .hero-eyebrow-text {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          color: #29C96E;
          text-transform: uppercase;
        }

        .hero-headline {
          display: flex;
          flex-direction: column;
          margin-bottom: 2rem;
        }
        .hero-line {
          font-size: clamp(3.5rem, 6vw, 6.5rem);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.03em;
          color: #FFFFFF;
          display: block;
          opacity: 0;
        }
        .hero-line-1 { animation: slideRight 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s forwards; }
        .hero-line-2 {
          animation: slideRight 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s forwards;
          -webkit-text-stroke: 1px rgba(255,255,255,0.5);
          color: transparent;
        }
        .hero-line-3 { animation: slideRight 0.9s cubic-bezier(0.16,1,0.3,1) 0.4s forwards; }
        .hero-dot { color: #29C96E; }

        .hero-subheadline {
          font-size: 1rem;
          line-height: 1.7;
          color: rgba(255,255,255,0.55);
          max-width: 420px;
          margin-bottom: 2.5rem;
          font-weight: 300;
          animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.55s forwards;
          opacity: 0;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.7s forwards;
          opacity: 0;
          margin-bottom: 3rem;
        }
        .hero-btn-primary {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: #29C96E;
          color: #021710;
          padding: 1rem 2rem;
          border-radius: 6px;
          font-weight: 700;
          font-size: 0.9rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          transition: all 0.3s ease;
          border: 1.5px solid #29C96E;
        }
        .hero-btn-primary:hover {
          background: transparent;
          color: #29C96E;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(41,201,110,0.25);
        }
        .hero-btn-arrow {
          transition: transform 0.3s ease;
        }
        .hero-btn-primary:hover .hero-btn-arrow {
          transform: translateX(4px);
        }
        .hero-btn-secondary {
          background: transparent;
          color: rgba(255,255,255,0.7);
          padding: 1rem 2rem;
          border-radius: 6px;
          font-weight: 500;
          font-size: 0.9rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border: 1.5px solid rgba(255,255,255,0.2);
          transition: all 0.3s ease;
        }
        .hero-btn-secondary:hover {
          border-color: rgba(255,255,255,0.6);
          color: white;
          background: rgba(255,255,255,0.05);
        }

        .hero-stats {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.85s forwards;
          opacity: 0;
        }
        .hero-stat {
          display: flex;
          flex-direction: column;
        }
        .hero-stat-num {
          font-size: 1.4rem;
          font-weight: 700;
          color: #FFFFFF;
        }
        .hero-stat-label {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.45);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .hero-stat-divider {
          width: 1px;
          height: 36px;
          background: rgba(255,255,255,0.15);
        }

        /* RIGHT PANEL */
        .hero-right {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2.5rem 2.5rem 2.5rem 1rem;
          z-index: 2;
        }
        .hero-img-frame {
          position: relative;
          width: 100%;
          max-width: 440px;
        }
        .hero-img-inner {
          border-radius: 20px;
          overflow: hidden;
          aspect-ratio: 3/4;
          position: relative;
          box-shadow: 0 32px 80px rgba(0,0,0,0.5);
        }
        .hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation: subtleZoom 18s infinite alternate ease-in-out;
        }
        .hero-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(2,23,16,0.6) 0%, transparent 50%);
        }
        .hero-img-badge {
          position: absolute;
          bottom: 1.5rem;
          left: 1.5rem;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 50px;
          padding: 0.5rem 1.1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: white;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.05em;
        }
        .hero-badge-icon {
          color: #29C96E;
          font-size: 0.9rem;
        }
        .hero-float-tag {
          position: absolute;
          top: 3rem;
          right: 1rem;
          writing-mode: vertical-rl;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.25em;
          color: rgba(255,255,255,0.25);
          text-transform: uppercase;
        }

        /* KEYFRAMES */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(-30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes subtleZoom {
          from { transform: scale(1); }
          to   { transform: scale(1.06); }
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .hero-premium {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
            min-height: unset;
            border-radius: 20px;
          }
          .hero-right {
            padding: 0;
            order: -1;
          }
          .hero-img-frame {
            max-width: 100%;
            border-radius: 0;
          }
          .hero-img-inner {
            border-radius: 0;
            aspect-ratio: 4/3;
          }
          .hero-float-tag { display: none; }
          .hero-left {
            padding: 2rem 1.5rem;
          }
          .hero-line {
            font-size: clamp(2.8rem, 12vw, 4rem);
          }
          .hero-actions {
            flex-direction: column;
            gap: 0.8rem;
          }
          .hero-btn-primary, .hero-btn-secondary {
            width: 100%;
            justify-content: center;
            text-align: center;
          }
          .hero-stats {
            gap: 1rem;
          }
          .hero-stat-num { font-size: 1.1rem; }
        }

        /* SECTION HEADER */
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        .section-header h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--color-text-primary);
        }
        .view-all {
          color: var(--color-primary);
          font-size: 0.9rem;
          font-weight: 500;
        }
        .timer {
          background-color: #FDE8E8;
          color: #E02424;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        /* CATEGORY GRID */
        .category-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .category-card {
          position: relative;
          aspect-ratio: 1;
          border-radius: 12px;
          overflow: hidden;
        }
        .category-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .category-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 1rem;
          background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
          color: white;
          font-weight: 600;
          font-size: 1rem;
        }

        /* DEALS (HORIZONTAL SCROLL) */
        .product-scroll {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          padding-bottom: 1rem;
          scroll-snap-type: x mandatory;
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .product-scroll::-webkit-scrollbar {
          display: none;
        }
        .scroll-item {
          flex: 0 0 70%;
          min-width: 250px;
          scroll-snap-align: start;
        }

        /* NEWSLETTER */
        .newsletter-section {
          background-color: var(--color-tertiary);
          border-radius: 12px;
          padding: 2rem 1.5rem;
          text-align: center;
          margin-top: 1rem;
        }
        .newsletter-section h3 {
          margin-bottom: 0.5rem;
        }
        .newsletter-section p {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          margin-bottom: 1.5rem;
        }

        @media (min-width: 768px) {
          .category-grid {
            grid-template-columns: repeat(4, 1fr);
          }
          .scroll-item {
            flex: 0 0 250px;
          }
        }
      `}} />
    </div>
  );
}
