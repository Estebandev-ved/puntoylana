import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Home, RefreshCcw, Bug } from 'lucide-react';

/**
 * Error Boundary para capturar errores de React y mostrar una UI amigable.
 */
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });

        // Aquí podrías enviar el error a un servicio como Sentry
        console.error('Error Boundary caught an error:', error, errorInfo);

        // Ejemplo de integración con Sentry (descomentar si se usa):
        // if (window.Sentry) {
        //     window.Sentry.captureException(error, { extra: errorInfo });
        // }
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-gradient-to-b from-crema-50 to-rosa-50 flex items-center justify-center px-4">
                    <div className="max-w-lg w-full text-center">
                        {/* Icono */}
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-400 to-orange-500 rounded-2xl mb-8 shadow-lg">
                            <Bug className="w-12 h-12 text-white" />
                        </div>

                        {/* Mensaje */}
                        <h1 className="font-display text-3xl font-bold text-chocolate-600 mb-4">
                            ¡Oops! Algo no salió bien
                        </h1>
                        <p className="text-chocolate-400 text-lg mb-8">
                            Ocurrió un error inesperado. No te preocupes, no perdiste tu
                            progreso. Intenta recargar la página.
                        </p>

                        {/* Botones */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={this.handleRetry}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-rosa-500 to-rosa-400 text-white rounded-full font-semibold hover:shadow-lg transition-all"
                            >
                                <RefreshCcw size={20} />
                                Recargar Página
                            </button>
                            <Link
                                to="/"
                                onClick={() => this.setState({ hasError: false })}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-rosa-500 text-rosa-500 rounded-full font-semibold hover:bg-rosa-50 transition-all"
                            >
                                <Home size={20} />
                                Ir al Inicio
                            </Link>
                        </div>

                        {/* Detalles del error (solo en desarrollo) */}
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="mt-8 text-left">
                                <summary className="cursor-pointer text-chocolate-500 hover:text-rosa-500 font-medium">
                                    Ver detalles técnicos
                                </summary>
                                <div className="mt-4 p-4 bg-gray-100 rounded-xl text-sm font-mono text-gray-700 overflow-auto max-h-64">
                                    <p className="text-red-600 font-bold mb-2">
                                        {this.state.error.toString()}
                                    </p>
                                    <pre className="whitespace-pre-wrap text-xs">
                                        {this.state.errorInfo?.componentStack}
                                    </pre>
                                </div>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
