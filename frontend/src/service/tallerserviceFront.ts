import axios from 'axios';
import type { TallerApi } from '../types/taller.type.ts';

async function getTalleres(): Promise<TallerApi[]> {
	try {
		const response = await axios.get('http://localhost:3000/api/talleres'); // implementar--> traer solos los q el usuario no se inscribio
		return response.data.data ?? [];
	} catch (error) {
		console.error('Error al traer los talleres:', error);
		throw error;
	}
}

export const tallerService = {
	getTalleres,
};
