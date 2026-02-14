import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
    const { addItem } = useCart();
    const { id, name, price, image, category, isNew, imageUrl } = product;
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);

    // Usar imageUrl del backend o image como fallback
    const productImage = imageUrl || image || 'https://images.unsplash.com/photo-1582131503261-fca1d1c0589f?w=400';

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();

        addItem({
            id,
            name,
            price: typeof price === 'number' ? price : parseFloat(price),
            image: productImage,
            category,
        }, 1);

        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 1500);
    };

    const handleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsWishlisted(!isWishlisted);
        // TODO: Guardar favoritos en localStorage o backend
    };

    return (
        <Link to={`/producto/${id}`}>
            <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="card card-hover group cursor-pointer"
            >
                {/* Image Container */}
                <div className="relative overflow-hidden aspect-square bg-crema-100">
                    <img
                        src={productImage}
                        alt={name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {isNew && (
                            <span className="bg-menta-300 text-white text-xs font-bold px-3 py-1 rounded-full">
                                ¡Nuevo!
                            </span>
                        )}
                        {category && (
                            <span className="bg-white/90 text-chocolate-500 text-xs font-medium px-3 py-1 rounded-full">
                                {category}
                            </span>
                        )}
                    </div>

                    {/* Wishlist button */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleWishlist}
                        className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md opacity-0 group-hover:opacity-100 ${isWishlisted
                                ? 'bg-rosa-500 text-white'
                                : 'bg-white/90 text-chocolate-400 hover:text-rosa-500 hover:bg-white'
                            }`}
                    >
                        <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
                    </motion.button>

                    {/* Quick add button */}
                    <motion.button
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAddToCart}
                        disabled={addedToCart}
                        className={`absolute bottom-4 left-4 right-4 font-semibold py-3 rounded-full flex items-center justify-center gap-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 ${addedToCart
                                ? 'bg-menta-300 text-white'
                                : 'bg-rosa-500 hover:bg-rosa-400 text-white'
                            }`}
                    >
                        {addedToCart ? (
                            <>
                                <Check size={18} />
                                ¡Agregado!
                            </>
                        ) : (
                            <>
                                <ShoppingBag size={18} />
                                Agregar
                            </>
                        )}
                    </motion.button>
                </div>

                {/* Info */}
                <div className="p-4">
                    <h3 className="font-display text-lg font-semibold text-chocolate-600 mb-1 line-clamp-1">
                        {name}
                    </h3>
                    <p className="font-bold text-rosa-500 text-xl">
                        ${(typeof price === 'number' ? price : parseFloat(price) || 0).toLocaleString('es-CO')}
                    </p>
                </div>
            </motion.div>
        </Link>
    );
}
