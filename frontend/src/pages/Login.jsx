import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login, isLoading, error } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(email, password);
        if (result.success) {
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen pt-20 flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-rosa-400 to-rosa-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <span className="text-3xl">🧶</span>
                    </div>
                    <h1 className="font-display text-3xl font-bold text-chocolate-600">
                        Bienvenida de vuelta
                    </h1>
                    <p className="text-chocolate-400 mt-2">
                        Inicia sesión en tu cuenta
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-3xl p-8 shadow-xl">
                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-600">
                            <AlertCircle size={20} />
                            <span className="text-sm">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-chocolate-600 mb-2">
                                Correo electrónico
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-chocolate-300" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="tu@correo.com"
                                    className="w-full pl-12 pr-4 py-3 bg-crema-50 rounded-xl border-2 border-transparent focus:border-rosa-300 focus:outline-none transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-chocolate-600 mb-2">
                                Contraseña
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-chocolate-300" size={20} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-12 py-3 bg-crema-50 rounded-xl border-2 border-transparent focus:border-rosa-300 focus:outline-none transition-colors"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-chocolate-300 hover:text-chocolate-500"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Forgot Password */}
                        <div className="text-right">
                            <a href="#" className="text-sm text-rosa-500 hover:text-rosa-400">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <span className="animate-spin">⏳</span>
                                    Iniciando...
                                </>
                            ) : (
                                'Iniciar sesión'
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-crema-200" />
                        <span className="text-chocolate-300 text-sm">o</span>
                        <div className="flex-1 h-px bg-crema-200" />
                    </div>

                    {/* Social Login */}
                    <button className="w-full flex items-center justify-center gap-3 bg-white border-2 border-crema-200 hover:border-rosa-200 py-3 px-4 rounded-xl font-medium text-chocolate-500 transition-colors">
                        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                        Continuar con Google
                    </button>

                    {/* Register Link */}
                    <p className="text-center mt-6 text-chocolate-400">
                        ¿No tienes cuenta?{' '}
                        <Link to="/registro" className="text-rosa-500 font-semibold hover:text-rosa-400">
                            Regístrate
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
