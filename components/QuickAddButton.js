'use client';

export default function QuickAddButton({ product }) {
  const handleQuickAdd = (e) => {
    e.preventDefault(); // Prevent navigating to the product page if inside a Link
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const hasImage = product.images && product.images.length > 0;
    const imageUrl = hasImage ? product.images[0] : null;

    const item = {
      id: product.id,
      name: product.name,
      price: product.discountPrice || product.price,
      image: imageUrl,
      size: product.sizes?.[0] || 'Default',
      colour: product.colours?.[0] || 'Default',
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
    alert('Added to cart!');
  };

  return (
    <button className="quick-add" onClick={handleQuickAdd}>Quick Add</button>
  );
}
