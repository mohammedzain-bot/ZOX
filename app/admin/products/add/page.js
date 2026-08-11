'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../admin.module.css';

export default function AddProduct() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    category: 'T-Shirts',
    description: '',
    price: '',
    discountPrice: '',
    sku: '',
    stock: '',
    sizes: '',
    colours: '',
    tags: ''
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setImageFiles(prev => [...prev, ...files]);
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrls = [];
      
      // Upload images if present
      for (const file of imageFiles) {
        const uploadData = new FormData();
        uploadData.append('file', file);
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadData
        });
        const uploadJson = await uploadRes.json();
        if (uploadJson.url) {
          imageUrls.push(uploadJson.url);
        }
      }

      // Format data
      const productData = {
        ...formData,
        price: parseFloat(formData.price) || 0,
        discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : null,
        stock: parseInt(formData.stock) || 0,
        sizes: formData.sizes.split(',').map(s => s.trim()).filter(Boolean),
        colours: formData.colours.split(',').map(c => c.trim()).filter(Boolean),
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        images: imageUrls
      };

      // Save product
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });

      if (res.ok) {
        router.push('/admin/products');
      } else {
        alert('Failed to save product');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 style={{marginBottom: '2rem'}}>Add New Product</h1>
      
      <form onSubmit={handleSubmit} style={{maxWidth: '800px', backgroundColor: 'var(--color-white)', padding: '2rem', borderRadius: '4px', border: '1px solid var(--color-light-grey)'}}>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>Product Images</label>
          <input type="file" accept="image/*" multiple onChange={handleFileChange} className={styles.input} />
          {previews.length > 0 && (
            <div style={{marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
              {previews.map((preview, i) => (
                <img key={i} src={preview} alt={`Preview ${i}`} style={{maxWidth: '100px', borderRadius: '4px'}} />
              ))}
            </div>
          )}
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Product Name</label>
            <input name="name" required value={formData.name} onChange={handleChange} className={styles.input} placeholder="e.g. Oversized Essential Tee" />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className={styles.select}>
              <option value="T-Shirts">T-Shirts</option>
              <option value="Shirts">Shirts</option>
              <option value="Hoodies">Hoodies</option>
              <option value="Jackets">Jackets</option>
              <option value="Pants">Pants</option>
              <option value="Jeans">Jeans</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Description</label>
          <textarea name="description" required value={formData.description} onChange={handleChange} className={styles.textarea} placeholder="Premium oversized cotton t-shirt..."></textarea>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem'}}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Price (₹)</label>
            <input type="number" name="price" required value={formData.price} onChange={handleChange} className={styles.input} step="0.01" />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Discount Price (₹)</label>
            <input type="number" name="discountPrice" value={formData.discountPrice} onChange={handleChange} className={styles.input} step="0.01" />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Stock Quantity</label>
            <input type="number" name="stock" required value={formData.stock} onChange={handleChange} className={styles.input} />
          </div>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Available Sizes (comma separated)</label>
            <input name="sizes" value={formData.sizes} onChange={handleChange} className={styles.input} placeholder="S, M, L, XL" />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Available Colours (comma separated)</label>
            <input name="colours" value={formData.colours} onChange={handleChange} className={styles.input} placeholder="Black, White, Grey" />
          </div>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
          <div className={styles.formGroup}>
            <label className={styles.label}>SKU</label>
            <input name="sku" value={formData.sku} onChange={handleChange} className={styles.input} placeholder="ZOX-TS-001" />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Tags (comma separated)</label>
            <input name="tags" value={formData.tags} onChange={handleChange} className={styles.input} placeholder="new, summer, essential" />
          </div>
        </div>

        <button type="submit" className="btn-primary" disabled={loading} style={{marginTop: '1rem'}}>
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}
