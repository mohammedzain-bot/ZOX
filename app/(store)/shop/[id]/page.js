'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function ProductDetails() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColour, setSelectedColour] = useState('');
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    fetch(`/api/products/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        if (data.sizes?.length) setSelectedSize(data.sizes[0]);
        if (data.colours?.length) setSelectedColour(data.colours[0]);
        if (data.images?.length) setMainImage(data.images[0]);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [params.id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const item = {
      id: product.id,
      name: product.name,
      price: product.discountPrice || product.price,
      image: mainImage,
      size: selectedSize,
      colour: selectedColour,
      quantity: 1
    };
    
    const existingIndex = cart.findIndex(i => i.id === item.id && i.size === item.size && i.colour === item.colour);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push(item);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    return true;
  };

  const handleAddToCart = () => {
    addToCart();
    alert('Added to cart!');
  };

  const handleBuyNow = () => {
    addToCart();
    router.push('/checkout');
  };

  if (loading) return <div style={{padding: '10rem', textAlign: 'center'}}>Loading...</div>;
  if (!product || product.error) return <div style={{padding: '10rem', textAlign: 'center'}}>Product not found</div>;

  let discountPercent = 0;
  if (product.discountPrice && product.price > product.discountPrice) {
    discountPercent = Math.round(((product.price - product.discountPrice) / product.price) * 100);
  }

  return (
    <div className="product-page-mobile">
      
      {/* Top Image Section */}
      <div className="images-section-mobile">
        <div className="main-image-mobile">
          {mainImage ? (
            <img src={mainImage} alt={product.name} />
          ) : (
            <div className="coming-soon-box">ZOX</div>
          )}
          
          <div className="badges-overlay">
            {product.category === 'New' && <div className="badge dark-green">NEW SEASON</div>}
            <div className="badge mint-green">ORGANIC COTTON</div>
          </div>
        </div>
        
        {product.images && product.images.length > 0 && (
          <div className="thumbnails-mobile">
            {product.images.map((img, i) => (
              <img 
                key={i} 
                src={img} 
                alt={`Thumb ${i}`} 
                onClick={() => setMainImage(img)} 
                className={mainImage === img ? 'active' : ''} 
              />
            ))}
          </div>
        )}
      </div>

      {/* Details Section */}
      <div className="details-section-mobile">
        <div className="category-label">PREMIUM {product.category}</div>
        <h1 className="product-title">{product.name}</h1>
        
        <div className="reviews-mock">
          <span className="stars">⭐⭐⭐⭐⭐</span>
          <span className="review-count">(124 Reviews)</span>
        </div>

        <div className="price-block">
          {product.discountPrice ? (
            <>
              <span className="current-price">₹{product.discountPrice.toLocaleString('en-IN')}</span>
              <span className="original-price">₹{product.price.toLocaleString('en-IN')}</span>
              <span className="discount-tag">{discountPercent}% OFF</span>
            </>
          ) : (
            <span className="current-price">₹{product.price.toLocaleString('en-IN')}</span>
          )}
        </div>

        {/* Sizes */}
        {product.sizes?.length > 0 && (
          <div className="size-selector">
            <div className="size-header">
              <span className="size-label">Select Size</span>
              <span className="size-guide">Size Guide</span>
            </div>
            <div className="size-grid">
              {product.sizes.map(size => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Delivery Box */}
        <div className="delivery-box">
          <div className="delivery-header">
            <span>🚚</span> Delivery Availability
          </div>
          <input type="text" placeholder="Enter Pincode" className="pincode-input" />
          <div className="delivery-hint">Usually delivered in 3-5 business days</div>
        </div>

        {/* Features */}
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🍃</span>
            <div className="feature-text">
              <strong>Sustainable</strong>
              <span>Eco-friendly dye</span>
            </div>
          </div>
          <div className="feature-card">
            <span className="feature-icon">✓</span>
            <div className="feature-text">
              <strong>Lifetime Guarantee</strong>
              <span>Free repairs</span>
            </div>
          </div>
        </div>
        
        {/* Description */}
        <div style={{marginTop: '2rem'}}>
          <p style={{color: 'var(--color-text-secondary)', lineHeight: 1.6}}>{product.description}</p>
        </div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="bottom-action-bar">
        <button className="btn-add-cart" onClick={handleAddToCart}>
          🛒 Add to Cart
        </button>
        <button className="btn-buy-now" onClick={handleBuyNow}>
          ⚡ Buy Now
        </button>
      </div>

      {/* Spacer for bottom bar */}
      <div style={{height: '100px'}}></div>

      <style dangerouslySetInnerHTML={{__html: `
        .product-page-mobile {
          background-color: var(--color-background);
          min-height: 100vh;
        }
        
        /* IMAGES */
        .images-section-mobile {
          background-color: var(--color-surface);
          padding-bottom: 1rem;
        }
        .main-image-mobile {
          position: relative;
          width: 100%;
          aspect-ratio: 3/4;
          background-color: #f0f0f0;
        }
        .main-image-mobile img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .badges-overlay {
          position: absolute;
          top: 1rem;
          left: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .badge {
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.7rem;
          font-weight: 700;
          display: inline-block;
          width: fit-content;
        }
        .badge.dark-green {
          background-color: var(--color-primary);
          color: white;
        }
        .badge.mint-green {
          background-color: var(--color-mint-light);
          color: var(--color-primary);
        }
        
        .thumbnails-mobile {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          justify-content: center;
        }
        .thumbnails-mobile img {
          width: 60px;
          height: 80px;
          object-fit: cover;
          border-radius: 8px;
          border: 2px solid transparent;
        }
        .thumbnails-mobile img.active {
          border-color: var(--color-primary);
        }

        /* DETAILS */
        .details-section-mobile {
          padding: 1.5rem 1rem;
        }
        .category-label {
          color: var(--color-primary);
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }
        .product-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--color-text-primary);
          line-height: 1.2;
          margin-bottom: 0.5rem;
        }
        .reviews-mock {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .stars {
          font-size: 0.9rem;
        }
        .review-count {
          color: var(--color-text-primary);
          font-weight: 600;
          font-size: 0.85rem;
        }
        .price-block {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 2rem;
        }
        .current-price {
          color: var(--color-primary);
          font-size: 2rem;
          font-weight: 700;
        }
        .original-price {
          color: var(--color-text-muted);
          text-decoration: line-through;
          font-size: 1.1rem;
        }
        .discount-tag {
          color: #D32F2F;
          font-weight: 700;
          font-size: 0.9rem;
        }

        /* SIZE SELECTOR */
        .size-selector {
          margin-bottom: 2rem;
        }
        .size-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        .size-label {
          font-weight: 600;
          color: var(--color-text-primary);
        }
        .size-guide {
          color: var(--color-primary);
          font-weight: 600;
          font-size: 0.9rem;
        }
        .size-grid {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .size-btn {
          flex: 1;
          min-width: 3rem;
          padding: 0.8rem 0;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 8px;
          font-weight: 600;
          color: var(--color-text-primary);
          cursor: pointer;
        }
        .size-btn.active {
          border: 2px solid var(--color-primary);
          background-color: var(--color-tertiary);
          color: var(--color-primary);
        }

        /* DELIVERY BOX */
        .delivery-box {
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 12px;
          padding: 1.2rem;
          margin-bottom: 1.5rem;
        }
        .delivery-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        .pincode-input {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid var(--color-border);
          border-radius: 8px;
          margin-bottom: 0.8rem;
        }
        .delivery-hint {
          font-size: 0.8rem;
          color: var(--color-text-secondary);
        }

        /* FEATURES */
        .features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .feature-card {
          background-color: var(--color-tertiary);
          padding: 1rem;
          border-radius: 12px;
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
        }
        .feature-icon {
          color: var(--color-primary);
          font-size: 1.2rem;
        }
        .feature-text {
          display: flex;
          flex-direction: column;
        }
        .feature-text strong {
          color: var(--color-primary);
          font-size: 0.9rem;
          margin-bottom: 0.2rem;
        }
        .feature-text span {
          color: var(--color-primary);
          font-size: 0.75rem;
          opacity: 0.8;
        }

        /* FIXED BOTTOM BAR */
        .bottom-action-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          background: var(--color-surface);
          border-top: 1px solid var(--color-border);
          padding: 1rem;
          display: flex;
          gap: 1rem;
          z-index: 1001; /* Above bottom nav */
          box-shadow: 0 -4px 12px rgba(0,0,0,0.05);
        }
        .btn-add-cart {
          flex: 1;
          background-color: var(--color-surface);
          border: 1px solid var(--color-primary);
          color: var(--color-primary);
          font-weight: 600;
          border-radius: 8px;
          padding: 1rem;
        }
        .btn-buy-now {
          flex: 1;
          background-color: var(--color-secondary);
          color: var(--color-white);
          border: none;
          font-weight: 600;
          border-radius: 8px;
          padding: 1rem;
        }
        
        @media (min-width: 768px) {
          .product-page-mobile {
            max-width: 600px;
            margin: 0 auto;
            border-left: 1px solid var(--color-border);
            border-right: 1px solid var(--color-border);
          }
          .bottom-action-bar {
            max-width: 600px;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      `}} />
    </div>
  );
}
