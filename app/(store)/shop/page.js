import ProductCard from '@/components/ProductCard';
import { getCollection } from '@/lib/mongodb';
import Link from 'next/link';

async function getProducts() {
  const col = await getCollection('products');
  const products = await col.find({}).sort({ createdAt: -1 }).toArray();
  // MongoDB uses _id which can cause serialization issues in Server Components
  return products.map(({ _id, ...rest }) => rest);
}

export default async function Shop({ searchParams }) {
  const products = await getProducts();
  const category = searchParams.category;
  
  let filteredProducts = products;
  
  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category === category || p.tags?.includes(category.toLowerCase()));
  }
  
  const q = searchParams.q;
  if (q) {
    const qLower = q.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(qLower) || 
      p.description?.toLowerCase().includes(qLower)
    );
  }

  const sort = searchParams.sort || 'featured';
  if (sort === 'newest') {
    filteredProducts.sort((a, b) => b.id.localeCompare(a.id));
  } else if (sort === 'price_asc') {
    filteredProducts.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
  } else if (sort === 'price_desc') {
    filteredProducts.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
  }

  const queryTitle = q ? q : category ? category : 'All Products';

  return (
    <div className="shop-container">
      <div className="shop-header">
        <div className="searching-for">SEARCHING FOR</div>
        <h1>{queryTitle}</h1>
        <div className="product-count">{filteredProducts.length} products found</div>
      </div>
      
      <div className="action-buttons">
        <button className="action-btn">
          <span style={{marginRight: '8px'}}>≡</span> Sort
        </button>
        <button className="action-btn">
          <span style={{marginRight: '8px'}}>≡</span> Filter
        </button>
      </div>

      {filteredProducts.length > 0 ? (
        <>
          <div className="product-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div style={{marginTop: '2rem', textAlign: 'center'}}>
            <button className="btn-primary" style={{width: '100%'}}>Load More Products</button>
          </div>
          
          <div className="showing-text">
            Showing {filteredProducts.length} of {filteredProducts.length} products
          </div>
        </>
      ) : (
        <div style={{textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-muted)'}}>
          <p>No products found in this category.</p>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .shop-container {
          padding: 1rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .shop-header {
          margin-bottom: 1.5rem;
        }
        .searching-for {
          color: var(--color-primary);
          font-weight: 600;
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }
        .shop-header h1 {
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--color-text-primary);
          margin-bottom: 0.25rem;
        }
        .product-count {
          color: var(--color-text-secondary);
          font-size: 0.9rem;
        }
        .action-buttons {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .action-btn {
          flex: 1;
          background-color: #F0F2F1;
          border: 1px solid var(--color-border);
          padding: 0.8rem;
          border-radius: 8px;
          font-weight: 500;
          color: var(--color-text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .product-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        .showing-text {
          text-align: center;
          color: var(--color-text-secondary);
          font-size: 0.85rem;
          margin-top: 1rem;
        }
        @media (min-width: 768px) {
          .product-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .product-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}} />
    </div>
  );
}
