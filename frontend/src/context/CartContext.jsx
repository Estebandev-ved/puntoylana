import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

// Helper para guardar en localStorage
const saveCartToStorage = (items) => {
    localStorage.setItem('cart', JSON.stringify(items));
};

const loadCartFromStorage = () => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
};

export function CartProvider({ children }) {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Cargar carrito al iniciar
    useEffect(() => {
        const savedItems = loadCartFromStorage();
        setItems(savedItems);
        setIsLoading(false);
    }, []);

    // Guardar cambios en localStorage
    useEffect(() => {
        if (!isLoading) {
            saveCartToStorage(items);
        }
    }, [items, isLoading]);

    const addItem = (product, quantity = 1) => {
        setItems((current) => {
            const existingIndex = current.findIndex((item) => item.id === product.id);

            if (existingIndex >= 0) {
                // Ya existe, aumentar cantidad
                const updated = [...current];
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity: updated[existingIndex].quantity + quantity,
                };
                return updated;
            }

            // Nuevo item
            return [...current, { ...product, quantity }];
        });
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeItem(productId);
            return;
        }

        setItems((current) =>
            current.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const removeItem = (productId) => {
        setItems((current) => current.filter((item) => item.id !== productId));
    };

    const clearCart = () => {
        setItems([]);
    };

    // Cálculos
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal >= 100000 ? 0 : 12000; // Envío gratis sobre $100.000
    const total = subtotal + shipping;

    const value = {
        items,
        itemCount,
        subtotal,
        shipping,
        total,
        isLoading,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe usarse dentro de un CartProvider');
    }
    return context;
}
