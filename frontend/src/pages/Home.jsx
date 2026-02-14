import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Truck, HeartHandshake, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { productService } from '../services/api';

const categories = [
    { name: 'Lanas', emoji: '🧶', color: 'from-rosa-400 to-rosa-500', cat: 'YARN' },
    { name: 'Patrones', emoji: '📝', color: 'from-lavanda-300 to-lavanda-400', cat: 'PATTERN' },
    { name: 'Kits', emoji: '📦', color: 'from-menta-300 to-menta-400', cat: 'KIT' },
    { name: 'Cursos', emoji: '🎓', color: 'from-rosa-300 to-lavanda-300', cat: 'COURSE' },
];

const benefits = [
    { icon: Truck, title: 'Envío Gratis', desc: 'En compras mayores a $100.000' },
    { icon: Sparkles, title: 'Calidad Premium', desc: 'Materiales seleccionados' },
    { icon: HeartHandshake, title: 'Soporte', desc: 'Te ayudamos en tu proyecto' },
];

export default function Home() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Cargar productos destacados del backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.getAll();
                // Tomar los primeros 4 productos como destacados
                setFeaturedProducts(data.slice(0, 4));
            } catch (err) {
                console.error('Error cargando productos:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-24 pb-20 overflow-hidden">
                {/* Yarn decorations */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
                        transition={{ duration: 6, repeat: Infinity }}
                        className="absolute top-20 left-10 text-6xl opacity-30"
                    >
                        🧶
                    </motion.div>
                    <motion.div
                        animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
                        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                        className="absolute top-40 right-20 text-5xl opacity-20"
                    >
                        🪡
                    </motion.div>
                    <motion.div
                        animate={{ y: [-5, 15, -5] }}
                        transition={{ duration: 7, repeat: Infinity, delay: 2 }}
                        className="absolute bottom-20 left-1/4 text-4xl opacity-25"
                    >
                        💖
                    </motion.div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Text */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-block bg-rosa-100 text-rosa-500 font-medium px-4 py-2 rounded-full text-sm mb-6">
                                ✨ Bienvenida a tu tienda favorita
                            </span>
                            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-chocolate-600 leading-tight mb-6">
                                Tejiendo{' '}
                                <span className="gradient-text">sueños</span>,{' '}
                                creando{' '}
                                <span className="text-rosa-500">sonrisas</span>
                            </h1>
                            <p className="text-chocolate-400 text-lg mb-8 max-w-md">
                                Encuentra todo lo que necesitas para tus proyectos de crochet y amigurumis.
                                Lanas, patrones, kits y mucho más.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link to="/catalogo" className="btn-primary flex items-center gap-2">
                                    Ver catálogo
                                    <ArrowRight size={18} />
                                </Link>
                                <Link to="/cursos" className="btn-secondary">
                                    Aprende con nosotros
                                </Link>
                            </div>
                        </motion.div>

                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-rosa-200/50">
                                <img
                                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600"
                                    alt="Materiales de crochet"
                                    className="w-full aspect-square object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-rosa-500/20 to-transparent" />
                            </div>

                            {/* Floating card */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3"
                            >
                                <div className="w-12 h-12 bg-menta-300 rounded-full flex items-center justify-center text-white text-xl">
                                    🧸
                                </div>
                                <div>
                                    <p className="font-semibold text-chocolate-600">+500</p>
                                    <p className="text-sm text-chocolate-400">Clientes felices</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={benefit.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-4 p-6 rounded-2xl bg-crema-50 hover:bg-rosa-50 transition-colors"
                            >
                                <div className="w-14 h-14 bg-rosa-100 rounded-2xl flex items-center justify-center text-rosa-500">
                                    <benefit.icon size={28} />
                                </div>
                                <div>
                                    <h3 className="font-display font-semibold text-chocolate-600">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-sm text-chocolate-400">{benefit.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-chocolate-600 mb-4">
                            Explora nuestras categorías
                        </h2>
                        <p className="text-chocolate-400 max-w-md mx-auto">
                            Todo lo que necesitas para dar vida a tus creaciones
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {categories.map((cat, index) => (
                            <motion.div
                                key={cat.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Link
                                    to={`/catalogo?cat=${cat.cat}`}
                                    className="block group"
                                >
                                    <div className={`bg-gradient-to-br ${cat.color} rounded-2xl p-6 text-center text-white transition-transform group-hover:scale-105 group-hover:shadow-xl`}>
                                        <span className="text-4xl mb-3 block">{cat.emoji}</span>
                                        <h3 className="font-display font-semibold text-lg">
                                            {cat.name}
                                        </h3>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-chocolate-600 mb-2">
                                Productos destacados
                            </h2>
                            <p className="text-chocolate-400">Lo más querido por nuestra comunidad</p>
                        </div>
                        <Link
                            to="/catalogo"
                            className="hidden md:flex items-center gap-2 text-rosa-500 font-medium hover:text-rosa-400 transition-colors"
                        >
                            Ver todo
                            <ArrowRight size={18} />
                        </Link>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="w-10 h-10 text-rosa-500 animate-spin" />
                        </div>
                    ) : featuredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {featuredProducts.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <ProductCard product={product} />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-chocolate-400 py-8">
                            Próximamente agregaremos productos destacados
                        </p>
                    )}

                    <div className="mt-8 text-center md:hidden">
                        <Link to="/catalogo" className="btn-primary inline-flex items-center gap-2">
                            Ver todo el catálogo
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-rosa-400 to-lavanda-300">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                            ¿Lista para empezar a tejer?
                        </h2>
                        <p className="text-white/90 text-lg mb-8 max-w-md mx-auto">
                            Únete a nuestra comunidad y recibe descuentos exclusivos en tu primera compra.
                        </p>
                        <Link
                            to="/registro"
                            className="inline-flex items-center gap-2 bg-white text-rosa-500 hover:bg-crema-100 font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all"
                        >
                            Crear cuenta gratis
                            <Sparkles size={18} />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
