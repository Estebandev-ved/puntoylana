import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import OrderHistory from './pages/OrderHistory';
import About from './pages/About';
import Courses from './pages/Courses';
import FAQ from './pages/FAQ';
import Shipping from './pages/Shipping';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
// Páginas Legales
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Cookies from './pages/Cookies';
import Returns from './pages/Returns';
// Páginas de Error
import NotFound from './pages/NotFound';
import ServerError from './pages/ServerError';

// Navbar wrapper para acceder al contexto del carrito
function NavbarWithCart() {
  const { itemCount } = useCart();
  return <Navbar cartCount={itemCount} />;
}

function AppContent() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <NavbarWithCart />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalog />} />
            <Route path="/producto/:id" element={<ProductDetail />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/historial" element={<OrderHistory />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/cursos" element={<Courses />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/envios" element={<Shipping />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            {/* Páginas Legales */}
            <Route path="/terminos" element={<Terms />} />
            <Route path="/privacidad" element={<Privacy />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/devoluciones" element={<Returns />} />
            {/* Página de Error del Servidor */}
            <Route path="/error" element={<ServerError />} />
            {/* Ruta 404 - debe ser la última */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
