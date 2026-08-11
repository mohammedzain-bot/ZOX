'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Checkout() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', city: '', state: '', zip: ''
  });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (savedCart.length === 0) {
      router.push('/cart');
    } else {
      setCart(savedCart);
      setLoading(false);
    }
  }, [router]);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? (subtotal > 5000 ? 0 : 250) : 0;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let message = `*New Order from ZOX* 🛍️%0A%0A`;
    message += `*Customer Details:*%0A`;
    message += `Name: ${formData.name}%0A`;
    message += `Phone: ${formData.phone}%0A`;
    message += `Email: ${formData.email}%0A`;
    message += `Address: ${formData.address}, ${formData.city}, ${formData.state} - ${formData.zip}%0A%0A`;
    
    message += `*Order Items:*%0A`;
    cart.forEach(item => {
      message += `- ${item.quantity}x ${item.name}`;
      if (item.size) message += ` (Size: ${item.size})`;
      if (item.colour) message += ` (Colour: ${item.colour})`;
      message += ` - ₹${((item.discountPrice || item.price) * item.quantity).toFixed(2)}%0A`;
    });
    
    message += `%0A*Order Summary:*%0A`;
    message += `Subtotal: ₹${subtotal.toFixed(2)}%0A`;
    message += `Shipping: ${shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}%0A`;
    message += `*Total Amount: ₹${total.toFixed(2)}*%0A%0A`;
    message += `_Please confirm my order!_`;

    const whatsappUrl = `https://wa.me/918147003313?text=${message}`;
    
    localStorage.removeItem('cart');
    window.dispatchEvent(new Event('cartUpdated'));
    
    window.open(whatsappUrl, '_blank');
    router.push('/');
  };

  if (loading) return null;

  return (
    <div className="container" style={{padding: 'var(--spacing-xl) var(--spacing-md)'}}>
      <h1 style={{fontSize: '3rem', textTransform: 'uppercase', marginBottom: '2rem'}}>Checkout</h1>

      <div className="checkout-layout">
        <form onSubmit={handleSubmit} className="checkout-form">
          <h2 style={{textTransform: 'uppercase', fontSize: '1.2rem', marginBottom: '1.5rem'}}>Contact Information</h2>
          <input required type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="input-field" />
          
          <h2 style={{textTransform: 'uppercase', fontSize: '1.2rem', margin: '2rem 0 1.5rem'}}>Shipping Address</h2>
          <input required type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="input-field" />
          <input required type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="input-field" />
          <input required type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="input-field" />
          
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
            <input required type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="input-field" />
            <input required type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} className="input-field" />
          </div>
          <input required type="text" name="zip" placeholder="Postal Code" value={formData.zip} onChange={handleChange} className="input-field" />

          <button type="submit" className="btn-primary" disabled={isSubmitting} style={{width: '100%', marginTop: '2rem'}}>
            {isSubmitting ? 'Processing...' : 'Place Order via WhatsApp'}
          </button>
        </form>

        <div className="order-summary">
          <h2 style={{textTransform: 'uppercase', fontSize: '1.2rem', marginBottom: '1.5rem'}}>Order Summary</h2>
          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem'}}>
            {cart.map((item, index) => (
              <div key={index} style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
                <div style={{position: 'relative', width: '60px', height: '80px', flexShrink: 0}}>
                  <img src={item.image} alt={item.name} style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px'}} />
                  <span style={{position: 'absolute', top: '-5px', right: '-5px', backgroundColor: 'var(--color-foreground)', color: 'var(--color-background)', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem'}}>{item.quantity}</span>
                </div>
                <div style={{flex: 1}}>
                  <div style={{fontWeight: 500, fontSize: '0.9rem'}}>{item.name}</div>
                  <div style={{fontSize: '0.8rem', color: 'var(--color-dark-grey)'}}>{item.size} {item.colour && `/ ${item.colour}`}</div>
                </div>
                <div style={{fontWeight: 500, fontSize: '0.9rem'}}>₹{(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div style={{borderTop: '1px solid var(--color-light-grey)', paddingTop: '1.5rem'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem'}}>
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem'}}>
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-light-grey)', fontWeight: 600, fontSize: '1.2rem'}}>
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .checkout-layout {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: 4rem;
        }
        .input-field {
          width: 100%;
          padding: 1rem;
          border: 1px solid var(--color-light-grey);
          border-radius: 4px;
          margin-bottom: 1rem;
          font-family: inherit;
          font-size: 1rem;
        }
        .order-summary {
          background-color: var(--color-off-white);
          padding: 2rem;
          border-radius: 4px;
          height: fit-content;
        }
        
        @media (max-width: 768px) {
          .checkout-layout {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .checkout-form {
            order: 2;
          }
          .order-summary {
            order: 1;
          }
        }
      `}} />
    </div>
  );
}
