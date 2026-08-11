import Link from 'next/link';

export default function Collections() {
  const collections = [
    { title: 'Essentials', img: '/images/essentials.jpg', desc: 'Everyday premium basics.' },
    { title: 'Streetwear', img: '/images/streetwear.jpg', desc: 'Contemporary urban aesthetics.' },
    { title: 'Premium', img: '/images/premium.jpg', desc: 'High-end luxury materials.' }
  ];

  return (
    <div className="container" style={{padding: 'var(--spacing-xl) var(--spacing-md)'}}>
      <h1 style={{fontSize: '3rem', textTransform: 'uppercase', marginBottom: '3rem', textAlign: 'center'}}>Collections</h1>
      
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem'}}>
        {collections.map((coll, i) => (
          <Link href={`/shop?category=${coll.title}`} key={i} style={{display: 'block'}}>
            <div style={{
              position: 'relative', 
              aspectRatio: '3/4', 
              overflow: 'hidden',
              marginBottom: '1rem',
              backgroundColor: 'var(--color-off-white)'
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: `url(${coll.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'transform 0.5s ease',
              }} className="coll-img-zoom"></div>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.1)'
              }}></div>
            </div>
            <h2 style={{fontSize: '1.5rem', textTransform: 'uppercase'}}>{coll.title}</h2>
            <p style={{color: 'var(--color-dark-grey)', marginTop: '0.5rem'}}>{coll.desc}</p>
          </Link>
        ))}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .coll-img-zoom:hover { transform: scale(1.05); }
      `}} />
    </div>
  );
}
