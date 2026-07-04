import axios from 'axios';
import type { TallerApi } from '../types/taller.type.ts';

async function getTalleres(): Promise<TallerApi[]> {
	try {
		const response = await axios.get('http://localhost:3000/api/talleres');
		return response.data.data ?? response.data ?? [];
	} catch (error) {
		console.error('Error al traer los talleres:', error);
		throw error;
	}
}

async function getMyTalleres(): Promise<TallerApi[]> {
	try {
		const response = await axios.get('http://localhost:3000/api/talleres/professor/talleres', { withCredentials: true });
		return response.data.data ?? response.data ?? [];
	} catch (error) {
		console.error('Error al traer los talleres del profesor:', error);
		throw error;
	}
}
async function pollingSearchTalleres(sessionId: string, maxAttempts = 10, delay = 3000): Promise<boolean> {
	for (let attempt = 1; attempt <= maxAttempts; attempt++) {
		try {
			const response = await axios.get(`http://localhost:3000/api/payment/session/${sessionId}`, { withCredentials: true });
			if (response.status === 200) {
				console.log("Talleres encontrados en el intento", attempt);
				return true;
			}
		} catch (error) {
			if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
				console.log(`Intento ${attempt}: Taller no encontrado, reintentando en ${delay / 1000} segundos...`);
				await new Promise(resolve => setTimeout(resolve, delay));
			} else {
				console.error("Error crítico buscando taller:", error);
				throw error;
			}
		}
	}
	console.warn("Talleres no encontrados después de varios intentos.");
	return false;
}
export const tallerService = {
	getTalleres,
	getMyTalleres,
	pollingSearchTalleres,
};