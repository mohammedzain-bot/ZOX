export default function About() {
  return (
    <div className="container" style={{padding: 'var(--spacing-xl) var(--spacing-md)', maxWidth: '800px'}}>
      <h1 style={{fontSize: '3rem', textTransform: 'uppercase', marginBottom: '2rem', textAlign: 'center'}}>About ZOX</h1>
      <div style={{lineHeight: 1.8, color: 'var(--color-dark-grey)', fontSize: '1.1rem'}}>
        <p style={{marginBottom: '1.5rem'}}>
          ZOX is a modern, minimal, and premium clothing brand focused on delivering high-quality essentials and contemporary streetwear. 
        </p>
        <p style={{marginBottom: '1.5rem'}}>
          Born out of a desire to simplify the modern wardrobe, we believe that luxury lies in the details—the fit, the fabric, and the finish. 
          Every piece we create is designed to be timeless, versatile, and enduring.
        </p>
        <p>
          We source the best materials to craft garments that not only look good but feel exceptional. 
          Define your style with ZOX.
        </p>
      </div>
    </div>
  );
}
