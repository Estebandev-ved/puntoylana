import { Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Package, Clock, AlertCircle, CheckCircle, XCircle, HelpCircle, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Returns() {
    const policies = [
        {
            icon: Package,
            title: "Productos Físicos",
            items: [
                { icon: CheckCircle, text: "7 días para solicitar devolución", color: "green" },
                { icon: CheckCircle, text: "Producto sin usar y en empaque original", color: "green" },
                { icon: CheckCircle, text: "Reembolso completo o cambio por otro producto", color: "green" },
                { icon: XCircle, text: "No aplica para productos personalizados", color: "red" },
                { icon: AlertCircle, text: "Gastos de envío de devolución a cargo del cliente", color: "yellow" }
            ]
        },
        {
            icon: Clock,
            title: "Productos Digitales (Patrones, Cursos)",
            items: [
                { icon: AlertCircle, text: "No admiten devolución una vez descargados", color: "yellow" },
                { icon: CheckCircle, text: "Si el archivo está corrupto, lo reemplazamos gratuitamente", color: "green" },
                { icon: CheckCircle, text: "Soporte técnico para problemas de descarga", color: "green" },
                { icon: XCircle, text: "No se reembolsa por \"cambio de opinión\"", color: "red" }
            ]
        }
    ];

    const steps = [
        {
            number: 1,
            title: "Contacta con nosotros",
            description: "Envía un email a devoluciones@puntoylana.com con tu número de pedido y motivo de la devolución."
        },
        {
            number: 2,
            title: "Evaluación",
            description: "Revisaremos tu solicitud en un plazo de 24-48 horas hábiles y te enviaremos instrucciones."
        },
        {
            number: 3,
            title: "Envío del producto",
            description: "Si aplica, empaca el producto de forma segura y envíalo a la dirección que te proporcionemos."
        },
        {
            number: 4,
            title: "Reembolso",
            description: "Una vez recibido y verificado, procesaremos tu reembolso en 5-7 días hábiles al método de pago original."
        }
    ];

    const faqs = [
        {
            question: "¿Cuánto tiempo tengo para devolver un producto?",
            answer: "Tienes 7 días calendario desde la recepción del producto para solicitar una devolución de productos físicos."
        },
        {
            question: "¿Puedo devolver un patrón digital?",
            answer: "Los productos digitales no admiten devolución una vez descargados, debido a su naturaleza no recuperable. Sin embargo, si hay un error en el archivo, lo solucionamos inmediatamente."
        },
        {
            question: "¿Quién paga el envío de la devolución?",
            answer: "Si la devolución es por defecto del producto, nosotros cubrimos los gastos. Si es por otra razón (cambio de opinión, talla incorrecta), el cliente asume el costo del envío."
        },
        {
            question: "¿Cuánto tarda el reembolso?",
            answer: "Una vez recibido y verificado el producto, el reembolso se procesa en 5-7 días hábiles. El tiempo que tarde en reflejarse depende de tu banco."
        }
    ];

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
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rosa-400 to-rosa-500 rounded-2xl mb-6">
                        <RotateCcw className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="font-display text-4xl font-bold gradient-text mb-4">
                        Política de Devoluciones
                    </h1>
                    <p className="text-chocolate-400 max-w-2xl mx-auto">
                        Tu satisfacción es nuestra prioridad. Conoce nuestras políticas de devolución y reembolso.
                    </p>
                </motion.div>

                {/* Policies by Product Type */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {policies.map((policy, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + index * 0.1 }}
                            className="bg-white rounded-2xl p-6 shadow-soft"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-rosa-100 rounded-xl">
                                    <policy.icon className="w-6 h-6 text-rosa-500" />
                                </div>
                                <h2 className="font-display text-xl font-semibold text-chocolate-600">
                                    {policy.title}
                                </h2>
                            </div>
                            <ul className="space-y-3">
                                {policy.items.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <item.icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${item.color === 'green' ? 'text-green-500' :
                                                item.color === 'red' ? 'text-red-500' : 'text-amber-500'
                                            }`} />
                                        <span className="text-chocolate-400">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Process Steps */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl p-8 shadow-soft mb-12"
                >
                    <h2 className="font-display text-2xl font-semibold text-chocolate-600 mb-8 text-center">
                        📦 Proceso de Devolución
                    </h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {steps.map((step, index) => (
                            <div key={index} className="text-center">
                                <div className="w-12 h-12 bg-gradient-to-br from-rosa-400 to-rosa-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                                    {step.number}
                                </div>
                                <h3 className="font-semibold text-chocolate-600 mb-2">{step.title}</h3>
                                <p className="text-chocolate-400 text-sm">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* FAQs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-12"
                >
                    <h2 className="font-display text-2xl font-semibold text-chocolate-600 mb-6 text-center flex items-center justify-center gap-2">
                        <HelpCircle size={28} />
                        Preguntas Frecuentes
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-soft">
                                <h3 className="font-semibold text-chocolate-600 mb-2">{faq.question}</h3>
                                <p className="text-chocolate-400">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Contact CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gradient-to-r from-rosa-500 to-rosa-400 rounded-2xl p-8 text-center text-white"
                >
                    <Mail className="w-12 h-12 mx-auto mb-4 opacity-90" />
                    <h3 className="font-display text-2xl font-semibold mb-2">
                        ¿Necesitas hacer una devolución?
                    </h3>
                    <p className="mb-6 opacity-90">
                        Escríbenos y te ayudaremos con todo el proceso
                    </p>
                    <a
                        href="mailto:devoluciones@puntoylana.com"
                        className="inline-block px-8 py-3 bg-white text-rosa-500 rounded-full font-semibold hover:shadow-lg transition-all"
                    >
                        devoluciones@puntoylana.com
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
