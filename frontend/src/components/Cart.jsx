import { useState, useEffect } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Cart.css';

export default function Cart() {
    const {
        cartItems,
        isCartOpen,
        toggleCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        saveCartToBackend
    } = useCart();

    const [isClosing, setIsClosing] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (isCartOpen) {
            setShouldRender(true);
            setIsClosing(false);
        } else if (shouldRender) {
            setIsClosing(true);
            const timer = setTimeout(() => {
                setShouldRender(false);
                setIsClosing(false);
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [isCartOpen, shouldRender]);

    if (!shouldRender) return null;

    const shipping = 25.00;
    const total = cartTotal + (cartTotal > 0 ? shipping : 0);

    return (
        <>
            <div
                className={`cart-overlay ${isClosing ? 'closing' : ''}`}
                onClick={toggleCart}
            />
            <div className={`cart-sidebar ${isClosing ? 'closing' : ''}`}>
                <div className="cart-header">
                    <h2 className="cart-title">Your cart</h2>
                    <button onClick={toggleCart} className="close-btn">
                        <X size={24} />
                    </button>
                </div>

                <div className="cart-items">
                    {cartItems.length === 0 ? (
                        <p style={{ color: 'var(--gray)', textAlign: 'center', marginTop: '2rem' }}>Your cart is empty.</p>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <img
                                    src={item.image || "https://via.placeholder.com/80"}
                                    alt={item.name}
                                    className="cart-item-image"
                                />
                                <div className="cart-item-details">
                                    <h4 className="cart-item-name">{item.name}</h4>
                                    <div className="cart-item-actions">
                                        <div className="quantity-selector" style={{ padding: '0 0.5rem', height: '28px' }}>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="quantity-btn"
                                                style={{ fontSize: '14px' }}
                                            ><Minus size={14} /></button>
                                            <span className="quantity-value" style={{ fontSize: '14px' }}>{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="quantity-btn"
                                                style={{ fontSize: '14px' }}
                                            ><Plus size={14} /></button>
                                        </div>
                                    </div>
                                    <div className="cart-item-price">
                                        ${parseFloat(item.price).toFixed(2)}
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="icon-btn"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="cart-footer">
                        <div className="summary-row">
                            <span>Envío:</span>
                            <span>${shipping.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Subtotal:</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        <button className="pay-btn">Pay</button>
                        <button
                            onClick={saveCartToBackend}
                            className="save-cart-btn"
                        >
                            Save cart for later
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
