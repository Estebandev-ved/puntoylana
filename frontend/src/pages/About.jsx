import { motion } from 'framer-motion';
import { Heart, Users, Award, Sparkles } from 'lucide-react';

export default function About() {
    const values = [
        { icon: Heart, title: 'Pasión', description: 'Cada hilo que vendemos está seleccionado con amor y cuidado.' },
        { icon: Users, title: 'Comunidad', description: 'Somos más que una tienda, somos una familia de tejedoras.' },
        { icon: Award, title: 'Calidad', description: 'Solo trabajamos con los mejores materiales del mercado.' },
        { icon: Sparkles, title: 'Creatividad', description: 'Inspiramos a crear piezas únicas y especiales.' },
    ];

    return (
        <div className="min-h-screen pt-20 pb-16">
            {/* Hero */}
            <section className="relative bg-gradient-to-br from-rosa-100 to-lavanda-100 py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="text-5xl mb-4 block">🧶</span>
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-chocolate-600 mb-6">
                            Nuestra Historia
                        </h1>
                        <p className="text-lg text-chocolate-400 max-w-2xl mx-auto">
                            Punto y Lana nació del amor por el tejido artesanal y el deseo de compartir
                            esa pasión con todos los amantes de las manualidades.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Story */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-3xl p-8 md:p-12 shadow-md"
                    >
                        <h2 className="font-display text-2xl font-bold text-chocolate-600 mb-6">
                            ¿Cómo comenzamos?
                        </h2>
                        <div className="space-y-4 text-chocolate-400 leading-relaxed">
                            <p>
                                Todo comenzó en una pequeña habitación llena de madejas de colores.
                                Lo que empezó como un hobby se convirtió en una misión: llevar los
                                mejores materiales para tejido a cada hogar.
                            </p>
                            <p>
                                Hoy, después de años de trabajo y dedicación, nos enorgullece ser
                                la tienda de confianza de miles de tejedoras en todo el país. Cada
                                producto que ofrecemos ha sido cuidadosamente seleccionado pensando
                                en ti y en tus proyectos.
                            </p>
                            <p>
                                Creemos que tejer es más que un pasatiempo: es una forma de expresar
                                amor, crear recuerdos y conectar con nuestra esencia más creativa.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Values */}
            <section className="py-16 bg-crema-50">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="font-display text-3xl font-bold text-chocolate-600 text-center mb-12">
                        Nuestros Valores
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-2xl p-6 text-center shadow-md"
                            >
                                <div className="w-14 h-14 bg-rosa-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <value.icon className="text-rosa-500" size={24} />
                                </div>
                                <h3 className="font-display text-lg font-bold text-chocolate-600 mb-2">
                                    {value.title}
                                </h3>
                                <p className="text-chocolate-400 text-sm">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="font-display text-2xl font-bold text-chocolate-600 mb-4">
                        ¿Lista para empezar a tejer?
                    </h2>
                    <p className="text-chocolate-400 mb-8">
                        Explora nuestra colección y encuentra todo lo que necesitas.
                    </p>
                    <a
                        href="/catalogo"
                        className="btn-primary inline-flex items-center gap-2"
                    >
                        Ver Catálogo
                    </a>
                </div>
            </section>
        </div>
    );
}
