'use client';
import { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container" style={{padding: 'var(--spacing-xl) var(--spacing-md)', maxWidth: '600px'}}>
      <h1 style={{fontSize: '3rem', textTransform: 'uppercase', marginBottom: '2rem', textAlign: 'center'}}>Contact Us</h1>
      
      {submitted ? (
        <div style={{padding: '2rem', textAlign: 'center', backgroundColor: 'var(--color-off-white)', borderRadius: '4px'}}>
          <h2 style={{fontSize: '1.5rem', marginBottom: '1rem'}}>Thank you for reaching out!</h2>
          <p style={{color: 'var(--color-dark-grey)'}}>We have received your message and will get back to you shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
          <div>
            <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 500}}>Name</label>
            <input type="text" required style={{width: '100%', padding: '0.75rem', border: '1px solid var(--color-light-grey)', borderRadius: '4px'}} />
          </div>
          <div>
            <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 500}}>Email</label>
            <input type="email" required style={{width: '100%', padding: '0.75rem', border: '1px solid var(--color-light-grey)', borderRadius: '4px'}} />
          </div>
          <div>
            <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 500}}>Message</label>
            <textarea required rows="6" style={{width: '100%', padding: '0.75rem', border: '1px solid var(--color-light-grey)', borderRadius: '4px', resize: 'vertical'}}></textarea>
          </div>
          <button type="submit" className="btn-primary" style={{padding: '1rem'}}>Send Message</button>
        </form>
      )}
    </div>
  );
}
