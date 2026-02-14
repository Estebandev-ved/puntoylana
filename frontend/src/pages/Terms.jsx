import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Shield, Users, CreditCard, AlertTriangle, Scale } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Terms() {
    const sections = [
        {
            icon: Users,
            title: "1. Aceptación de Términos",
            content: `Al acceder y utilizar el sitio web www.puntoylana.com, usted acepta estar sujeto a estos Términos y Condiciones de uso. Si no está de acuerdo con alguna parte de estos términos, le rogamos que no utilice nuestro sitio web.

Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio.`
        },
        {
            icon: FileText,
            title: "2. Descripción del Servicio",
            content: `Punto y Lana es una tienda en línea dedicada a la venta de productos relacionados con el crochet y las manualidades, incluyendo:
            
• Lanas e hilos de diversas calidades
• Patrones descargables para crochet y amigurumis
• Cursos online y tutoriales
• Accesorios y herramientas para tejedores

Los productos digitales se entregan mediante descarga inmediata después de confirmar el pago.`
        },
        {
            icon: CreditCard,
            title: "3. Precios y Pagos",
            content: `• Todos los precios están expresados en Pesos Colombianos (COP) e incluyen el IVA correspondiente.
• Aceptamos pagos a través de efiPay (Nequi, Bancolombia y otros métodos disponibles).
• El pago debe realizarse en su totalidad antes del envío o entrega del producto.
• Nos reservamos el derecho de modificar los precios sin previo aviso.
• Una vez confirmado el pago, recibirá un correo de confirmación con los detalles de su compra.`
        },
        {
            icon: Shield,
            title: "4. Propiedad Intelectual",
            content: `Todo el contenido del sitio, incluyendo pero no limitado a: textos, gráficos, logotipos, imágenes, patrones, tutoriales y código fuente, son propiedad exclusiva de Punto y Lana o de sus licenciantes.

Los patrones y cursos adquiridos son para uso personal únicamente. Está prohibida su reproducción, distribución o venta sin autorización expresa.`
        },
        {
            icon: AlertTriangle,
            title: "5. Limitación de Responsabilidad",
            content: `• No garantizamos que el sitio esté libre de errores o interrupciones.
• No somos responsables por daños indirectos, incidentales o consecuentes derivados del uso del sitio.
• Los colores de los productos pueden variar ligeramente debido a la configuración de pantalla de cada dispositivo.
• Los tiempos de descarga de productos digitales pueden variar según la conexión a internet del usuario.`
        },
        {
            icon: Scale,
            title: "6. Ley Aplicable",
            content: `Estos términos se rigen por las leyes de la República de Colombia. Cualquier disputa será sometida a los tribunales competentes de la ciudad de Bogotá D.C.

Para cualquier consulta sobre estos términos, puede contactarnos a: legal@puntoylana.com`
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
                    <h1 className="font-display text-4xl font-bold gradient-text mb-4">
                        Términos y Condiciones
                    </h1>
                    <p className="text-chocolate-400">
                        Última actualización: Enero 2026
                    </p>
                </motion.div>

                {/* Content */}
                <div className="space-y-8">
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-8 shadow-soft"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-rosa-100 rounded-xl">
                                    <section.icon className="w-6 h-6 text-rosa-500" />
                                </div>
                                <h2 className="font-display text-xl font-semibold text-chocolate-600">
                                    {section.title}
                                </h2>
                            </div>
                            <p className="text-chocolate-400 whitespace-pre-line leading-relaxed">
                                {section.content}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Footer note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-12 text-center text-chocolate-400 text-sm"
                >
                    <p>
                        Al utilizar nuestro sitio, usted confirma haber leído y aceptado estos términos.
                    </p>
                    <p className="mt-2">
                        ¿Tienes preguntas? <Link to="/contacto" className="text-rosa-500 hover:underline">Contáctanos</Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
