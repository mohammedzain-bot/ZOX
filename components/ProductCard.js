import Link from 'next/link';

export default function ProductCard({ product }) {
  const hasImage = product.images && product.images.length > 0;
  const imageUrl = hasImage ? product.images[0] : null;
  
  // Calculate discount percentage
  let discountPercent = 0;
  if (product.discountPrice && product.price > product.discountPrice) {
    discountPercent = Math.round(((product.price - product.discountPrice) / product.price) * 100);
  }

  // Mock rating data
  const rating = (4 + Math.random()).toFixed(1);
  const reviewCount = Math.floor(Math.random() * 300) + 10;

  return (
    <div className="product-card-new">
      <Link href={`/shop/${product.id}`} className="image-wrapper-new">
        {hasImage ? (
          <img src={imageUrl} alt={product.name} />
        ) : (
          <div className="coming-soon-box-new">
            <div className="logo-text-new">ZOX</div>
          </div>
        )}
        
        <div className="badges-top-left">
          {discountPercent > 0 ? (
            <div className="badge-discount">{discountPercent}% OFF</div>
          ) : (
            product.category === 'New' && <div className="badge-discount">NEW</div>
          )}
          <div className="badge-assured">
            <span style={{color: 'var(--color-secondary)', marginRight: '4px'}}>✓</span> ZOX ASSURED
          </div>
        </div>
        
        <button className="wishlist-btn">♡</button>
      </Link>
      
      <div className="info-new">
        <Link href={`/shop/${product.id}`} className="name-new">{product.name.length > 20 ? product.name.substring(0, 20) + '...' : product.name}</Link>
        <div className="price-wrapper-new">
          {product.discountPrice ? (
            <>
              <span className="price-new">₹{product.discountPrice.toLocaleString('en-IN')}</span>
              <span className="original-price-new">₹{product.price.toLocaleString('en-IN')}</span>
            </>
          ) : (
            <span className="price-new">₹{product.price.toLocaleString('en-IN')}</span>
          )}
        </div>
        <div className="rating-new">
          <span style={{color: '#FADB14', marginRight: '4px'}}>⭐</span>
          <span>{rating > 5 ? '5.0' : rating}</span>
          <span className="review-count">({reviewCount})</span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .product-card-new {
          background-color: var(--color-surface);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
          display: flex;
          flex-direction: column;
          border: 1px solid var(--color-border);
        }
        .image-wrapper-new {
          position: relative;
          aspect-ratio: 3/4;
          background-color: var(--color-background);
          overflow: hidden;
          display: block;
        }
        .image-wrapper-new img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .badges-top-left {
          position: absolute;
          top: 8px;
          left: 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .badge-discount {
          background-color: var(--color-primary);
          color: var(--color-white);
          font-size: 0.6rem;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 12px;
          display: inline-block;
          width: fit-content;
        }
        .badge-assured {
          background-color: var(--color-white);
          color: var(--color-text-primary);
          font-size: 0.55rem;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          width: fit-content;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .wishlist-btn {
          position: absolute;
          top: 8px;
          right: 8px;
          background: var(--color-white);
          border: none;
          border-radius: 50%;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          font-size: 1rem;
          color: var(--color-text-primary);
          cursor: pointer;
        }
        .coming-soon-box-new {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--color-tertiary);
        }
        .logo-text-new {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--color-primary);
        }
        .info-new {
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .name-new {
          font-weight: 500;
          font-size: 0.95rem;
          color: var(--color-text-primary);
        }
        .price-wrapper-new {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .price-new {
          color: var(--color-primary);
          font-weight: 700;
          font-size: 1.1rem;
        }
        .original-price-new {
          text-decoration: line-through;
          color: var(--color-text-muted);
          font-size: 0.8rem;
        }
        .rating-new {
          display: flex;
          align-items: center;
          font-size: 0.8rem;
          color: var(--color-text-primary);
        }
        .review-count {
          color: var(--color-text-muted);
          margin-left: 4px;
        }
      `}} />
    </div>
  );
}
