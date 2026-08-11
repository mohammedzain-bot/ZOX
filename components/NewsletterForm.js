'use client';
import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  if (subscribed) {
    return (
      <div style={{padding: '1rem', backgroundColor: 'var(--color-foreground)', color: 'var(--color-background)', borderRadius: '4px'}}>
        Thank you for subscribing!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '0.8rem', width: '100%'}}>
      <input 
        type="email" 
        placeholder="Enter your email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required 
        style={{width: '100%', padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '1rem'}} 
      />
      <button type="submit" className="btn-primary" style={{width: '100%'}}>
        Subscribe
      </button>
    </form>
  );
}
