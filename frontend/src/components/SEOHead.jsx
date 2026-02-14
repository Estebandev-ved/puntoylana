import { useEffect } from 'react';

/**
 * Componente SEO para manejar meta tags dinámicas.
 * Usar en cada página para mejorar SEO.
 * 
 * @example
 * <SEOHead 
 *   title="Catálogo de Productos"
 *   description="Explora nuestra colección de lanas, patrones y cursos de crochet"
 *   image="/images/catalogo-og.jpg"
 * />
 */
export default function SEOHead({
    title = "Punto y Lana",
    description = "Tu tienda online de crochet, lanas, patrones y cursos. Tejiendo sueños, creando sonrisas.",
    image = "/og-image.jpg",
    url = typeof window !== 'undefined' ? window.location.href : "https://puntoylana.com",
    type = "website"
}) {
    const fullTitle = title === "Punto y Lana" ? title : `${title} | Punto y Lana`;
    const fullImageUrl = image.startsWith('http') ? image : `https://puntoylana.com${image}`;

    useEffect(() => {
        // Actualizar title
        document.title = fullTitle;

        // Meta description
        updateMetaTag('name', 'description', description);

        // Open Graph
        updateMetaTag('property', 'og:title', fullTitle);
        updateMetaTag('property', 'og:description', description);
        updateMetaTag('property', 'og:image', fullImageUrl);
        updateMetaTag('property', 'og:url', url);
        updateMetaTag('property', 'og:type', type);
        updateMetaTag('property', 'og:site_name', 'Punto y Lana');
        updateMetaTag('property', 'og:locale', 'es_CO');

        // Twitter Card
        updateMetaTag('name', 'twitter:card', 'summary_large_image');
        updateMetaTag('name', 'twitter:title', fullTitle);
        updateMetaTag('name', 'twitter:description', description);
        updateMetaTag('name', 'twitter:image', fullImageUrl);

        // Canonical URL
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = 'canonical';
            document.head.appendChild(canonical);
        }
        canonical.href = url;

    }, [fullTitle, description, fullImageUrl, url, type]);

    return null; // Este componente no renderiza nada visible
}

/**
 * Función helper para actualizar o crear meta tags
 */
function updateMetaTag(attribute, key, value) {
    let element = document.querySelector(`meta[${attribute}="${key}"]`);
    if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
    }
    element.setAttribute('content', value);
}
