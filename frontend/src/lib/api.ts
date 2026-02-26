import { Product } from './products';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';

export async function fetchProducts(): Promise<Product[]> {
    try {
        const response = await fetch(`${API_URL}/products`, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        // The backend returns an array of products.
        // We'll map them to match our frontend Product interface if necessary
        return data.map((item: any) => ({
            id: item.id,
            name: item.name,
            brand: 'Parallel Broker', // Or parse from description if needed, or leave generic
            price: item.price,
            unit: 'unit',
            minOrder: 10,
            image: (item.images && item.images.length > 0) ? item.images[0] : 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97',
            inStock: item.stock > 0,
            category: item.category,
            ean: item.ean,
            rating: 4.5 + (Math.random() * 0.5),
            reviews: Math.floor(Math.random() * 100) + 10,
        }));
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

export async function getHomepageCategories(): Promise<any> {
    try {
        const response = await fetch(`${API_URL}/config/homepage-categories`, { cache: 'no-store' });
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error('Error fetching homepage categories:', error);
        return null;
    }
}

export async function setHomepageCategories(token: string, data: any): Promise<boolean> {
    try {
        const response = await fetch(`${API_URL}/admin/config/homepage-categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        return response.ok;
    } catch (error) {
        console.error('Error setting homepage categories:', error);
        return false;
    }
}

export async function fetchImageByEan(ean: string): Promise<string | null> {
    if (!ean) return null;
    try {
        const response = await fetch(`${API_URL}/products/ean/${ean}`, { cache: 'no-store' });
        if (!response.ok) return null;
        const data = await response.json();
        return data.imageUrl || null;
    } catch (error) {
        console.error('Error fetching image by EAN:', error);
        return null;
    }
}
