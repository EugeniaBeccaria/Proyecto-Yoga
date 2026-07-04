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

export const tallerService = {
	getTalleres,
	getMyTalleres,
};