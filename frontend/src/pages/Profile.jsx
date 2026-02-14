import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Package, Heart, LogOut, Edit2, Save, Shield, ChevronRight, Truck, CheckCircle, Clock, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Profile() {
    const { user, token, logout } = useAuth();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [orders, setOrders] = useState([]);
    const [isLoadingOrders, setIsLoadingOrders] = useState(true);

    const [profileData, setProfileData] = useState({
        name: user?.firstname || user?.email?.split('@')[0] || 'Usuario',
        email: user?.email || 'usuario@email.com',
        phone: '',
        address: '',
    });

    // Verificar si es admin (del JWT decodificado)
    const isAdmin = user?.role === 'ROLE_ADMIN' || user?.role === 'ADMIN';

    // Cargar pedidos del usuario
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
                setIsLoadingOrders(false);
            }
        };

        fetchOrders();
    }, [token]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleSave = () => {
        // TODO: Guardar en backend
        setIsEditing(false);
    };

    // Estadísticas reales basadas en pedidos
    const stats = [
        { label: 'Pedidos', value: orders.length, icon: Package },
        { label: 'Favoritos', value: 0, icon: Heart },
    ];

    // Función para obtener el color/icono del estado
    const getStatusInfo = (status) => {
        switch (status?.toUpperCase()) {
            case 'PAID':
                return { color: 'text-menta-500 bg-menta-50', icon: CheckCircle, label: 'Pagado' };
            case 'SHIPPED':
                return { color: 'text-blue-500 bg-blue-50', icon: Truck, label: 'Enviado' };
            case 'DELIVERED':
                return { color: 'text-green-500 bg-green-50', icon: CheckCircle, label: 'Entregado' };
            default:
                return { color: 'text-amber-500 bg-amber-50', icon: Clock, label: 'Pendiente' };
        }
    };

    return (
        <div className="min-h-screen pt-20 pb-16 bg-crema-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {/* Admin Banner */}
                    {isAdmin && (
                        <Link
                            to="/admin"
                            className="block mb-6 bg-gradient-to-r from-rosa-500 to-lavanda-400 text-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Shield size={24} />
                                    <div>
                                        <p className="font-display font-bold text-lg">Panel de Administración</p>
                                        <p className="text-white/80 text-sm">Gestiona productos, usuarios y más</p>
                                    </div>
                                </div>
                                <span className="text-white font-medium">Entrar →</span>
                            </div>
                        </Link>
                    )}

                    {/* Header */}
                    <div className="bg-white rounded-3xl p-8 shadow-md mb-6">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            {/* Avatar */}
                            <div className="w-24 h-24 bg-gradient-to-br from-rosa-400 to-rosa-500 rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-4xl text-white font-bold">
                                    {profileData.name.charAt(0).toUpperCase()}
                                </span>
                            </div>

                            {/* Info */}
                            <div className="text-center md:text-left flex-1">
                                <div className="flex items-center justify-center md:justify-start gap-2">
                                    <h1 className="font-display text-3xl font-bold text-chocolate-600">
                                        {profileData.name}
                                    </h1>
                                    {isAdmin && (
                                        <span className="bg-rosa-100 text-rosa-500 text-xs font-bold px-2 py-1 rounded-full">
                                            ADMIN
                                        </span>
                                    )}
                                </div>
                                <p className="text-chocolate-400">{profileData.email}</p>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3">
                                <button
                                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                    className="flex items-center gap-2 bg-rosa-50 text-rosa-500 hover:bg-rosa-100 px-4 py-2 rounded-full font-medium transition-colors"
                                >
                                    {isEditing ? <Save size={18} /> : <Edit2 size={18} />}
                                    {isEditing ? 'Guardar' : 'Editar'}
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 bg-crema-100 text-chocolate-500 hover:bg-crema-200 px-4 py-2 rounded-full font-medium transition-colors"
                                >
                                    <LogOut size={18} />
                                    Salir
                                </button>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            {stats.map((stat, i) => (
                                <div key={i} className="bg-crema-50 rounded-2xl p-4 text-center">
                                    <stat.icon className="mx-auto text-rosa-500 mb-2" size={24} />
                                    <p className="text-2xl font-bold text-chocolate-600">{stat.value}</p>
                                    <p className="text-chocolate-400 text-sm">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mis Pedidos */}
                    <div className="bg-white rounded-3xl p-8 shadow-md mb-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-display text-xl font-bold text-chocolate-600">
                                Mis Pedidos
                            </h2>
                            {orders.length > 3 && (
                                <Link to="/historial" className="text-rosa-500 hover:text-rosa-400 text-sm font-medium">
                                    Ver todos →
                                </Link>
                            )}
                        </div>

                        {isLoadingOrders ? (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="animate-spin text-rosa-500" size={32} />
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="text-center py-8">
                                <Package className="mx-auto text-crema-300 mb-4" size={48} />
                                <p className="text-chocolate-400">Aún no tienes pedidos</p>
                                <Link to="/catalogo" className="text-rosa-500 hover:text-rosa-400 font-medium mt-2 inline-block">
                                    ¡Explora nuestro catálogo!
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders.slice(0, 3).map((order) => {
                                    const statusInfo = getStatusInfo(order.status);
                                    return (
                                        <div
                                            key={order.id}
                                            className="flex items-center justify-between p-4 bg-crema-50 rounded-xl hover:bg-crema-100 transition-colors"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`p-2 rounded-full ${statusInfo.color}`}>
                                                    <statusInfo.icon size={20} />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-chocolate-600">
                                                        Pedido #{order.id}
                                                    </p>
                                                    <p className="text-sm text-chocolate-400">
                                                        {new Date(order.date).toLocaleDateString('es-CO', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-rosa-500">
                                                    ${order.totalAmount?.toLocaleString('es-CO')}
                                                </p>
                                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusInfo.color}`}>
                                                    {statusInfo.label}
                                                </span>
                                            </div>
                                            {order.trackingUrl && (
                                                <a
                                                    href={order.trackingUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="ml-4 text-blue-500 hover:text-blue-600"
                                                    title="Rastrear envío"
                                                >
                                                    <Truck size={20} />
                                                </a>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Profile Form */}
                    <div className="bg-white rounded-3xl p-8 shadow-md">
                        <h2 className="font-display text-xl font-bold text-chocolate-600 mb-6">
                            Información Personal
                        </h2>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-chocolate-600 mb-2">
                                    <User size={16} className="inline mr-2" />
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    value={profileData.name}
                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-3 bg-crema-50 rounded-xl border-2 border-transparent focus:border-rosa-300 focus:outline-none disabled:opacity-60"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-chocolate-600 mb-2">
                                    <Mail size={16} className="inline mr-2" />
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={profileData.email}
                                    disabled
                                    className="w-full px-4 py-3 bg-crema-50 rounded-xl opacity-60"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-chocolate-600 mb-2">
                                    <Phone size={16} className="inline mr-2" />
                                    Teléfono
                                </label>
                                <input
                                    type="tel"
                                    value={profileData.phone}
                                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                    disabled={!isEditing}
                                    placeholder="Tu teléfono"
                                    className="w-full px-4 py-3 bg-crema-50 rounded-xl border-2 border-transparent focus:border-rosa-300 focus:outline-none disabled:opacity-60"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-chocolate-600 mb-2">
                                    <MapPin size={16} className="inline mr-2" />
                                    Dirección
                                </label>
                                <input
                                    type="text"
                                    value={profileData.address}
                                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                                    disabled={!isEditing}
                                    placeholder="Tu dirección"
                                    className="w-full px-4 py-3 bg-crema-50 rounded-xl border-2 border-transparent focus:border-rosa-300 focus:outline-none disabled:opacity-60"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
