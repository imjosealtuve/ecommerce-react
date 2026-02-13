import { createContext, useContext, useState, useEffect } from 'react';
import { saveCart } from '../services/api';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (e) {
        console.error('Failed to parse cart from local storage', e);
      }
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Load from Backend on Mount
  useEffect(() => {
    const loadCart = async () => {
      try {
        const data = await import('../services/api').then(module => module.getCart());
        if (data && data.items && data.items.length > 0) {
          const backendItems = data.items.map(item => ({
            ...item.product_details,
            quantity: item.quantity
          }));
          setCartItems(backendItems);
          console.log("Loaded cart from backend:", backendItems);
        }
      } catch (error) {
        console.error("Failed to load cart from backend:", error);
      }
    };
    loadCart();
  }, []);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const value = {
    cartItems,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    toggleCart,
    cartTotal,
    cartCount,
    saveCartToBackend: async () => {
      try {
        await saveCart(cartItems);
        alert("Carrito guardado correctamente");
        // Keep items in local storage as requested ("Mantener... hasta que se guarde" implication 
        // usually means don't delete on success if they want to keep using it, 
        // but often "Save for later" implies moving it to a persistent list and clearing current.
        // User said: "Mantener el carrito en localStorage hasta que se guarde exitosamente"
        // This implies AFTER successful save we *could* clear it, but their wording is slightly ambiguous.
        // "dar un aviso... que el carrito se guardó". 
        // If I clear it, the cart becomes empty. If I don't, it stays. 
        // Usually "Save Cart" in this context (without a "Load Cart" feature visible yet) 
        // just means "Persist this state". I will NOT clear it for now to be safe, 
        // as the user didn't explicitly ask to "Clear cart after save".
      } catch (error) {
        console.error("Failed to save cart:", error);
        alert("Error al guardar el carrito");
      }
    }
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
