import axios from 'axios';

// Base URL del backend Spring Boot
const API_BASE_URL = 'http://localhost:8080/api/v1';

// Crear instancia de Axios
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para agregar el token JWT a cada petición
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para manejar errores globales (ej: token expirado)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expirado o inválido - limpiar y redirigir a login
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// ============ AUTH ENDPOINTS ============

export const authService = {
    login: async (email, password) => {
        const response = await api.post('/auth/authenticate', { email, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);

            // Decodificar JWT para obtener info del usuario
            try {
                const payload = JSON.parse(atob(response.data.token.split('.')[1]));
                const user = {
                    email: payload.sub, // subject del token es el email
                    role: payload.role || 'USER',
                };
                localStorage.setItem('user', JSON.stringify(user));
            } catch (e) {
                // Si no se puede decodificar, usar el email del request
                localStorage.setItem('user', JSON.stringify({ email }));
            }
        }
        return response.data;
    },

    register: async (name, email, password) => {
        const response = await api.post('/auth/register', {
            firstname: name.split(' ')[0],
            lastname: name.split(' ').slice(1).join(' ') || '',
            email,
            password
        });
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        const token = localStorage.getItem('token');
        if (!token) return null;

        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },
};

// ============ PRODUCTS ENDPOINTS ============

export const productService = {
    getAll: async () => {
        const response = await api.get('/public/products');
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/public/products/${id}`);
        return response.data;
    },

    getByCategory: async (category) => {
        const response = await api.get(`/public/products/category/${category}`);
        return response.data;
    },

    search: async (query) => {
        const response = await api.get(`/public/products/search?q=${query}`);
        return response.data;
    },
};

// ============ CART ENDPOINTS ============

export const cartService = {
    getCart: async () => {
        const response = await api.get('/cart');
        return response.data;
    },

    addItem: async (productId, quantity = 1) => {
        const response = await api.post('/cart/add', { productId, quantity });
        return response.data;
    },

    updateItem: async (productId, quantity) => {
        const response = await api.put('/cart/update', { productId, quantity });
        return response.data;
    },

    removeItem: async (productId) => {
        const response = await api.delete(`/cart/remove/${productId}`);
        return response.data;
    },

    clear: async () => {
        const response = await api.delete('/cart/clear');
        return response.data;
    },
};

// ============ ORDERS ENDPOINTS ============

export const orderService = {
    create: async (shippingData, paymentMethod) => {
        const response = await api.post('/orders', { shippingData, paymentMethod });
        return response.data;
    },

    getMyOrders: async () => {
        const response = await api.get('/orders/my-orders');
        return response.data;
    },

    getById: async (orderId) => {
        const response = await api.get(`/orders/${orderId}`);
        return response.data;
    },
};

// ============ ADMIN ENDPOINTS ============

export const adminService = {
    // Registrar como admin (requiere clave secreta)
    registerAdmin: async (name, email, password, adminSecret) => {
        const response = await axios.post(`${API_BASE_URL}/auth/register-admin`, {
            firstname: name.split(' ')[0],
            lastname: name.split(' ').slice(1).join(' ') || '',
            email,
            password
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-Admin-Secret': adminSecret
            }
        });
        return response.data;
    },

    // Obtener estadísticas
    getStats: async () => {
        const response = await api.get('/admin/stats');
        return response.data;
    },

    // Productos (CRUD)
    getProducts: async () => {
        const response = await api.get('/admin/products');
        return response.data;
    },

    createProduct: async (product) => {
        const response = await api.post('/admin/products', product);
        return response.data;
    },

    updateProduct: async (id, product) => {
        const response = await api.put(`/admin/products/${id}`, product);
        return response.data;
    },

    deleteProduct: async (id) => {
        const response = await api.delete(`/admin/products/${id}`);
        return response.data;
    },

    // Usuarios
    getUsers: async () => {
        const response = await api.get('/admin/users');
        return response.data;
    },

    makeAdmin: async (userId) => {
        const response = await api.post(`/admin/users/${userId}/make-admin`);
        return response.data;
    },
};

export default api;
