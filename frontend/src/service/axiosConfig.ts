import axios from 'axios';
axios.defaults.timeout = 10000; 

export const MENSAJE_SIN_CONEXION =
    'No se pudo conectar con el servidor. Verifica tu conexión e intenta de nuevo en unos minutos.';

export const MENSAJE_DEMORA =
    'El servidor está tardando más de lo normal. Intenta de nuevo más tarde.';

export const MENSAJE_SERVIDOR =
    'Ocurrió un error en el servidor. Intenta de nuevo más tarde.';

export const EVENTO_ERROR_CONEXION = 'error-conexion';

function avisarAlUsuario(mensaje: string) {
    window.dispatchEvent(new CustomEvent(EVENTO_ERROR_CONEXION, { detail: mensaje }));
}
export function traducirError(error: any): string | null {
    if (error?.code === 'ECONNABORTED') {
        return MENSAJE_DEMORA; 
    }
    if (!error?.response) {
        return MENSAJE_SIN_CONEXION; 
    }
    if (error.response.status >= 500) {
        return MENSAJE_SERVIDOR; 
    }
    return null;
}


axios.interceptors.response.use(
    (respuesta) => respuesta,
    (error) => {
        const mensaje = traducirError(error);
        if (mensaje) {
            error.mensajeAmigable = mensaje;
            avisarAlUsuario(mensaje);
        }
        return Promise.reject(error);
    }
);
