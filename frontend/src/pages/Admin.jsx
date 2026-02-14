import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Users, Plus, Edit2, Trash2, Save, X, Loader2, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { adminService } from '../services/api';
import { Link } from 'react-router-dom';

const categoryOptions = ['YARN', 'KIT', 'PATTERN', 'COURSE', 'TOOL'];

export default function Admin() {
    const { user, isAuthenticated, isLoading: authLoading } = useAuth();
    const [products, setProducts] = useState([]);
    const [stats, setStats] = useState({ totalProducts: 0, totalUsers: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [accessDenied, setAccessDenied] = useState(false);

    // Form states
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        imageUrl: '',
        category: 'YARN',
    });

    // Cargar datos
    useEffect(() => {
        const loadData = async () => {
            // Esperar a que auth termine de cargar
            if (authLoading) return;

            // Si no está autenticado, mostrar error
            if (!isAuthenticated) {
                setLoading(false);
                setAccessDenied(true);
                return;
            }

            setLoading(true);
            setError(null);
            try {
                const [productsData, statsData] = await Promise.all([
                    adminService.getProducts(),
                    adminService.getStats()
                ]);
                setProducts(productsData);
                setStats(statsData);
                setAccessDenied(false);
            } catch (err) {
                console.error('Error:', err);
                if (err.response?.status === 403) {
                    setAccessDenied(true);
                } else {
                    setError('Error cargando datos');
                }
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [isAuthenticated, authLoading]);

    const handleSaveProduct = async () => {
        try {
            const productData = {
                ...formData,
                price: parseFloat(formData.price) || 0,
                stock: parseInt(formData.stock) || 0,
            };

            if (editingProduct) {
                await adminService.updateProduct(editingProduct.id, productData);
            } else {
                await adminService.createProduct(productData);
            }

            const updated = await adminService.getProducts();
            setProducts(updated);
            setShowForm(false);
            setEditingProduct(null);
            setFormData({ name: '', description: '', price: '', stock: '', imageUrl: '', category: 'YARN' });
        } catch (err) {
            console.error('Error guardando:', err);
            alert('Error guardando producto');
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name || '',
            description: product.description || '',
            price: product.price?.toString() || '',
            stock: product.stock?.toString() || '',
            imageUrl: product.imageUrl || '',
            category: product.category || 'YARN',
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('¿Eliminar este producto?')) return;
        try {
            await adminService.deleteProduct(id);
            setProducts(products.filter(p => p.id !== id));
        } catch (err) {
            console.error('Error eliminando:', err);
            alert('Error eliminando producto');
        }
    };

    // Loading state (incluye auth loading)
    if (loading || authLoading) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-rosa-500 animate-spin" />
            </div>
        );
    }

    // No autenticado o sin permisos
    if (accessDenied || !isAuthenticated) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center">
                <div className="text-center max-w-md p-8">
                    <Shield className="w-16 h-16 text-rosa-500 mx-auto mb-4" />
                    <h2 className="font-display text-2xl font-bold text-chocolate-600 mb-2">
                        Acceso Denegado
                    </h2>
                    <p className="text-chocolate-400 mb-6">
                        {!isAuthenticated
                            ? 'Necesitas iniciar sesión para acceder.'
                            : 'Necesitas rol de ADMIN para acceder a este panel.'}
                    </p>
                    <Link
                        to={isAuthenticated ? "/" : "/login"}
                        className="btn-primary"
                    >
                        {isAuthenticated ? 'Volver al inicio' : 'Iniciar sesión'}
                    </Link>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="font-display text-2xl font-bold text-chocolate-600">{error}</h2>
                    <button onClick={() => window.location.reload()} className="btn-primary mt-4">
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 pb-12 bg-crema-50">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="font-display text-3xl font-bold text-chocolate-600">
                        Panel de Administración
                    </h1>
                    <p className="text-chocolate-400">Gestiona productos y usuarios</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-2xl p-5 shadow-md">
                        <Package className="text-rosa-500 mb-2" size={24} />
                        <p className="text-2xl font-bold text-chocolate-600">{stats.totalProducts}</p>
                        <p className="text-sm text-chocolate-400">Productos</p>
                    </div>
                    <div className="bg-white rounded-2xl p-5 shadow-md">
                        <Users className="text-menta-400 mb-2" size={24} />
                        <p className="text-2xl font-bold text-chocolate-600">{stats.totalUsers}</p>
                        <p className="text-sm text-chocolate-400">Usuarios</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-display text-xl font-bold text-chocolate-600">Productos</h2>
                    <button
                        onClick={() => {
                            setEditingProduct(null);
                            setFormData({ name: '', description: '', price: '', stock: '', imageUrl: '', category: 'YARN' });
                            setShowForm(true);
                        }}
                        className="btn-primary flex items-center gap-2"
                    >
                        <Plus size={18} />
                        Nuevo Producto
                    </button>
                </div>

                {/* Product Form */}
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl p-6 shadow-md mb-6"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-display text-lg font-bold text-chocolate-600">
                                {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
                            </h3>
                            <button onClick={() => setShowForm(false)} className="text-chocolate-400 hover:text-chocolate-600">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Nombre del producto"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 bg-crema-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-rosa-300"
                            />
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-3 bg-crema-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-rosa-300"
                            >
                                {categoryOptions.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <input
                                type="number"
                                placeholder="Precio"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                className="w-full px-4 py-3 bg-crema-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-rosa-300"
                            />
                            <input
                                type="number"
                                placeholder="Stock"
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                className="w-full px-4 py-3 bg-crema-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-rosa-300"
                            />
                            <input
                                type="text"
                                placeholder="URL de imagen"
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                className="w-full px-4 py-3 bg-crema-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-rosa-300 md:col-span-2"
                            />
                            <textarea
                                placeholder="Descripción"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-3 bg-crema-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-rosa-300 md:col-span-2"
                            />
                        </div>

                        <button
                            onClick={handleSaveProduct}
                            className="mt-4 btn-primary flex items-center gap-2"
                        >
                            <Save size={18} />
                            {editingProduct ? 'Actualizar' : 'Crear'} Producto
                        </button>
                    </motion.div>
                )}

                {/* Products Table */}
                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-crema-100">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-chocolate-600">Producto</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-chocolate-600 hidden md:table-cell">Categoría</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-chocolate-600">Precio</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-chocolate-600 hidden md:table-cell">Stock</th>
                                <th className="px-4 py-3 text-right text-sm font-semibold text-chocolate-600">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-crema-100">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-crema-50">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={product.imageUrl || 'https://via.placeholder.com/40'}
                                                alt=""
                                                className="w-10 h-10 rounded-lg object-cover"
                                            />
                                            <span className="font-medium text-chocolate-600 line-clamp-1">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-chocolate-400 hidden md:table-cell">{product.category}</td>
                                    <td className="px-4 py-3 text-chocolate-600">${parseFloat(product.price || 0).toLocaleString('es-CO')}</td>
                                    <td className="px-4 py-3 text-chocolate-400 hidden md:table-cell">{product.stock ?? '∞'}</td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleEdit(product)}
                                                className="p-2 text-chocolate-400 hover:text-rosa-500"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="p-2 text-chocolate-400 hover:text-red-500"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {products.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-chocolate-400">
                                        No hay productos. ¡Crea el primero!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
