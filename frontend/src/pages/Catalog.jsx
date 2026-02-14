import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronDown, Loader2 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { productService } from '../services/api';

const categories = ['Todas', 'YARN', 'KIT', 'PATTERN', 'COURSE', 'TOOL'];
const categoryLabels = {
    'Todas': 'Todas',
    'YARN': 'Lanas',
    'KIT': 'Kits',
    'PATTERN': 'Patrones',
    'COURSE': 'Cursos',
    'TOOL': 'Herramientas',
};

const sortOptions = [
    { value: 'popular', label: 'Más populares' },
    { value: 'newest', label: 'Más recientes' },
    { value: 'price-asc', label: 'Precio: menor a mayor' },
    { value: 'price-desc', label: 'Precio: mayor a menor' },
];

export default function Catalog() {
    const [searchParams] = useSearchParams();
    const initialCategory = searchParams.get('cat') || 'Todas';

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(
        categories.find(c => c.toLowerCase() === initialCategory.toLowerCase()) || 'Todas'
    );
    const [sortBy, setSortBy] = useState('popular');
    const [priceRange, setPriceRange] = useState([0, 500000]);

    // Cargar productos del backend
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await productService.getAll();
                setProducts(data);
            } catch (err) {
                console.error('Error cargando productos:', err);
                setError('No se pudieron cargar los productos');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Filtrar y ordenar productos
    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Filtrar por búsqueda
        if (searchQuery) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filtrar por categoría
        if (selectedCategory !== 'Todas') {
            result = result.filter(p => p.category === selectedCategory);
        }

        // Filtrar por precio
        result = result.filter(p => {
            const price = parseFloat(p.price) || 0;
            return price >= priceRange[0] && price <= priceRange[1];
        });

        // Ordenar
        switch (sortBy) {
            case 'newest':
                result = result.filter(p => p.isNew).concat(result.filter(p => !p.isNew));
                break;
            case 'price-asc':
                result.sort((a, b) => (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0));
                break;
            case 'price-desc':
                result.sort((a, b) => (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0));
                break;
            default:
                break;
        }

        return result;
    }, [products, searchQuery, selectedCategory, sortBy, priceRange]);

    return (
        <div className="min-h-screen pt-20 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display text-4xl md:text-5xl font-bold text-chocolate-600 mb-4"
                    >
                        Nuestro Catálogo
                    </motion.h1>
                    <p className="text-chocolate-400 max-w-md mx-auto">
                        Descubre todo lo que necesitas para dar vida a tus proyectos de crochet
                    </p>
                </div>

                {/* Search and Filters Bar */}
                <div className="bg-white rounded-2xl shadow-md p-4 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-chocolate-300" size={20} />
                            <input
                                type="text"
                                placeholder="Buscar productos..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-crema-50 rounded-xl border-2 border-transparent focus:border-rosa-300 focus:outline-none transition-colors"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-chocolate-300 hover:text-chocolate-500"
                                >
                                    <X size={18} />
                                </button>
                            )}
                        </div>

                        {/* Sort */}
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="appearance-none bg-crema-50 rounded-xl px-4 py-3 pr-10 font-medium text-chocolate-500 focus:outline-none focus:ring-2 focus:ring-rosa-300 cursor-pointer"
                            >
                                {sortOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-chocolate-400 pointer-events-none" size={18} />
                        </div>
                    </div>

                    {/* Category Tabs */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${selectedCategory === cat
                                    ? 'bg-rosa-500 text-white shadow-md'
                                    : 'bg-crema-100 text-chocolate-500 hover:bg-rosa-100'
                                    }`}
                            >
                                {categoryLabels[cat] || cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-rosa-500 animate-spin mb-4" />
                        <p className="text-chocolate-400">Cargando productos...</p>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">😕</div>
                        <h3 className="font-display text-xl font-semibold text-chocolate-600 mb-2">
                            {error}
                        </h3>
                        <button
                            onClick={() => window.location.reload()}
                            className="btn-primary mt-4"
                        >
                            Reintentar
                        </button>
                    </div>
                )}

                {/* Results Count */}
                {!loading && !error && (
                    <div className="mb-6 flex items-center justify-between">
                        <p className="text-chocolate-400">
                            <span className="font-semibold text-chocolate-600">{filteredProducts.length}</span> productos encontrados
                        </p>
                    </div>
                )}

                {/* Products Grid */}
                {!loading && !error && (
                    <AnimatePresence mode="wait">
                        {filteredProducts.length > 0 ? (
                            <motion.div
                                key="products"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                            >
                                {filteredProducts.map((product, index) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <ProductCard product={product} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center py-16"
                            >
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="font-display text-xl font-semibold text-chocolate-600 mb-2">
                                    No encontramos productos
                                </h3>
                                <p className="text-chocolate-400 mb-6">
                                    Intenta con otra búsqueda o categoría
                                </p>
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setSelectedCategory('Todas');
                                    }}
                                    className="btn-primary"
                                >
                                    Ver todos los productos
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
}
