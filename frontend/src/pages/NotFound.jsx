import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-crema-50 to-rosa-50 relative overflow-hidden">
            {/* Video de fondo - Hero fullscreen */}
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="w-full h-full flex items-center justify-center"
                >
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-contain max-h-[85vh]"
                    >
                        <source src="/404.mp4" type="video/mp4" />
                    </video>
                </motion.div>
            </div>

            {/* Overlay con contenido - Botones sobre el video */}
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-end pb-12 px-4">
                {/* Botones flotantes con glassmorphism */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 mb-6"
                >
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-rosa-500 to-rosa-400 text-white rounded-full font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                    >
                        <Home size={20} />
                        Volver al Inicio
                    </Link>
                    <Link
                        to="/catalogo"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/90 backdrop-blur-sm border-2 border-rosa-500 text-rosa-500 rounded-full font-semibold shadow-lg hover:bg-white hover:shadow-xl transition-all"
                    >
                        <Search size={20} />
                        Explorar Catálogo
                    </Link>
                </motion.div>

                {/* Link volver */}
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    onClick={() => window.history.back()}
                    className="inline-flex items-center text-chocolate-500 hover:text-rosa-500 transition-colors bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full"
                >
                    <ArrowLeft size={18} className="mr-2" />
                    Volver a la página anterior
                </motion.button>
            </div>
        </div>
    );
}
