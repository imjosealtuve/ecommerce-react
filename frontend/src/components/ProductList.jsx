import { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import ProductCard from './ProductCard';
import SkeletonCard from './SkeletonCard';
import { fetchProducts } from '../services/api';
import 'swiper/css';
import './ProductList.css';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (err) {
                console.error("Failed to fetch products:", err);
                setError("Failed to load products. Is backend running?");
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    if (loading) {
        return (
            <div className="product-list-wrapper">
                <Swiper
                    spaceBetween={40}
                    slidesPerView={'auto'}
                    className="product-swiper"
                >
                    {[...Array(5)].map((_, index) => (
                        <SwiperSlide key={index} style={{ width: '260px' }}>
                            <SkeletonCard />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        );
    }
    if (error) return <div>Error: {error}</div>;
    return (
        <div className="product-list-wrapper">
            <Swiper
                spaceBetween={40}
                slidesPerView={'auto'}
                modules={[Autoplay]}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                loop={true}
                className="product-swiper"
            >
                {products.map(product => (
                    <SwiperSlide key={product.id} style={{ width: '260px' }}>
                        <ProductCard product={product} />
                    </SwiperSlide>
                ))}

            </Swiper>
        </div>
    );
}
