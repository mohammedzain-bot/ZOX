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
        <div className="hero-premium-bg"></div>
        <div className="hero-premium-glass"></div>
        <div className="hero-premium-content">
          <div className="hero-brand-mark">ZOX</div>
          <h1 className="hero-headline">WEAR YOUR IDENTITY.</h1>
          <p className="hero-subheadline">
            Redefining modern luxury. Contemporary silhouettes crafted with uncompromising quality and conscious materials for the forward-thinking individual.
          </p>
          <div className="hero-actions">
            <Link href="/shop" className="hero-btn-primary">Explore Collection</Link>
            <Link href="/collections" className="hero-btn-secondary">View Lookbook</Link>
          </div>
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

        /* PREMIUM HERO SECTION */
        .hero-premium {
          position: relative;
          width: 100%;
          min-height: 80vh;
          border-radius: 24px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background-color: #031F14; /* Deep emerald baseline */
        }
        
        .hero-premium-bg {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: 
            radial-gradient(circle at 20% 30%, rgba(41, 201, 110, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(10, 76, 46, 0.8) 0%, transparent 50%),
            url('/images/hero.jpg');
          background-size: cover;
          background-position: center;
          opacity: 0.8;
          mix-blend-mode: overlay;
          animation: subtleZoom 20s infinite alternate ease-in-out;
        }

        .hero-premium-glass {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(135deg, rgba(3, 31, 20, 0.8) 0%, rgba(10, 76, 46, 0.6) 100%);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .hero-premium-content {
          position: relative;
          z-index: 2;
          max-width: 800px;
          text-align: center;
          color: #F4F6F5; /* Off-white */
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-brand-mark {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: 0.4em;
          color: #29C96E; /* Vibrant Green */
          margin-bottom: 2rem;
          animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        .hero-headline {
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 1.5rem;
          color: #FFFFFF;
          animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
          opacity: 0;
        }

        .hero-subheadline {
          font-size: clamp(1rem, 2vw, 1.25rem);
          line-height: 1.6;
          color: #D1F4E3; /* Light Mint */
          max-width: 600px;
          margin: 0 auto 3rem auto;
          font-weight: 300;
          animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards;
          opacity: 0;
        }

        .hero-actions {
          display: flex;
          gap: 1.5rem;
          animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards;
          opacity: 0;
          flex-wrap: wrap;
          justify-content: center;
        }

        .hero-btn-primary {
          background-color: #29C96E;
          color: #031F14;
          padding: 1.2rem 2.5rem;
          border-radius: 4px;
          font-weight: 600;
          font-size: 1rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: all 0.3s ease;
          border: 1px solid #29C96E;
        }

        .hero-btn-primary:hover {
          background-color: transparent;
          color: #29C96E;
          box-shadow: 0 0 20px rgba(41, 201, 110, 0.3);
        }

        .hero-btn-secondary {
          background-color: transparent;
          color: #F4F6F5;
          padding: 1.2rem 2.5rem;
          border-radius: 4px;
          font-weight: 500;
          font-size: 1rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border: 1px solid rgba(244, 246, 245, 0.3);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .hero-btn-secondary:hover {
          border-color: #F4F6F5;
          background-color: rgba(255, 255, 255, 0.05);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes subtleZoom {
          from { transform: scale(1); }
          to { transform: scale(1.05); }
        }

        @media (max-width: 768px) {
          .hero-premium {
            min-height: 70vh;
            border-radius: 16px;
            padding: 2rem 1rem;
          }
          .hero-actions {
            flex-direction: column;
            width: 100%;
            gap: 1rem;
          }
          .hero-btn-primary, .hero-btn-secondary {
            width: 100%;
            text-align: center;
          }
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
