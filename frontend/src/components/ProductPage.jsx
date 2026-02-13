import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import { useCart } from '../context/CartContext';
import { ChevronLeft, Star } from 'lucide-react';
import './ProductPage.css';

export default function ProductPage() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                // Ideally fetchData for single product, but for now reuse list fetch or implement getProduct
                const allProducts = await fetchProducts();
                const found = allProducts.find(p => p.id === parseInt(id));
                if (found) {
                    setProduct(found);
                    setQuantity(1);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [id]);

    const handleIncrement = () => setQuantity(prev => prev + 1);
    const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    if (!product) {
        return <div className="product-page-container">Loading...</div>;
    }

    return (
        <div className="product-page-container">
            <Link to="/" className="back-link">
                <span className="back-icon"><ChevronLeft size={16} /></span>
                Go back
            </Link>

            <div className="product-detail-wrapper">
                <div className="product-detail-image-container">
                    <img src={product.image} alt={product.name} className="product-detail-image" />
                </div>

                <div className="product-detail-info">
                    <h1 className="product-detail-title">{product.name}</h1>

                    <div className="product-detail-rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} size={20} fill="#fca903" stroke="none" />
                        ))}
                    </div>

                    <div className="product-detail-price">
                        ${parseFloat(product.price).toFixed(2)}
                    </div>

                    <div className="product-detail-actions">
                        <div className="detail-quantity-selector">
                            <div className="detail-qty-value">{quantity}</div>
                            <button onClick={handleDecrement} className="detail-qty-btn">-</button>
                            <button onClick={handleIncrement} className="detail-qty-btn">+</button>
                        </div>

                        <button
                            className="detail-add-btn"
                            onClick={() => addToCart(product, quantity)}
                        >
                            add to card
                        </button>
                    </div>

                    <div className="about-section">
                        <h3 className="about-title">About this product</h3>
                        <p className="about-text">
                            {product.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
