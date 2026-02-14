import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Cargar usuario al iniciar
    useEffect(() => {
        const savedUser = authService.getCurrentUser();
        if (savedUser) {
            setUser(savedUser);
        }
        setIsLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            setError(null);
            setIsLoading(true);
            const data = await authService.login(email, password);
            setUser(data.user || { email });
            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || 'Error al iniciar sesión';
            setError(message);
            return { success: false, error: message };
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (name, email, password) => {
        try {
            setError(null);
            setIsLoading(true);
            await authService.register(name, email, password);
            // Después de registrar, hacer login automático
            return await login(email, password);
        } catch (err) {
            const message = err.response?.data?.message || 'Error al crear la cuenta';
            setError(message);
            return { success: false, error: message };
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const value = {
        user,
        isLoading,
        error,
        isAuthenticated: !!user,
        login,
        register,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
}
