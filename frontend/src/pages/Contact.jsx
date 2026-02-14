import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Instagram } from 'lucide-react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Enviar al backend
        console.log('Mensaje:', formData);
        setSent(true);
        setTimeout(() => setSent(false), 3000);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const contactInfo = [
        { icon: Mail, label: 'Email', value: 'hola@puntoylana.com' },
        { icon: Phone, label: 'WhatsApp', value: '+57 300 123 4567' },
        { icon: MapPin, label: 'Ubicación', value: 'Bogotá, Colombia' },
    ];

    return (
        <div className="min-h-screen pt-20 pb-16 bg-crema-50">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <MessageSquare className="mx-auto text-rosa-500 mb-4" size={48} />
                    <h1 className="font-display text-4xl font-bold text-chocolate-600 mb-4">
                        Contáctanos
                    </h1>
                    <p className="text-chocolate-400 max-w-xl mx-auto">
                        ¿Tienes alguna pregunta o sugerencia? Nos encantaría escucharte.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-1 space-y-4"
                    >
                        {contactInfo.map((info, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl p-5 shadow-md flex items-center gap-4"
                            >
                                <div className="w-12 h-12 bg-rosa-100 rounded-full flex items-center justify-center">
                                    <info.icon className="text-rosa-500" size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-chocolate-400">{info.label}</p>
                                    <p className="font-medium text-chocolate-600">{info.value}</p>
                                </div>
                            </div>
                        ))}

                        {/* Social */}
                        <div className="bg-white rounded-2xl p-5 shadow-md">
                            <p className="font-medium text-chocolate-600 mb-3">Síguenos</p>
                            <div className="flex gap-3">
                                <a
                                    href="#"
                                    className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                                >
                                    <Instagram size={18} />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2"
                    >
                        <div className="bg-white rounded-3xl p-8 shadow-md">
                            <h2 className="font-display text-xl font-bold text-chocolate-600 mb-6">
                                Envíanos un mensaje
                            </h2>

                            {sent && (
                                <div className="mb-6 p-4 bg-menta-100 text-menta-600 rounded-xl flex items-center gap-2">
                                    <Send size={18} />
                                    ¡Mensaje enviado! Te responderemos pronto.
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-chocolate-600 mb-2">
                                            Nombre
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 bg-crema-50 rounded-xl border-2 border-transparent focus:border-rosa-300 focus:outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-chocolate-600 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 bg-crema-50 rounded-xl border-2 border-transparent focus:border-rosa-300 focus:outline-none"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-chocolate-600 mb-2">
                                        Asunto
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full px-4 py-3 bg-crema-50 rounded-xl border-2 border-transparent focus:border-rosa-300 focus:outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-chocolate-600 mb-2">
                                        Mensaje
                                    </label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        rows={5}
                                        className="w-full px-4 py-3 bg-crema-50 rounded-xl border-2 border-transparent focus:border-rosa-300 focus:outline-none resize-none"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn-primary w-full flex items-center justify-center gap-2"
                                >
                                    <Send size={18} />
                                    Enviar mensaje
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
