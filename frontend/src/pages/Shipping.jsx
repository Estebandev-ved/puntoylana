import { motion } from 'framer-motion';
import { Truck, Clock, MapPin, Package, CreditCard } from 'lucide-react';

const shippingInfo = [
    {
        icon: Truck,
        title: 'Envío Nacional',
        details: [
            'Ciudades principales: 1-3 días hábiles',
            'Otras ciudades: 3-5 días hábiles',
            'Zonas rurales: 5-8 días hábiles',
        ],
    },
    {
        icon: CreditCard,
        title: 'Costo de Envío',
        details: [
            'Compras +$100.000: ¡GRATIS!',
            'Compras hasta $50.000: $12.000',
            'Compras $50.000-$100.000: $8.000',
        ],
    },
    {
        icon: Package,
        title: 'Seguimiento',
        details: [
            'Número de guía por email',
            'Rastreo en tiempo real',
            'Notificación de entrega',
        ],
    },
];

export default function Shipping() {
    return (
        <div className="min-h-screen pt-20 pb-16">
            {/* Hero */}
            <section className="bg-gradient-to-br from-menta-100 to-crema-100 py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Truck className="mx-auto text-menta-400 mb-4" size={48} />
                        <h1 className="font-display text-4xl font-bold text-chocolate-600 mb-4">
                            Información de Envíos
                        </h1>
                        <p className="text-lg text-chocolate-400">
                            Enviamos a todo Colombia con los mejores tiempos de entrega
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Info Grid */}
            <section className="py-16">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        {shippingInfo.map((info, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-2xl p-6 shadow-md"
                            >
                                <div className="w-12 h-12 bg-menta-100 rounded-full flex items-center justify-center mb-4">
                                    <info.icon className="text-menta-400" size={24} />
                                </div>
                                <h3 className="font-display text-xl font-bold text-chocolate-600 mb-4">
                                    {info.title}
                                </h3>
                                <ul className="space-y-2">
                                    {info.details.map((detail, j) => (
                                        <li key={j} className="text-chocolate-400 flex items-start gap-2">
                                            <span className="text-menta-400 mt-1">•</span>
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-16 bg-crema-50">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="font-display text-2xl font-bold text-chocolate-600 text-center mb-12">
                        Proceso de Envío
                    </h2>
                    <div className="space-y-6">
                        {[
                            { step: 1, title: 'Confirmación', desc: 'Recibes email de confirmación de tu pedido.' },
                            { step: 2, title: 'Preparación', desc: 'Empacamos tu pedido con mucho cuidado.' },
                            { step: 3, title: 'Despacho', desc: 'Entregamos el paquete a la transportadora.' },
                            { step: 4, title: 'En camino', desc: 'Tu pedido está viajando hacia ti. ¡Puedes rastrearlo!' },
                            { step: 5, title: 'Entregado', desc: '¡Llegó tu pedido! Disfruta tu compra.' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-4"
                            >
                                <div className="w-10 h-10 bg-rosa-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">
                                    {item.step}
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow-sm flex-1">
                                    <h4 className="font-semibold text-chocolate-600">{item.title}</h4>
                                    <p className="text-chocolate-400 text-sm">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
