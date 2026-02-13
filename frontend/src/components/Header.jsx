import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Header.css';

export default function Header() {
    const { cartCount, toggleCart } = useCart();

    return (
        <header className="header">
            <div className="header-spacer"></div>

            <div className="header-logo">
                LOGO
            </div>

            <div className="header-actions">
                <button
                    onClick={toggleCart}
                    className="cart-button"
                >
                    <ShoppingCart size={20} />
                    {cartCount > 0 && (
                        <span className="cart-badge">
                            {cartCount}
                        </span>
                    )}
                </button>
            </div>
        </header>
    );
}
