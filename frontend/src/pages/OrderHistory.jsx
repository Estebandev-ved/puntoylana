import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock, ChevronLeft, Loader2, ExternalLink, MapPin, CreditCard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function OrderHistory() {
    const { token } = useAuth();
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!token) return;

            try {
                const response = await fetch('/api/v1/orders', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                }
            } catch (error) {
                console.error('Error cargando pedidos:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [token]);

    const getStatusInfo = (status) => {
        switch (status?.toUpperCase()) {
            case 'PAID':
                return { color: 'text-menta-500 bg-menta-50 border-menta-200', icon: CheckCircle, label: 'Pagado', description: 'Pago confirmado' };
            case 'SHIPPED':
                return { color: 'text-blue-500 bg-blue-50 border-blue-200', icon: Truck, label: 'Enviado', description: 'En camino' };
            case 'DELIVERED':
                return { color: 'text-green-500 bg-green-50 border-green-200', icon: CheckCircle, label: 'Entregado', description: 'Completado' };
            default:
                return { color: 'text-amber-500 bg-amber-50 border-amber-200', icon: Clock, label: 'Pendiente', description: 'Esperando pago' };
        }
    };

    return (
        <div className="min-h-screen pt-20 pb-16 bg-crema-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        to="/perfil"
                        className="inline-flex items-center gap-2 text-chocolate-400 hover:text-rosa-500 mb-4 transition-colors"
                    >
                        <ChevronLeft size={18} />
                        Volver al perfil
                    </Link>
                    <h1 className="font-display text-3xl font-bold text-chocolate-600">
                        Historial de Pedidos
                    </h1>
                    <p className="text-chocolate-400 mt-2">
                        Todos tus pedidos en un solo lugar
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center py-16">
                        <Loader2 className="animate-spin text-rosa-500" size={40} />
                    </div>
                ) : orders.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-16 bg-white rounded-3xl shadow-md"
                    >
                        <Package className="mx-auto text-crema-300 mb-4" size={64} />
                        <h2 className="font-display text-2xl font-bold text-chocolate-600 mb-2">
                            Sin pedidos aún
                        </h2>
                        <p className="text-chocolate-400 mb-6">
                            Cuando realices tu primera compra, aparecerá aquí
                        </p>
                        <Link to="/catalogo" className="btn-primary inline-block">
                            Explorar catálogo
                        </Link>
                    </motion.div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order, index) => {
                            const statusInfo = getStatusInfo(order.status);
                            const isExpanded = selectedOrder === order.id;

                            return (
                                <motion.div
                                    key={order.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-2xl shadow-md overflow-hidden"
                                >
                                    {/* Order Header */}
                                    <button
                                        onClick={() => setSelectedOrder(isExpanded ? null : order.id)}
                                        className="w-full p-6 flex items-center justify-between hover:bg-crema-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-full ${statusInfo.color}`}>
                                                <statusInfo.icon size={24} />
                                            </div>
                                            <div className="text-left">
                                                <p className="font-display font-bold text-chocolate-600 text-lg">
                                                    Pedido #{order.id}
                                                </p>
                                                <p className="text-sm text-chocolate-400">
                                                    {new Date(order.date).toLocaleDateString('es-CO', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-rosa-500">
                                                ${order.totalAmount?.toLocaleString('es-CO')}
                                            </p>
                                            <span className={`text-sm font-medium px-3 py-1 rounded-full border ${statusInfo.color}`}>
                                                {statusInfo.label}
                                            </span>
                                        </div>
                                    </button>

                                    {/* Expanded Details */}
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            className="border-t border-crema-200 p-6 bg-crema-50"
                                        >
                                            {/* Status Description */}
                                            <div className="mb-6">
                                                <p className={`text-sm font-medium ${statusInfo.color.split(' ')[0]}`}>
                                                    Estado: {statusInfo.description}
                                                </p>
                                            </div>

                                            {/* Shipping Info */}
                                            {order.shippingAddress && (
                                                <div className="mb-4 flex items-start gap-3">
                                                    <MapPin size={18} className="text-chocolate-400 mt-0.5" />
                                                    <div>
                                                        <p className="font-medium text-chocolate-600">Dirección de envío</p>
                                                        <p className="text-chocolate-400 text-sm">{order.shippingAddress}</p>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Payment Method */}
                                            {order.paymentMethod && (
                                                <div className="mb-4 flex items-start gap-3">
                                                    <CreditCard size={18} className="text-chocolate-400 mt-0.5" />
                                                    <div>
                                                        <p className="font-medium text-chocolate-600">Método de pago</p>
                                                        <p className="text-chocolate-400 text-sm capitalize">{order.paymentMethod}</p>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Tracking */}
                                            {order.trackingNumber && (
                                                <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="font-medium text-blue-700">
                                                                {order.shippingCompany || 'Envío'} - Guía: {order.trackingNumber}
                                                            </p>
                                                            {order.shippedAt && (
                                                                <p className="text-sm text-blue-600">
                                                                    Despachado: {new Date(order.shippedAt).toLocaleDateString('es-CO')}
                                                                </p>
                                                            )}
                                                        </div>
                                                        {order.trackingUrl && (
                                                            <a
                                                                href={order.trackingUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors"
                                                            >
                                                                <Truck size={16} />
                                                                Rastrear
                                                                <ExternalLink size={14} />
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Order Items */}
                                            <div>
                                                <p className="font-medium text-chocolate-600 mb-3">Productos</p>
                                                <div className="space-y-2">
                                                    {order.items?.map((item, i) => (
                                                        <div key={i} className="flex justify-between items-center p-3 bg-white rounded-lg">
                                                            <div className="flex items-center gap-3">
                                                                {item.product?.imageUrl && (
                                                                    <img
                                                                        src={item.product.imageUrl}
                                                                        alt={item.product?.name}
                                                                        className="w-12 h-12 rounded-lg object-cover"
                                                                    />
                                                                )}
                                                                <div>
                                                                    <p className="font-medium text-chocolate-600">
                                                                        {item.product?.name || 'Producto'}
                                                                    </p>
                                                                    <p className="text-sm text-chocolate-400">
                                                                        Cantidad: {item.quantity}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <p className="font-bold text-rosa-500">
                                                                ${(item.price * item.quantity)?.toLocaleString('es-CO')}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Notes */}
                                            {order.notes && (
                                                <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                                                    <p className="text-sm text-amber-700">
                                                        <strong>Notas:</strong> {order.notes}
                                                    </p>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
