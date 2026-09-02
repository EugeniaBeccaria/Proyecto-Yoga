import { useEffect, useState } from 'react';
import { EVENTO_ERROR_CONEXION } from '../service/axiosConfig';
import '../styles/MensajeError.css';

const DURACION_AVISO = 8000;

function MensajeError() {
    const [mensaje, setMensaje] = useState<string | null>(null);

    useEffect(() => {
        function alRecibirError(evento: Event) {
            setMensaje((evento as CustomEvent<string>).detail);
        }
        window.addEventListener(EVENTO_ERROR_CONEXION, alRecibirError);
        return () => window.removeEventListener(EVENTO_ERROR_CONEXION, alRecibirError);
    }, []);


    useEffect(() => {
        if (!mensaje) return;
        const temporizador = setTimeout(() => setMensaje(null), DURACION_AVISO);
        return () => clearTimeout(temporizador);
    }, [mensaje]);

    if (!mensaje) return null;

    return (
        <div className="mensaje-error" role="alert">
            <p className="mensaje-error__texto">{mensaje}</p>
            <button
                type="button"
                className="mensaje-error__cerrar"
                onClick={() => setMensaje(null)}
                aria-label="Cerrar aviso"
            >
                &times;
            </button>
        </div>
    );
}

export default MensajeError;
