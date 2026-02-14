import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gradient-to-b from-crema-100 to-rosa-50 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-rosa-200">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-rosa-400 to-rosa-500 rounded-full flex items-center justify-center shadow-md">
                                <span className="text-white text-2xl">🧶</span>
                            </div>
                            <span className="font-display text-2xl font-bold gradient-text">
                                Punto y Lana
                            </span>
                        </Link>
                        <p className="text-chocolate-400 mb-6 max-w-md">
                            Tejiendo sueños, creando sonrisas. Encuentra los mejores materiales
                            para tus proyectos de crochet y amigurumis.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 bg-rosa-100 hover:bg-rosa-200 rounded-full flex items-center justify-center text-rosa-500 transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-rosa-100 hover:bg-rosa-200 rounded-full flex items-center justify-center text-rosa-500 transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-rosa-100 hover:bg-rosa-200 rounded-full flex items-center justify-center text-rosa-500 transition-colors">
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-display font-semibold text-chocolate-600 mb-4">
                            Tienda
                        </h4>
                        <ul className="space-y-2">
                            <li><Link to="/catalogo" className="text-chocolate-400 hover:text-rosa-500 transition-colors">Catálogo</Link></li>
                            <li><Link to="/catalogo?cat=lanas" className="text-chocolate-400 hover:text-rosa-500 transition-colors">Lanas</Link></li>
                            <li><Link to="/catalogo?cat=patrones" className="text-chocolate-400 hover:text-rosa-500 transition-colors">Patrones</Link></li>
                            <li><Link to="/catalogo?cat=cursos" className="text-chocolate-400 hover:text-rosa-500 transition-colors">Cursos</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-display font-semibold text-chocolate-600 mb-4">
                            Ayuda
                        </h4>
                        <ul className="space-y-2">
                            <li><Link to="/faq" className="text-chocolate-400 hover:text-rosa-500 transition-colors">Preguntas frecuentes</Link></li>
                            <li><Link to="/envios" className="text-chocolate-400 hover:text-rosa-500 transition-colors">Envíos</Link></li>
                            <li><Link to="/devoluciones" className="text-chocolate-400 hover:text-rosa-500 transition-colors">Devoluciones</Link></li>
                            <li><Link to="/contacto" className="text-chocolate-400 hover:text-rosa-500 transition-colors">Contacto</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Legal Links */}
                <div className="pt-8 pb-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-chocolate-400">
                    <Link to="/terminos" className="hover:text-rosa-500 transition-colors">Términos y Condiciones</Link>
                    <Link to="/privacidad" className="hover:text-rosa-500 transition-colors">Política de Privacidad</Link>
                    <Link to="/cookies" className="hover:text-rosa-500 transition-colors">Política de Cookies</Link>
                    <Link to="/devoluciones" className="hover:text-rosa-500 transition-colors">Devoluciones</Link>
                </div>

                {/* Copyright */}
                <div className="pt-4 text-center border-t border-rosa-100">
                    <p className="text-chocolate-400 text-sm flex items-center justify-center gap-1">
                        Hecho con <Heart size={14} className="text-rosa-500 fill-rosa-500" /> en Colombia
                    </p>
                    <p className="text-chocolate-300 text-xs mt-2">
                        © 2026 Punto y Lana. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
