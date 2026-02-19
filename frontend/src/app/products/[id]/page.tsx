'use client';

import { Star, Heart, Share2, ShieldCheck, Truck, RotateCcw, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { PRODUCTS } from '@/lib/products';
import ProductCard from '@/components/product/ProductCard';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
    const product = PRODUCTS.find((p) => p.id === params.id) || PRODUCTS[0];
    const [qty, setQty] = useState(product.minOrder);
    const [selectedImage, setSelectedImage] = useState(0);

    const images = [product.image, product.image, product.image, product.image];
    const whole = Math.floor(product.price);
    const fraction = Math.round((product.price - whole) * 100).toString().padStart(2, '0');
    const relatedProducts = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 6);
    const rating = 4.3;
    const reviewCount = 2847;

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumbs */}
            <div className="max-w-[1500px] mx-auto px-4">
                <div className="amz-breadcrumbs">
                    <Link href="/">Home</Link> <span className="mx-1">›</span>
                    <Link href="/catalog">{product.category}</Link> <span className="mx-1">›</span>
                    <span>{product.brand}</span>
                </div>
            </div>

            {/* Product Main */}
            <div className="max-w-[1500px] mx-auto px-4 pb-8">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* LEFT — Image Gallery */}
                    <div className="lg:w-[40%] flex gap-3">
                        {/* Thumbnails */}
                        <div className="flex flex-col gap-2 w-[50px] flex-shrink-0">
                            {images.map((img, i) => (
                                <div
                                    key={i}
                                    onMouseEnter={() => setSelectedImage(i)}
                                    className={`w-[50px] h-[50px] border-2 rounded cursor-pointer overflow-hidden
                                        ${selectedImage === i ? 'border-[#007185]' : 'border-[#e3e6e6]'}`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                        {/* Main Image */}
                        <div className="flex-1 flex items-center justify-center bg-white p-4 relative group">
                            <img
                                src={images[selectedImage]}
                                alt={product.name}
                                className="max-w-full max-h-[500px] object-contain cursor-crosshair transition-transform group-hover:scale-105"
                            />
                            <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow hover:bg-gray-50">
                                <Heart className="w-5 h-5 text-gray-500" />
                            </button>
                            <button className="absolute top-3 right-14 p-2 bg-white rounded-full shadow hover:bg-gray-50">
                                <Share2 className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                    </div>

                    {/* CENTER — Product Details */}
                    <div className="lg:w-[35%]">
                        <h1 className="text-[24px] text-[#0f1111] leading-8 mb-2">
                            {product.name}
                        </h1>

                        <p className="text-sm text-[#007185] hover:text-[#c7511f] hover:underline cursor-pointer mb-2">
                            Visit the {product.brand} Store
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#e3e6e6]">
                            <span className="text-sm text-[#007185]">{rating}</span>
                            <div className="amz-stars">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} className="w-4 h-4" fill={s <= Math.floor(rating) ? '#de7921' : 'none'} stroke="#de7921" strokeWidth={1} />
                                ))}
                            </div>
                            <Link href="#reviews" className="text-sm text-[#007185] hover:text-[#c7511f] hover:underline">
                                {reviewCount.toLocaleString()} ratings
                            </Link>
                        </div>

                        {/* Price */}
                        <div className="mb-3">
                            {product.bulkSave && (
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="amz-deal-badge">23% off</span>
                                    <span className="amz-limited-deal">Limited time deal</span>
                                </div>
                            )}
                            <div className="flex items-baseline gap-1 mb-1">
                                <span className="text-xs text-[#565959]">EGP</span>
                                <span className="text-[28px] text-[#0f1111]">{whole}</span>
                                <span className="text-xs text-[#0f1111] align-super">{fraction}</span>
                            </div>
                            {product.bulkSave && (
                                <p className="text-sm text-[#565959]">
                                    List Price: <span className="line-through">EGP{(product.price * 1.3).toFixed(2)}</span>
                                </p>
                            )}
                        </div>

                        {/* Bulk Pricing Table */}
                        <div className="mb-4 bg-[#f7fafa] border border-[#d5d9d9] rounded-lg p-3">
                            <p className="text-sm font-bold text-[#0f1111] mb-2">Bulk Pricing</p>
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-[#565959] text-xs">
                                        <th className="text-left py-1">Qty</th>
                                        <th className="text-left py-1">Price/Unit</th>
                                        <th className="text-left py-1">You Save</th>
                                    </tr>
                                </thead>
                                <tbody className="text-[#0f1111]">
                                    <tr><td className="py-1">1-9</td><td>EGP{product.price.toFixed(2)}</td><td>—</td></tr>
                                    <tr className="bg-white"><td className="py-1">10-49</td><td>EGP{(product.price * 0.95).toFixed(2)}</td><td className="text-[#007600]">5%</td></tr>
                                    <tr><td className="py-1">50-99</td><td>EGP{(product.price * 0.9).toFixed(2)}</td><td className="text-[#007600]">10%</td></tr>
                                    <tr className="bg-white"><td className="py-1">100+</td><td>EGP{(product.price * 0.85).toFixed(2)}</td><td className="text-[#007600]">15%</td></tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Features */}
                        <div className="space-y-2 mb-4 pb-4 border-b border-[#e3e6e6]">
                            <div className="flex gap-3">
                                <Truck className="w-5 h-5 text-[#565959] flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm text-[#007185]">FREE Delivery on orders over EGP 500</p>
                                    <p className="text-xs text-[#565959]">Or fastest delivery tomorrow</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <RotateCcw className="w-5 h-5 text-[#565959] flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-[#007185]">Returnable within 15 days</p>
                            </div>
                            <div className="flex gap-3">
                                <ShieldCheck className="w-5 h-5 text-[#565959] flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-[#007185]">Buyer protection guarantee</p>
                            </div>
                        </div>

                        {/* About This Item */}
                        <div className="mb-4">
                            <h2 className="text-base font-bold text-[#0f1111] mb-2">About this item</h2>
                            <ul className="list-disc list-inside text-sm text-[#0f1111] space-y-1 pl-1">
                                <li>Premium quality {product.category.toLowerCase()} from {product.brand}</li>
                                <li>Perfect for retail, restaurants, and hospitality</li>
                                <li>Bulk packaging for wholesale buyers</li>
                                <li>Fresh stock with extended shelf life</li>
                                <li>Minimum order: {product.minOrder} units</li>
                            </ul>
                        </div>
                    </div>

                    {/* RIGHT — Buy Box */}
                    <div className="lg:w-[25%]">
                        <div className="border border-[#d5d9d9] rounded-lg p-5 sticky top-28">
                            <div className="flex items-baseline gap-1 mb-2">
                                <span className="text-xs text-[#565959]">EGP</span>
                                <span className="text-[28px] text-[#0f1111]">{whole}</span>
                                <span className="text-xs text-[#0f1111] align-super">{fraction}</span>
                            </div>

                            <p className="text-sm text-[#007185] mb-1">FREE Delivery <span className="font-bold text-[#0f1111]">Monday, Feb 24</span></p>
                            <p className="text-xs text-[#565959] mb-3">Or fastest delivery <span className="font-bold text-[#0f1111]">tomorrow</span></p>

                            <p className={`text-lg font-bold mb-3 ${product.inStock ? 'text-[#007600]' : 'text-[#b12704]'}`}>
                                {product.inStock ? 'In Stock' : 'Currently Unavailable'}
                            </p>

                            {product.inStock && (
                                <>
                                    {/* Qty Selector */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-sm text-[#0f1111]">Qty:</span>
                                        <select
                                            value={qty}
                                            onChange={(e) => setQty(parseInt(e.target.value))}
                                            className="border border-[#d5d9d9] rounded-lg px-2 py-1 text-sm bg-[#f0f2f2] shadow-sm cursor-pointer"
                                        >
                                            {Array.from({ length: 20 }, (_, i) => i + product.minOrder).map((n) => (
                                                <option key={n} value={n}>{n}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <button className="amz-btn-add-to-cart mb-2">Add to Cart</button>
                                    <button className="amz-btn-buy-now mb-4">Buy Now</button>
                                </>
                            )}

                            <div className="text-xs text-[#565959] space-y-1 border-t border-[#e3e6e6] pt-3">
                                <div className="flex justify-between"><span>Ships from</span><span className="text-[#0f1111]">MarketPlace.eg</span></div>
                                <div className="flex justify-between"><span>Sold by</span><span className="text-[#007185]">{product.brand} Official</span></div>
                                <div className="flex justify-between"><span>Returns</span><span className="text-[#007185]">15-day returnable</span></div>
                                <div className="flex justify-between"><span>Payment</span><span className="text-[#0f1111]">Secure transaction</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <div className="bg-[#eaeded] py-6">
                    <div className="max-w-[1500px] mx-auto px-4">
                        <div className="bg-white p-5">
                            <h2 className="text-[21px] font-bold text-[#0f1111] mb-4">Products related to this item</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-[#e3e6e6]">
                                {relatedProducts.map((p) => (
                                    <ProductCard key={p.id} product={p} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
