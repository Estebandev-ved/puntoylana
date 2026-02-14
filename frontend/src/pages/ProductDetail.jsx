import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Minus, Plus, ChevronLeft, Star, Truck, Shield, RotateCcw, Check, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { productService } from '../services/api';

const benefits = [
    { icon: Truck, text: 'Envío gratis +$100.000' },
    { icon: Shield, text: 'Garantía de calidad' },
    { icon: RotateCcw, text: 'Cambios gratis' },
];

export default function ProductDetail() {
    const { id } = useParams();
    const { addItem } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);

    // Cargar producto del backend
    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await productService.getById(id);
                setProduct(data);
                // Setear tamaño por defecto si existe
                if (data.sizes && data.sizes.length > 0) {
                    setSelectedSize(data.sizes[0]);
                }
            } catch (err) {
                console.error('Error cargando producto:', err);
                setError('Producto no encontrado');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;

        addItem({
            id: product.id,
            name: product.name,
            price: parseFloat(product.price) || 0,
            image: product.imageUrl || 'https://images.unsplash.com/photo-1582131503261-fca1d1c0589f?w=600',
            size: selectedSize,
        }, quantity);

        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen pt-20 pb-16 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-rosa-500 animate-spin mx-auto mb-4" />
                    <p className="text-chocolate-400">Cargando producto...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error || !product) {
        return (
            <div className="min-h-screen pt-20 pb-16 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">😕</div>
                    <h2 className="font-display text-2xl font-bold text-chocolate-600 mb-2">
                        {error || 'Producto no encontrado'}
                    </h2>
                    <Link to="/catalogo" className="btn-primary mt-4 inline-block">
                        Ver catálogo
                    </Link>
                </div>
            </div>
        );
    }

    // Crear array de imágenes (usar imageUrl del producto o placeholder)
    const images = product.imageUrl
        ? [product.imageUrl]
        : ['https://images.unsplash.com/photo-1582131503261-fca1d1c0589f?w=600'];

    const price = parseFloat(product.price) || 0;

    return (
        <div className="min-h-screen pt-20 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <Link
                    to="/catalogo"
                    className="inline-flex items-center gap-2 text-chocolate-400 hover:text-rosa-500 mb-6 transition-colors"
                >
                    <ChevronLeft size={18} />
                    Volver al catálogo
                </Link>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Gallery */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        {/* Main Image */}
                        <div className="relative aspect-square rounded-3xl overflow-hidden bg-crema-100 mb-4">
                            <motion.img
                                key={selectedImage}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                src={images[selectedImage]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                            {product.stock && product.stock < 5 && (
                                <span className="absolute top-4 left-4 bg-rosa-500 text-white text-sm font-bold px-4 py-2 rounded-full">
                                    ¡Últimos {product.stock}!
                                </span>
                            )}
                        </div>

                        {/* Thumbnails (si hay múltiples imágenes) */}
                        {images.length > 1 && (
                            <div className="flex gap-3">
                                {images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === index
                                                ? 'border-rosa-500 shadow-lg'
                                                : 'border-transparent opacity-70 hover:opacity-100'
                                            }`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col"
                    >
                        {product.category && (
                            <span className="text-rosa-500 font-medium mb-2">{product.category}</span>
                        )}
                        <h1 className="font-display text-3xl md:text-4xl font-bold text-chocolate-600 mb-4">
                            {product.name}
                        </h1>

                        {/* Rating (placeholder) */}
                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex items-center gap-1 text-yellow-500">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        fill={i < 4 ? 'currentColor' : 'none'}
                                    />
                                ))}
                            </div>
                            <span className="font-semibold text-chocolate-600">4.5</span>
                            <span className="text-chocolate-400">(Sin reseñas aún)</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-3 mb-6">
                            <span className="text-3xl font-bold text-rosa-500">
                                ${price.toLocaleString('es-CO')}
                            </span>
                        </div>

                        {/* Description */}
                        <p className="text-chocolate-400 mb-6 leading-relaxed">
                            {product.description || 'Producto de alta calidad para tus proyectos de crochet.'}
                        </p>

                        {/* Stock */}
                        {product.stock !== null && product.stock !== undefined && (
                            <p className={`mb-4 font-medium ${product.stock > 0 ? 'text-menta-400' : 'text-red-500'}`}>
                                {product.stock > 0 ? `✓ ${product.stock} disponibles` : '✗ Agotado'}
                            </p>
                        )}

                        {/* Quantity */}
                        <div className="mb-6">
                            <h3 className="font-semibold text-chocolate-600 mb-3">Cantidad</h3>
                            <div className="inline-flex items-center bg-crema-100 rounded-full">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="p-3 text-chocolate-400 hover:text-rosa-500 transition-colors"
                                >
                                    <Minus size={18} />
                                </button>
                                <span className="w-12 text-center font-semibold text-chocolate-600">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="p-3 text-chocolate-400 hover:text-rosa-500 transition-colors"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4 mb-8">
                            <motion.button
                                onClick={handleAddToCart}
                                disabled={addedToCart || (product.stock !== null && product.stock <= 0)}
                                whileTap={{ scale: 0.95 }}
                                className={`flex-1 flex items-center justify-center gap-2 font-semibold py-3 px-6 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed ${addedToCart
                                        ? 'bg-menta-300 text-white'
                                        : 'btn-primary'
                                    }`}
                            >
                                {addedToCart ? (
                                    <>
                                        <Check size={20} />
                                        ¡Agregado!
                                    </>
                                ) : (
                                    <>
                                        <ShoppingBag size={20} />
                                        Agregar al carrito
                                    </>
                                )}
                            </motion.button>
                            <button
                                onClick={() => setIsWishlisted(!isWishlisted)}
                                className={`p-4 rounded-full border-2 transition-all ${isWishlisted
                                        ? 'bg-rosa-500 border-rosa-500 text-white'
                                        : 'border-rosa-300 text-rosa-500 hover:bg-rosa-50'
                                    }`}
                            >
                                <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                            </button>
                        </div>

                        {/* Benefits */}
                        <div className="border-t border-crema-200 pt-6 space-y-3">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-center gap-3 text-chocolate-400">
                                    <benefit.icon size={20} className="text-menta-300" />
                                    <span>{benefit.text}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
