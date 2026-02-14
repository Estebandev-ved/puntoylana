import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, Heart, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ cartCount = 0 }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();

    const navLinks = [
        { name: 'Inicio', path: '/' },
        { name: 'Catálogo', path: '/catalogo' },
        { name: 'Nosotros', path: '/nosotros' },
    ];

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-rosa-400 to-rosa-500 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
                            <span className="text-white text-xl">🧶</span>
                        </div>
                        <span className="font-display text-xl font-bold gradient-text">
                            Punto y Lana
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`font-medium transition-colors relative ${isActive(link.path)
                                        ? 'text-rosa-500'
                                        : 'text-chocolate-500 hover:text-rosa-400'
                                    }`}
                            >
                                {link.name}
                                {isActive(link.path) && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-rosa-500 rounded-full"
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <button className="hidden md:flex text-chocolate-400 hover:text-rosa-500 transition-colors">
                            <Heart size={22} />
                        </button>

                        <Link
                            to="/carrito"
                            className="relative text-chocolate-400 hover:text-rosa-500 transition-colors"
                        >
                            <ShoppingBag size={22} />
                            {cartCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-2 -right-2 w-5 h-5 bg-rosa-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </Link>

                        {isAuthenticated ? (
                            <div className="hidden md:flex items-center gap-3">
                                <Link
                                    to="/perfil"
                                    className="flex items-center gap-2 text-chocolate-500 hover:text-rosa-500 transition-colors"
                                >
                                    <div className="w-8 h-8 bg-rosa-100 rounded-full flex items-center justify-center">
                                        <User size={16} className="text-rosa-500" />
                                    </div>
                                    <span className="font-medium text-sm">
                                        {user?.firstname || user?.email?.split('@')[0] || 'Mi cuenta'}
                                    </span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-chocolate-400 hover:text-rosa-500 transition-colors"
                                    title="Cerrar sesión"
                                >
                                    <LogOut size={18} />
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="hidden md:flex items-center gap-2 bg-rosa-50 text-rosa-500 hover:bg-rosa-100 px-4 py-2 rounded-full font-medium transition-colors"
                            >
                                <User size={18} />
                                <span>Entrar</span>
                            </Link>
                        )}

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden text-chocolate-500"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-rosa-100"
                    >
                        <div className="px-4 py-4 space-y-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`block py-2 font-medium ${isActive(link.path) ? 'text-rosa-500' : 'text-chocolate-500'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            {isAuthenticated ? (
                                <>
                                    <Link
                                        to="/perfil"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block py-2 text-chocolate-500 font-medium"
                                    >
                                        Mi Perfil
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="block py-2 text-rosa-500 font-medium"
                                    >
                                        Cerrar sesión
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block py-2 text-rosa-500 font-medium"
                                >
                                    Iniciar Sesión
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
