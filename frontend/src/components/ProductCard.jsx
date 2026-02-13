import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => setQuantity(q => q + 1);
    const handleDecrement = () => setQuantity(q => Math.max(1, q - 1));

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setQuantity(1);
    };

    return (
        <div className="product-card">
            <Link to={`/product/${product.id}`} className="product-image-link">
                <img
                    src={product.image || "https://via.placeholder.com/300"}
                    alt={product.name}
                    className="product-image"
                />
            </Link>
            <div className="product-rating">★★★★★</div>
            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 className="product-title">{product.name}</h3>
            </Link>
            <div className="product-price">
                ${parseFloat(product.price).toFixed(2)}
            </div>

            <div className="product-actions">
                <div className="quantity-selector">
                    <span className="quantity-value">{quantity}</span>
                    <button onClick={handleDecrement} className="quantity-btn">-</button>
                    <button onClick={handleIncrement} className="quantity-btn">+</button>
                </div>

                <button onClick={handleAddToCart} className="add-to-cart-btn">
                    add to card
                </button>
            </div>
        </div>
    );
}
