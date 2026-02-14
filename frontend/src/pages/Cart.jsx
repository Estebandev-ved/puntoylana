import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
    const { items, updateQuantity, removeItem, subtotal, shipping, total } = useCart();

    if (items.length === 0) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">🛒</div>
                    <h1 className="font-display text-3xl font-bold text-chocolate-600 mb-4">
                        Tu carrito está vacío
                    </h1>
                    <p className="text-chocolate-400 mb-8">
                        ¡Explora nuestros productos y encuentra algo que te encante!
                    </p>
                    <Link to="/catalogo" className="btn-primary inline-flex items-center gap-2">
                        Ver catálogo
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-display text-3xl md:text-4xl font-bold text-chocolate-600 mb-8"
                >
                    Tu Carrito ({items.length})
                </motion.h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Items List */}
                    <div className="lg:col-span-2 space-y-4">
                        <AnimatePresence>
                            {items.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    className="bg-white rounded-2xl p-4 shadow-md flex gap-4"
                                >
                                    {/* Image */}
                                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-crema-100 flex-shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-display font-semibold text-chocolate-600">
                                                    {item.name}
                                                </h3>
                                                {item.size && (
                                                    <p className="text-sm text-chocolate-400">{item.size}</p>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-chocolate-300 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>

                                        <div className="mt-auto flex items-center justify-between">
                                            {/* Quantity */}
                                            <div className="flex items-center bg-crema-100 rounded-full">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-2 text-chocolate-400 hover:text-rosa-500 transition-colors"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="w-8 text-center font-semibold text-chocolate-600 text-sm">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-2 text-chocolate-400 hover:text-rosa-500 transition-colors"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>

                                            {/* Price */}
                                            <span className="font-bold text-rosa-500">
                                                ${(item.price * item.quantity).toLocaleString('es-CO')}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Summary */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-2xl p-6 shadow-md h-fit sticky top-24"
                    >
                        <h2 className="font-display text-xl font-bold text-chocolate-600 mb-6">
                            Resumen del pedido
                        </h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-chocolate-400">
                                <span>Subtotal</span>
                                <span>${subtotal.toLocaleString('es-CO')}</span>
                            </div>
                            <div className="flex justify-between text-chocolate-400">
                                <span>Envío</span>
                                <span className={shipping === 0 ? 'text-menta-400 font-medium' : ''}>
                                    {shipping === 0 ? '¡Gratis!' : `$${shipping.toLocaleString('es-CO')}`}
                                </span>
                            </div>
                            {shipping > 0 && (
                                <p className="text-xs text-chocolate-300 bg-crema-50 p-3 rounded-lg">
                                    💡 Agrega ${(100000 - subtotal).toLocaleString('es-CO')} más para envío gratis
                                </p>
                            )}
                            <div className="border-t border-crema-200 pt-4 flex justify-between">
                                <span className="font-semibold text-chocolate-600">Total</span>
                                <span className="text-xl font-bold text-rosa-500">
                                    ${total.toLocaleString('es-CO')}
                                </span>
                            </div>
                        </div>

                        <Link
                            to="/checkout"
                            className="btn-primary w-full flex items-center justify-center gap-2"
                        >
                            <ShoppingBag size={18} />
                            Proceder al pago
                        </Link>

                        <Link
                            to="/catalogo"
                            className="block text-center mt-4 text-rosa-500 hover:text-rosa-400 font-medium transition-colors"
                        >
                            Seguir comprando
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
