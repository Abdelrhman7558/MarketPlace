import ProductDetailClient from './ProductDetailClient';
import { PRODUCTS } from '@/lib/products';

export function generateStaticParams() {
    return PRODUCTS.map((product) => ({
        id: product.id,
    }));
}

export default function ProductPage() {
    return <ProductDetailClient />;
}
