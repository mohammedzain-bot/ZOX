'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
    setLoading(false);
  }, []);

  const updateQuantity = (index, delta) => {
    const newCart = [...cart];
    newCart[index].quantity = Math.max(1, newCart[index].quantity + delta);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const subtotal = cart.reduce((sum, item) => sum + ((item.discountPrice || item.price) * item.quantity), 0);
  const totalMRP = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const bagDiscount = totalMRP - subtotal;
  const shipping = 99; // Convenience fee
  const total = subtotal + shipping;

  if (loading) return null;

  return (
    <div className="cart-page-mobile">
      
      {/* Checkout Progress */}
      <div className="checkout-progress">
        <span className="step active"><span className="step-num">1</span> Cart</span>
        <span className="step-divider">-</span>
        <span className="step"><span className="step-num">2</span> Address</span>
        <span className="step-divider">-</span>
        <span className="step"><span className="step-num">3</span> Payment</span>
      </div>

      <h1 className="cart-title">Your Bag ({cart.length} Items)</h1>

      {cart.length === 0 ? (
        <div style={{padding: '4rem 0', color: 'var(--color-text-secondary)', textAlign: 'center'}}>
          <p style={{marginBottom: '1rem'}}>Your cart is currently empty.</p>
          <Link href="/shop" className="btn-primary">Continue Shopping</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item-card">
                <div className="cart-item-img-wrapper">
                  <img src={item.image} alt={item.name} />
                </div>
                
                <div className="cart-item-details">
                  <div className="cart-item-header">
                    <Link href={`/shop/${item.id}`} className="cart-item-name">{item.name}</Link>
                    <button onClick={() => removeItem(index)} className="btn-remove">🗑️</button>
                  </div>
                  
                  <div className="cart-item-meta">
                    {item.size && <span>Size: {item.size} </span>}
                    {item.colour && <span> | Color: {item.colour}</span>}
                  </div>
                  
                  <p className="cart-item-desc">
                    Premium organic cotton with a brushed interior for maximum comfort.
                  </p>
                  
                  <div className="cart-item-actions">
                    <div className="quantity-selector">
                      <button onClick={() => updateQuantity(index, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(index, 1)}>+</button>
                    </div>
                    
                    <div className="cart-item-price-block">
                      <span className="current">₹{((item.discountPrice || item.price) * item.quantity).toLocaleString('en-IN')}</span>
                      {item.discountPrice && (
                        <span className="original">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="order-summary-box">
            <h2>Order Summary</h2>
            
            <div className="summary-row">
              <span className="label">Total MRP</span>
              <span className="value">₹{totalMRP.toLocaleString('en-IN')}</span>
            </div>
            
            <div className="summary-row discount">
              <span className="label">Bag Discount</span>
              <span className="value">-₹{bagDiscount.toLocaleString('en-IN')}</span>
            </div>
            
            <div className="summary-row">
              <span className="label">Convenience Fee</span>
              <span className="value"><span style={{textDecoration: 'line-through', color: 'var(--color-text-muted)', marginRight: '4px'}}>₹99</span> <span style={{color: 'var(--color-primary)'}}>FREE</span></span>
            </div>
            
            <div className="summary-total">
              <span>Total Amount</span>
              <span className="total-val">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            
            <div className="promo-box">
              <div className="promo-icon">🏷️</div>
              <div>
                <strong>EXTRA₹500 OFF</strong>
                <div style={{fontSize: '0.8rem'}}>Applied on your first order!</div>
              </div>
            </div>
            
            <button className="btn-place-order">
              PLACE ORDER &gt;
            </button>
            
            <div className="secure-payment">
              🔒 SECURE PAYMENTS • 100% AUTHENTIC
            </div>
          </div>
        </div>
      )}

      {/* Spacer for bottom nav */}
      <div style={{height: '100px'}}></div>

      <style dangerouslySetInnerHTML={{__html: `
        .cart-page-mobile {
          padding: 1rem;
          background-color: var(--color-background);
          min-height: 100vh;
        }

        /* CHECKOUT PROGRESS */
        .checkout-progress {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
          background-color: var(--color-surface);
          padding: 1rem;
          border-radius: 12px;
          border: 1px solid var(--color-border);
        }
        .step {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .step.active {
          color: var(--color-primary);
          font-weight: 600;
        }
        .step-num {
          background-color: var(--color-border);
          color: white;
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 0.7rem;
        }
        .step.active .step-num {
          background-color: var(--color-secondary);
        }
        .step-divider {
          color: var(--color-border);
        }

        .cart-title {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--color-text-primary);
        }

        .cart-items {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .cart-item-card {
          background-color: var(--color-surface);
          border-radius: 12px;
          padding: 1rem;
          display: grid;
          grid-template-columns: 100px 1fr;
          gap: 1rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.02);
          border: 1px solid var(--color-border);
        }

        .cart-item-img-wrapper {
          border-radius: 8px;
          overflow: hidden;
          background-color: #f0f0f0;
          aspect-ratio: 3/4;
        }
        .cart-item-img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .cart-item-details {
          display: flex;
          flex-direction: column;
        }
        .cart-item-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.2rem;
        }
        .cart-item-name {
          font-weight: 600;
          color: var(--color-text-primary);
          font-size: 1rem;
        }
        .btn-remove {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.1rem;
          opacity: 0.6;
        }

        .cart-item-meta {
          font-size: 0.8rem;
          color: var(--color-text-secondary);
          margin-bottom: 0.5rem;
        }
        .cart-item-desc {
          font-size: 0.75rem;
          color: var(--color-text-secondary);
          line-height: 1.4;
          margin-bottom: 1rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .cart-item-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
        }
        .quantity-selector {
          display: flex;
          align-items: center;
          border: 1px solid var(--color-border);
          border-radius: 6px;
        }
        .quantity-selector button {
          background: none;
          border: none;
          padding: 0.3rem 0.6rem;
          cursor: pointer;
          font-size: 1rem;
          color: var(--color-text-secondary);
        }
        .quantity-selector span {
          padding: 0 0.5rem;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .cart-item-price-block {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .cart-item-price-block .current {
          color: var(--color-primary);
          font-weight: 700;
          font-size: 1rem;
        }
        .cart-item-price-block .original {
          color: var(--color-text-muted);
          text-decoration: line-through;
          font-size: 0.8rem;
        }

        /* ORDER SUMMARY */
        .order-summary-box {
          background-color: var(--color-background);
          padding: 1.5rem;
          border-radius: 12px;
        }
        .order-summary-box h2 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-text-secondary);
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.8rem;
          font-size: 0.9rem;
          color: var(--color-text-primary);
        }
        .summary-row.discount {
          color: var(--color-primary);
        }
        .summary-total {
          display: flex;
          justify-content: space-between;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--color-border);
          font-weight: 700;
          font-size: 1.2rem;
          color: var(--color-text-primary);
          margin-bottom: 1.5rem;
        }

        .promo-box {
          background-color: var(--color-tertiary);
          color: var(--color-primary);
          padding: 1rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 1.5rem;
        }
        
        .btn-place-order {
          width: 100%;
          background-color: var(--color-secondary);
          color: var(--color-white);
          padding: 1rem;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1rem;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
        }

        .secure-payment {
          text-align: center;
          font-size: 0.75rem;
          color: var(--color-text-secondary);
          letter-spacing: 0.1em;
        }

        @media (min-width: 768px) {
          .cart-page-mobile {
            max-width: 1000px;
            margin: 0 auto;
          }
          .cart-layout {
            display: grid;
            grid-template-columns: 1.5fr 1fr;
            gap: 2rem;
          }
          .order-summary-box {
            position: sticky;
            top: 100px;
          }
        }
      `}} />
    </div>
  );
}
