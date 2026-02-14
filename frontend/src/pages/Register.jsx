import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, Check, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const { register, isLoading, error } = useAuth();
    const navigate = useNavigate();

    const passwordRequirements = [
        { text: 'Mínimo 8 caracteres', met: formData.password.length >= 8 },
        { text: 'Una mayúscula', met: /[A-Z]/.test(formData.password) },
        { text: 'Un número', met: /[0-9]/.test(formData.password) },
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }
        const result = await register(formData.name, formData.email, formData.password);
        if (result.success) {
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen pt-20 pb-12 flex items-center justify-center px-4">
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
                        Únete a nosotros
                    </h1>
                    <p className="text-chocolate-400 mt-2">
                        Crea tu cuenta y empieza a tejer
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
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-chocolate-600 mb-2">
                                Nombre completo
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-chocolate-300" size={20} />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Tu nombre"
                                    className="w-full pl-12 pr-4 py-3 bg-crema-50 rounded-xl border-2 border-transparent focus:border-rosa-300 focus:outline-none transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-chocolate-600 mb-2">
                                Correo electrónico
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-chocolate-300" size={20} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
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
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
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
                            {/* Password Requirements */}
                            <div className="mt-2 space-y-1">
                                {passwordRequirements.map((req, i) => (
                                    <div
                                        key={i}
                                        className={`flex items-center gap-2 text-xs ${req.met ? 'text-menta-400' : 'text-chocolate-300'
                                            }`}
                                    >
                                        <Check size={14} />
                                        {req.text}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-chocolate-600 mb-2">
                                Confirmar contraseña
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-chocolate-300" size={20} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-3 bg-crema-50 rounded-xl border-2 border-transparent focus:border-rosa-300 focus:outline-none transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        {/* Terms */}
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={acceptTerms}
                                onChange={(e) => setAcceptTerms(e.target.checked)}
                                className="mt-1 w-4 h-4 rounded border-chocolate-300 text-rosa-500 focus:ring-rosa-300"
                            />
                            <span className="text-sm text-chocolate-400">
                                Acepto los{' '}
                                <a href="#" className="text-rosa-500 hover:text-rosa-400">
                                    Términos y Condiciones
                                </a>{' '}
                                y la{' '}
                                <a href="#" className="text-rosa-500 hover:text-rosa-400">
                                    Política de Privacidad
                                </a>
                            </span>
                        </label>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading || !acceptTerms}
                            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <span className="animate-spin">⏳</span>
                                    Creando cuenta...
                                </>
                            ) : (
                                'Crear cuenta'
                            )}
                        </button>
                    </form>

                    {/* Login Link */}
                    <p className="text-center mt-6 text-chocolate-400">
                        ¿Ya tienes cuenta?{' '}
                        <Link to="/login" className="text-rosa-500 font-semibold hover:text-rosa-400">
                            Inicia sesión
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
