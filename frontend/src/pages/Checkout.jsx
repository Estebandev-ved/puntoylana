import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, CreditCard, Smartphone, ChevronLeft, Lock, Check, Loader2, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const paymentMethods = [
    { id: 'card', name: 'Tarjeta de Crédito/Débito', icon: CreditCard },
    { id: 'nequi', name: 'Nequi', icon: Smartphone },
    { id: 'pse', name: 'PSE', icon: null, emoji: '🏦' },
];

export default function Checkout() {
    const navigate = useNavigate();
    const { items, subtotal, shipping, total, clearCart } = useCart();
    const { user, token } = useAuth();

    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [shippingData, setShippingData] = useState({
        name: user?.firstname || '',
        email: user?.email || '',
        phone: '',
        address: '',
        city: '',
        notes: '',
    });
    const [paymentMethod, setPaymentMethod] = useState('card');

    // Si el carrito está vacío, redirigir
    if (items.length === 0) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">🛒</div>
                    <h1 className="font-display text-3xl font-bold text-chocolate-600 mb-4">
                        Tu carrito está vacío
                    </h1>
                    <p className="text-chocolate-400 mb-8">
                        Agrega productos antes de continuar al checkout
                    </p>
                    <Link to="/catalogo" className="btn-primary">
                        Ver catálogo
                    </Link>
                </div>
            </div>
        );
    }

    const handleShippingChange = (e) => {
        setShippingData({ ...shippingData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (step === 1) {
            setStep(2);
            return;
        }

        // Procesar pedido
        setIsLoading(true);

        try {
            // Preparar items para el backend
            const orderItems = items.map(item => ({
                productId: item.id,
                quantity: item.quantity
            }));

            const response = await fetch('/api/v1/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    items: orderItems,
                    shippingAddress: `${shippingData.address}, ${shippingData.city}`,
                    shippingPhone: shippingData.phone,
                    notes: shippingData.notes,
                    paymentMethod: paymentMethod
                })
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'Error al procesar el pedido');
            }

            const order = await response.json();

            // Limpiar carrito
            clearCart();

            // TODO: Aquí irá la redirección a pasarela de pagos
            // Por ahora mostrar confirmación
            alert(`¡Pedido #${order.id} creado exitosamente! 🎉\n\nPronto integraremos la pasarela de pagos.`);
            navigate('/perfil');

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-20 pb-16 bg-crema-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        to="/carrito"
                        className="inline-flex items-center gap-2 text-chocolate-400 hover:text-rosa-500 mb-4 transition-colors"
                    >
                        <ChevronLeft size={18} />
                        Volver al carrito
                    </Link>
                    <h1 className="font-display text-3xl font-bold text-chocolate-600">
                        Finalizar Compra
                    </h1>
                </div>

                {/* Error Message */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3"
                    >
                        <AlertCircle size={20} />
                        <span>{error}</span>
                    </motion.div>
                )}

                {/* Steps */}
                <div className="flex items-center gap-4 mb-8">
                    {[1, 2].map((s) => (
                        <div key={s} className="flex items-center gap-2">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm
                  ${step >= s ? 'bg-rosa-500 text-white' : 'bg-crema-200 text-chocolate-400'}`}
                            >
                                {step > s ? <Check size={16} /> : s}
                            </div>
                            <span className={step >= s ? 'text-chocolate-600 font-medium' : 'text-chocolate-400'}>
                                {s === 1 ? 'Envío' : 'Pago'}
                            </span>
                            {s === 1 && <div className="w-12 h-0.5 bg-crema-200 mx-2" />}
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Form */}
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2"
                    >
                        <form onSubmit={handleSubmit}>
                            {step === 1 ? (
                                <div className="bg-white rounded-2xl p-6 shadow-md">
                                    <div className="flex items-center gap-3 mb-6">
                                        <MapPin className="text-rosa-500" size={24} />
                                        <h2 className="font-display text-xl font-bold text-chocolate-600">
                                            Datos de envío
                                        </h2>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-chocolate-600 mb-2">
                                                Nombre completo
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={shippingData.name}
                                                onChange={handleShippingChange}
                                                className="w-full px-4 py-3 bg-crema-50 rounded-xl border-2 border-transparent focus:border-rosa-300 focus:outline-none"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-chocolate-600 mb-2">
                                                Correo electrónico
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={shippingData.email}
                                                onChange={handleShippingChange}
                                                className="w-full px-4 py-3 bg-crema-50 rounded-xl border-2 border-transparent focus:border-rosa-300 focus:outline-none"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-chocolate-600 mb-2">
                                                Teléfono
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={shippingData.phone}
                                                onChange={handleShippingChange}
                                                className="w-full px-4 py-3 bg-crema-50 rounded-xl border-2 border-transparent focus:border-rosa-300 focus:outline-none"
                                                required
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-chocolate-600 mb-2">
                                                Dirección de envío
                                            </label>
                                            <input
                                                type="text"
                                                name="address"
                                                value={shippingData.address}
                                                onChange={handleShippingChange}
                                                placeholder="Calle, número, apto/casa"
                                                className="w-full px-4 py-3 bg-crema-50 rounded-xl border-2 border-transparent focus:border-rosa-300 focus:outline-none"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-chocolate-600 mb-2">
                                                Ciudad
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={shippingData.city}
                                                onChange={handleShippingChange}
                                                className="w-full px-4 py-3 bg-crema-50 rounded-xl border-2 border-transparent focus:border-rosa-300 focus:outline-none"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-chocolate-600 mb-2">
                                                Notas (opcional)
                                            </label>
                                            <input
                                                type="text"
                                                name="notes"
                                                value={shippingData.notes}
                                                onChange={handleShippingChange}
                                                placeholder="Instrucciones especiales"
                                                className="w-full px-4 py-3 bg-crema-50 rounded-xl border-2 border-transparent focus:border-rosa-300 focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white rounded-2xl p-6 shadow-md">
                                    <div className="flex items-center gap-3 mb-6">
                                        <CreditCard className="text-rosa-500" size={24} />
                                        <h2 className="font-display text-xl font-bold text-chocolate-600">
                                            Método de pago
                                        </h2>
                                    </div>

                                    <div className="space-y-3">
                                        {paymentMethods.map((method) => (
                                            <label
                                                key={method.id}
                                                className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all
                          ${paymentMethod === method.id
                                                        ? 'bg-rosa-50 border-2 border-rosa-500'
                                                        : 'bg-crema-50 border-2 border-transparent hover:border-rosa-200'
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value={method.id}
                                                    checked={paymentMethod === method.id}
                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                    className="hidden"
                                                />
                                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                                                    {method.icon ? (
                                                        <method.icon size={20} className="text-rosa-500" />
                                                    ) : (
                                                        <span className="text-xl">{method.emoji}</span>
                                                    )}
                                                </div>
                                                <span className="font-medium text-chocolate-600">{method.name}</span>
                                                {paymentMethod === method.id && (
                                                    <Check className="ml-auto text-rosa-500" size={20} />
                                                )}
                                            </label>
                                        ))}
                                    </div>

                                    <div className="mt-6 p-4 bg-amber-50 rounded-xl flex items-center gap-3 text-amber-700 text-sm">
                                        <AlertCircle size={16} />
                                        Pasarela de pagos en proceso de integración. El pedido se creará como "Pendiente de pago".
                                    </div>

                                    <div className="mt-4 p-4 bg-crema-50 rounded-xl flex items-center gap-3 text-chocolate-400 text-sm">
                                        <Lock size={16} className="text-menta-400" />
                                        Tus datos están protegidos con encriptación SSL
                                    </div>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="btn-primary w-full mt-6 flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Procesando...
                                    </>
                                ) : (
                                    step === 1 ? 'Continuar al pago' : 'Confirmar pedido'
                                )}
                            </button>
                        </form>
                    </motion.div>

                    {/* Order Summary - Usando datos reales del carrito */}
                    <div className="bg-white rounded-2xl p-6 shadow-md h-fit sticky top-24">
                        <h2 className="font-display text-xl font-bold text-chocolate-600 mb-6">
                            Tu pedido
                        </h2>

                        <div className="space-y-4 mb-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex justify-between text-sm">
                                    <span className="text-chocolate-500">
                                        {item.name} × {item.quantity}
                                    </span>
                                    <span className="font-medium text-chocolate-600">
                                        ${(item.price * item.quantity).toLocaleString('es-CO')}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-crema-200 pt-4 space-y-2">
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
                            <div className="flex justify-between pt-2 border-t border-crema-200">
                                <span className="font-semibold text-chocolate-600">Total</span>
                                <span className="text-xl font-bold text-rosa-500">
                                    ${total.toLocaleString('es-CO')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
