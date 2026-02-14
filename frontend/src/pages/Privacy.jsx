import { Link } from 'react-router-dom';
import { ArrowLeft, Eye, Database, Lock, UserCheck, Mail, Settings, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Privacy() {
    const sections = [
        {
            icon: Eye,
            title: "1. Información que Recopilamos",
            content: `Recopilamos información que usted nos proporciona directamente:

• **Datos de cuenta**: nombre, correo electrónico y contraseña al registrarse.
• **Datos de compra**: historial de pedidos, productos adquiridos y métodos de pago utilizados.
• **Datos de contacto**: cuando nos escribe a través del formulario de contacto.

También recopilamos automáticamente:
• Dirección IP y datos de navegación
• Tipo de dispositivo y navegador
• Páginas visitadas y tiempo de permanencia`
        },
        {
            icon: Database,
            title: "2. Uso de la Información",
            content: `Utilizamos su información para:

• Procesar y gestionar sus pedidos
• Enviar confirmaciones de compra y actualizaciones de envío
• Responder a sus consultas y solicitudes de soporte
• Mejorar nuestros productos y servicios
• Enviar comunicaciones de marketing (solo si ha dado su consentimiento)
• Prevenir fraudes y garantizar la seguridad del sitio`
        },
        {
            icon: Lock,
            title: "3. Protección de Datos",
            content: `Implementamos medidas de seguridad para proteger su información:

• Encriptación SSL/TLS para todas las comunicaciones
• Almacenamiento seguro de contraseñas con hash
• Acceso restringido a datos personales solo a personal autorizado
• Monitoreo continuo de seguridad
• Copias de seguridad regulares

Nunca almacenamos datos de tarjetas de crédito. Los pagos son procesados de forma segura a través de efiPay.`
        },
        {
            icon: UserCheck,
            title: "4. Sus Derechos",
            content: `Bajo la Ley 1581 de 2012 (Protección de Datos Personales de Colombia), usted tiene derecho a:

• **Acceder** a sus datos personales
• **Rectificar** información incorrecta o desactualizada
• **Eliminar** sus datos (derecho al olvido)
• **Revocar** su consentimiento para el tratamiento de datos
• **Portabilidad** de sus datos a otro servicio

Para ejercer estos derechos, contáctenos a: privacidad@puntoylana.com`
        },
        {
            icon: Globe,
            title: "5. Cookies y Tecnologías Similares",
            content: `Usamos cookies para:

• Mantener su sesión activa mientras navega
• Recordar sus preferencias (carrito, idioma)
• Analizar el tráfico del sitio (Google Analytics)

Puede gestionar las cookies desde la configuración de su navegador. Desactivar cookies esenciales puede afectar la funcionalidad del sitio.

Para más detalles, consulte nuestra Política de Cookies.`
        },
        {
            icon: Settings,
            title: "6. Cambios en Esta Política",
            content: `Podemos actualizar esta política periódicamente. Le notificaremos sobre cambios significativos a través de:

• Un aviso en nuestro sitio web
• Un correo electrónico (si tiene cuenta registrada)

Le recomendamos revisar esta página regularmente para estar informado sobre cómo protegemos su información.`
        },
        {
            icon: Mail,
            title: "7. Contacto",
            content: `Si tiene preguntas sobre esta política de privacidad o sobre cómo manejamos sus datos, puede contactarnos:

• **Email**: privacidad@puntoylana.com
• **Formulario**: www.puntoylana.com/contacto

Responderemos a su solicitud en un plazo máximo de 15 días hábiles.`
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
                        <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="font-display text-4xl font-bold gradient-text mb-4">
                        Política de Privacidad
                    </h1>
                    <p className="text-chocolate-400">
                        Última actualización: Enero 2026
                    </p>
                </motion.div>

                {/* Intro */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-r from-rosa-500 to-rosa-400 rounded-2xl p-8 text-white mb-8"
                >
                    <p className="text-lg leading-relaxed">
                        En Punto y Lana, respetamos su privacidad y estamos comprometidos con la protección de sus datos personales. Esta política explica cómo recopilamos, usamos y protegemos su información.
                    </p>
                </motion.div>

                {/* Content */}
                <div className="space-y-6">
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + index * 0.05 }}
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
                            <div className="text-chocolate-400 whitespace-pre-line leading-relaxed prose prose-pink">
                                {section.content.split('**').map((part, i) =>
                                    i % 2 === 1 ? <strong key={i} className="text-chocolate-600">{part}</strong> : part
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-12 text-center"
                >
                    <div className="inline-flex items-center gap-4 bg-white rounded-full px-6 py-3 shadow-soft">
                        <Shield className="w-5 h-5 text-rosa-500" />
                        <span className="text-chocolate-500">Sus datos están protegidos con nosotros</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
