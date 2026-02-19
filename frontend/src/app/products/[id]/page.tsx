import { PRODUCTS } from '@/lib/products';
import ProductDetailClient from './ProductDetailClient';

export function generateStaticParams() {
    return PRODUCTS.map((product) => ({
        id: product.id,
    }));
}

export default function ProductPage() {
    return <ProductDetailClient />;
}
