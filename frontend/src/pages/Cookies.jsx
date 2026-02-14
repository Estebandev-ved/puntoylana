import { Link } from 'react-router-dom';
import { ArrowLeft, Cookie, Settings, BarChart3, Shield, ToggleLeft, ToggleRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Cookies() {
    const [preferences, setPreferences] = useState({
        essential: true,
        analytics: true,
        marketing: false
    });

    const cookieTypes = [
        {
            id: 'essential',
            icon: Shield,
            title: "Cookies Esenciales",
            description: "Necesarias para el funcionamiento básico del sitio. No pueden desactivarse.",
            examples: ["Sesión de usuario", "Carrito de compras", "Preferencias de idioma"],
            required: true
        },
        {
            id: 'analytics',
            icon: BarChart3,
            title: "Cookies de Análisis",
            description: "Nos ayudan a entender cómo los visitantes interactúan con el sitio.",
            examples: ["Google Analytics", "Páginas más visitadas", "Tiempo de permanencia"],
            required: false
        },
        {
            id: 'marketing',
            icon: Cookie,
            title: "Cookies de Marketing",
            description: "Usadas para mostrar anuncios relevantes y medir campañas publicitarias.",
            examples: ["Facebook Pixel", "Google Ads", "Remarketing"],
            required: false
        }
    ];

    const handleToggle = (type) => {
        if (type === 'essential') return; // No se puede desactivar
        setPreferences(prev => ({
            ...prev,
            [type]: !prev[type]
        }));
    };

    const handleSavePreferences = () => {
        // Guardar en localStorage
        localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
        // Mostrar confirmación
        alert('✅ Preferencias de cookies guardadas');
    };

    const handleAcceptAll = () => {
        const allAccepted = { essential: true, analytics: true, marketing: true };
        setPreferences(allAccepted);
        localStorage.setItem('cookiePreferences', JSON.stringify(allAccepted));
        alert('✅ Todas las cookies aceptadas');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-crema-50 to-rosa-50 py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <Link to="/" className="inline-flex items-center text-rosa-500 hover:text-rosa-600 mb-6 transition-colors">
                        <ArrowLeft size={20} className="mr-2" />
                        Volver al inicio
                    </Link>
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl mb-6">
                        <Cookie className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="font-display text-4xl font-bold gradient-text mb-4">
                        Política de Cookies
                    </h1>
                    <p className="text-chocolate-400 max-w-2xl mx-auto">
                        Usamos cookies para mejorar tu experiencia. Aquí puedes conocer más y gestionar tus preferencias.
                    </p>
                </motion.div>

                {/* ¿Qué son las cookies? */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl p-8 shadow-soft mb-8"
                >
                    <h2 className="font-display text-2xl font-semibold text-chocolate-600 mb-4">
                        🍪 ¿Qué son las cookies?
                    </h2>
                    <p className="text-chocolate-400 leading-relaxed">
                        Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web.
                        Nos permiten recordar tus preferencias, mantener tu sesión activa y entender cómo usas nuestro sitio
                        para poder mejorarlo continuamente.
                    </p>
                </motion.div>

                {/* Cookie Types */}
                <div className="space-y-6 mb-8">
                    {cookieTypes.map((cookie, index) => (
                        <motion.div
                            key={cookie.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            className="bg-white rounded-2xl p-6 shadow-soft"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-4 flex-1">
                                    <div className={`p-3 rounded-xl ${cookie.id === 'essential' ? 'bg-green-100' :
                                            cookie.id === 'analytics' ? 'bg-blue-100' : 'bg-orange-100'
                                        }`}>
                                        <cookie.icon className={`w-6 h-6 ${cookie.id === 'essential' ? 'text-green-600' :
                                                cookie.id === 'analytics' ? 'text-blue-600' : 'text-orange-600'
                                            }`} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="font-display text-lg font-semibold text-chocolate-600">
                                                {cookie.title}
                                            </h3>
                                            {cookie.required && (
                                                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                                                    Requeridas
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-chocolate-400 mb-3">
                                            {cookie.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {cookie.examples.map((example, i) => (
                                                <span key={i} className="px-3 py-1 bg-crema-100 text-chocolate-500 text-sm rounded-full">
                                                    {example}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleToggle(cookie.id)}
                                    disabled={cookie.required}
                                    className={`ml-4 transition-colors ${cookie.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                >
                                    {preferences[cookie.id] ? (
                                        <ToggleRight className="w-10 h-10 text-rosa-500" />
                                    ) : (
                                        <ToggleLeft className="w-10 h-10 text-gray-300" />
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <button
                        onClick={handleSavePreferences}
                        className="px-8 py-3 bg-white border-2 border-rosa-500 text-rosa-500 rounded-full font-semibold hover:bg-rosa-50 transition-colors flex items-center justify-center gap-2"
                    >
                        <Settings size={20} />
                        Guardar Preferencias
                    </button>
                    <button
                        onClick={handleAcceptAll}
                        className="px-8 py-3 bg-gradient-to-r from-rosa-500 to-rosa-400 text-white rounded-full font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                        <Cookie size={20} />
                        Aceptar Todas
                    </button>
                </motion.div>

                {/* How to manage */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-12 bg-crema-100 rounded-2xl p-8"
                >
                    <h3 className="font-display text-xl font-semibold text-chocolate-600 mb-4 flex items-center gap-2">
                        <Settings size={24} />
                        Cómo gestionar cookies en tu navegador
                    </h3>
                    <p className="text-chocolate-400 mb-4">
                        También puedes controlar las cookies desde la configuración de tu navegador:
                    </p>
                    <ul className="space-y-2 text-chocolate-500">
                        <li>• <strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
                        <li>• <strong>Firefox:</strong> Opciones → Privacidad & Seguridad → Cookies</li>
                        <li>• <strong>Safari:</strong> Preferencias → Privacidad → Gestionar datos</li>
                        <li>• <strong>Edge:</strong> Configuración → Cookies y permisos del sitio</li>
                    </ul>
                </motion.div>

                {/* Footer */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-center text-chocolate-400 text-sm mt-8"
                >
                    ¿Tienes preguntas? <Link to="/contacto" className="text-rosa-500 hover:underline">Contáctanos</Link>
                </motion.p>
            </div>
        </div>
    );
}
