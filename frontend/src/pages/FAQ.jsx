import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
    {
        question: '¿Cuánto tarda en llegar mi pedido?',
        answer: 'Los envíos nacionales tardan entre 3-5 días hábiles. Para ciudades principales el envío puede ser más rápido (1-3 días). Recibirás un número de seguimiento por correo.',
    },
    {
        question: '¿Puedo devolver un producto?',
        answer: 'Sí, tienes 15 días para devolver cualquier producto sin usar y en su empaque original. Los productos digitales no son reembolsables una vez descargados.',
    },
    {
        question: '¿Qué métodos de pago aceptan?',
        answer: 'Aceptamos tarjetas de crédito/débito, Nequi, PSE y transferencias bancarias. Todos los pagos son procesados de forma segura.',
    },
    {
        question: '¿Ofrecen envío gratis?',
        answer: '¡Sí! Ofrecemos envío gratis en compras mayores a $100.000 COP a cualquier parte del país.',
    },
    {
        question: '¿Cómo accedo a los cursos en línea?',
        answer: 'Una vez registrada en nuestra tienda, podrás acceder a los cursos gratuitos. Los cursos premium estarán disponibles tras la compra.',
    },
    {
        question: '¿Venden al por mayor?',
        answer: 'Sí, tenemos precios especiales para compras al por mayor. Contáctanos para más información sobre descuentos por volumen.',
    },
    {
        question: '¿Qué pasa si mi pedido llega dañado?',
        answer: 'Si tu pedido llega dañado, contáctanos inmediatamente con fotos del producto. Te enviaremos un reemplazo sin costo adicional.',
    },
];

function FAQItem({ faq, isOpen, onClick }) {
    return (
        <div className="border-b border-crema-200 last:border-0">
            <button
                onClick={onClick}
                className="w-full py-5 flex items-center justify-between text-left"
            >
                <span className="font-medium text-chocolate-600 pr-4">{faq.question}</span>
                <ChevronDown
                    className={`text-rosa-500 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    size={20}
                />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-5 text-chocolate-400 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <div className="min-h-screen pt-20 pb-16">
            <div className="max-w-3xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <HelpCircle className="mx-auto text-rosa-500 mb-4" size={48} />
                    <h1 className="font-display text-4xl font-bold text-chocolate-600 mb-4">
                        Preguntas Frecuentes
                    </h1>
                    <p className="text-chocolate-400">
                        Encuentra respuestas a las preguntas más comunes
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-3xl p-6 md:p-8 shadow-md"
                >
                    {faqs.map((faq, i) => (
                        <FAQItem
                            key={i}
                            faq={faq}
                            isOpen={openIndex === i}
                            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                        />
                    ))}
                </motion.div>

                {/* Contact CTA */}
                <div className="text-center mt-12">
                    <p className="text-chocolate-400 mb-4">
                        ¿No encontraste lo que buscabas?
                    </p>
                    <a
                        href="/contacto"
                        className="btn-primary inline-flex items-center gap-2"
                    >
                        Contáctanos
                    </a>
                </div>
            </div>
        </div>
    );
}
