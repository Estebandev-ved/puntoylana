import { motion } from 'framer-motion';
import { Play, Clock, Star, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const courses = [
    {
        id: 1,
        title: 'Amigurumi para Principiantes',
        description: 'Aprende las técnicas básicas para crear adorables muñecos de crochet.',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        duration: '2h 30min',
        lessons: 12,
        level: 'Principiante',
        isFree: true,
    },
    {
        id: 2,
        title: 'Puntos Avanzados de Crochet',
        description: 'Domina los puntos más elaborados y crea piezas únicas.',
        image: 'https://images.unsplash.com/photo-1582131503261-fca1d1c0589f?w=400',
        duration: '4h 15min',
        lessons: 18,
        level: 'Avanzado',
        isFree: false,
    },
    {
        id: 3,
        title: 'Tejido de Mantas y Cobijas',
        description: 'Crea mantas acogedoras con técnicas tradicionales y modernas.',
        image: 'https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=400',
        duration: '3h 00min',
        lessons: 15,
        level: 'Intermedio',
        isFree: false,
    },
];

export default function Courses() {
    const { isAuthenticated } = useAuth();

    return (
        <div className="min-h-screen pt-20 pb-16">
            {/* Hero */}
            <section className="bg-gradient-to-br from-lavanda-100 to-menta-100 py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="text-5xl mb-4 block">🎓</span>
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-chocolate-600 mb-4">
                            Aprende a Tejer
                        </h1>
                        <p className="text-lg text-chocolate-400 max-w-2xl mx-auto">
                            Cursos en video paso a paso para todos los niveles.
                            Desde principiante hasta experta.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Courses Grid */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map((course, i) => (
                            <motion.div
                                key={course.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-md group"
                            >
                                {/* Thumbnail */}
                                <div className="relative aspect-video bg-crema-100 overflow-hidden">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                                            <Play className="text-rosa-500 ml-1" size={28} fill="currentColor" />
                                        </div>
                                    </div>
                                    {/* Badge */}
                                    <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${course.isFree ? 'bg-menta-300 text-white' : 'bg-rosa-500 text-white'
                                        }`}>
                                        {course.isFree ? 'Gratis' : 'Premium'}
                                    </span>
                                </div>

                                {/* Info */}
                                <div className="p-5">
                                    <div className="flex items-center gap-3 text-sm text-chocolate-400 mb-3">
                                        <span className="flex items-center gap-1">
                                            <Clock size={14} />
                                            {course.duration}
                                        </span>
                                        <span>•</span>
                                        <span>{course.lessons} lecciones</span>
                                    </div>

                                    <h3 className="font-display text-lg font-bold text-chocolate-600 mb-2">
                                        {course.title}
                                    </h3>
                                    <p className="text-chocolate-400 text-sm mb-4 line-clamp-2">
                                        {course.description}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <span className="bg-crema-100 text-chocolate-500 text-xs font-medium px-3 py-1 rounded-full">
                                            {course.level}
                                        </span>

                                        {course.isFree || isAuthenticated ? (
                                            <button className="flex items-center gap-2 text-rosa-500 font-semibold hover:text-rosa-400">
                                                <Play size={16} />
                                                Ver curso
                                            </button>
                                        ) : (
                                            <Link to="/login" className="flex items-center gap-2 text-chocolate-400 hover:text-rosa-500">
                                                <Lock size={16} />
                                                Inicia sesión
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Coming Soon */}
            <section className="py-12 bg-crema-50">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="font-display text-2xl font-bold text-chocolate-600 mb-4">
                        ¡Más cursos próximamente!
                    </h2>
                    <p className="text-chocolate-400">
                        Estamos preparando nuevos contenidos para ti. ¡Mantente atenta!
                    </p>
                </div>
            </section>
        </div>
    );
}
