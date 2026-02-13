const API_URL = 'http://localhost:8000/api';

export const fetchProducts = async (category) => {
    let url = `${API_URL}/products/`;
    if (category) {
        url += `?category=${encodeURIComponent(category)}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return response.json();
};

export const saveCart = async (cartItems) => {
    const response = await fetch(`${API_URL}/cart/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            items: cartItems.map(item => ({
                product_id: item.id,
                quantity: item.quantity
            }))
        }),
    });
    if (!response.ok) {
        throw new Error('Failed to save cart');
    }
    return response.json();
};

export const getCart = async () => {
    const response = await fetch(`${API_URL}/cart/`);
    if (!response.ok) {
        throw new Error('Failed to fetch cart');
    }
    return response.json();
};
