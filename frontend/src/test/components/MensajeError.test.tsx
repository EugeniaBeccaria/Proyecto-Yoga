import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import MensajeError from '../../components/MensajeError';
import { EVENTO_ERROR_CONEXION } from '../../service/axiosConfig';

describe('Componente MensajeError', () => {
    it('no debe mostrar nada inicialmente cuando no hay errores', () => {
        const { container } = render(<MensajeError />);
        expect(container.firstChild).toBeNull();
    });

    it('debe mostrar el mensaje de error cuando se dispara el evento de conexion', async () => {
        render(<MensajeError />);

        act(() => {
            window.dispatchEvent(
                new CustomEvent(EVENTO_ERROR_CONEXION, {
                    detail: 'Error al conectar con el servidor',
                })
            );
        });

        const alerta = await screen.findByRole('alert');
        expect(alerta).toBeInTheDocument();
        expect(screen.getByText('Error al conectar con el servidor')).toBeInTheDocument();
    });

    it('debe ocultar el mensaje de error cuando el usuario hace clic en cerrar', async () => {
        const user = userEvent.setup();
        render(<MensajeError />);

        act(() => {
            window.dispatchEvent(
                new CustomEvent(EVENTO_ERROR_CONEXION, {
                    detail: 'Error temporal',
                })
            );
        });

        expect(await screen.findByRole('alert')).toBeInTheDocument();

        const botonCerrar = screen.getByRole('button', { name: /cerrar aviso/i });
        await user.click(botonCerrar);

        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
});
