'use client';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort') || 'featured';

  const handleChange = (e) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', e.target.value);
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <select 
      value={sort}
      onChange={handleChange}
      style={{padding: '0.5rem', border: '1px solid var(--color-light-grey)', borderRadius: '4px'}}
    >
      <option value="featured">Featured</option>
      <option value="newest">Newest</option>
      <option value="price_asc">Price: Low to High</option>
      <option value="price_desc">Price: High to Low</option>
    </select>
  );
}
