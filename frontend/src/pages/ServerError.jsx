import { Link } from 'react-router-dom';
import { Home, RefreshCcw, AlertTriangle, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ServerError() {
    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-crema-50 to-rosa-50 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center">
                {/* Icono animado */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <motion.div
                        animate={{
                            rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-red-400 to-orange-500 rounded-3xl shadow-xl"
                    >
                        <AlertTriangle className="w-16 h-16 text-white" />
                    </motion.div>
                </motion.div>

                {/* Código de error */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-6xl font-display font-bold text-red-500 mb-4"
                >
                    500
                </motion.div>

                {/* Mensaje */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h1 className="font-display text-3xl md:text-4xl font-bold text-chocolate-600 mb-4">
                        ¡Algo salió mal!
                    </h1>
                    <p className="text-chocolate-400 text-lg mb-8 max-w-md mx-auto">
                        Nuestros hilos se enredaron un poco. Estamos trabajando para
                        solucionar el problema. Por favor, intenta de nuevo en unos momentos.
                    </p>
                </motion.div>

                {/* Botones */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <button
                        onClick={handleRefresh}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-rosa-500 to-rosa-400 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all"
                    >
                        <RefreshCcw size={20} />
                        Intentar de nuevo
                    </button>
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-rosa-500 text-rosa-500 rounded-full font-semibold hover:bg-rosa-50 transition-all"
                    >
                        <Home size={20} />
                        Ir al Inicio
                    </Link>
                </motion.div>

                {/* Contacto */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mt-12 p-6 bg-white/50 rounded-2xl backdrop-blur-sm"
                >
                    <p className="text-chocolate-500 mb-4">
                        Si el problema persiste, contáctanos:
                    </p>
                    <a
                        href="mailto:soporte@puntoylana.com"
                        className="inline-flex items-center gap-2 text-rosa-500 hover:text-rosa-600 font-medium"
                    >
                        <Mail size={20} />
                        soporte@puntoylana.com
                    </a>
                </motion.div>

                {/* Información técnica (solo en desarrollo) */}
                {process.env.NODE_ENV === 'development' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-8 p-4 bg-gray-100 rounded-xl text-left text-sm text-gray-600 font-mono"
                    >
                        <p className="font-bold mb-2">Debug Info (solo desarrollo):</p>
                        <p>Timestamp: {new Date().toISOString()}</p>
                        <p>Path: {window.location.pathname}</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
