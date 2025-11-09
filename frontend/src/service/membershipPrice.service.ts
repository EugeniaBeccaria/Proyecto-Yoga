import axios from 'axios';

const API_URL = "http://localhost:3000/api/membershipPrice";

export interface IPlanGroup {
    id: number;
    description: string;
    price: number;
    numOfClasses: number;
}

const getCurrentPrices = async (): Promise<IPlanGroup[]> => {
    try {
        const response = await axios.get(`${API_URL}/current-grouped`);
        return response.data.data;
    } catch (error) {
        console.error("Error al cargar los precios actuales:", error);
        throw error;
    }
};


const updatePriceForGroup = async (groupId: number, newPrice: number) => {
    try {
        const response = await axios.post(
            `${API_URL}/group-update`,
            {
                groupId: groupId,
                price: newPrice
            },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar el grupo ${groupId}:`, error);
        throw error;
    }
};

export const membershipPriceService = {
    getCurrentPrices,
    updatePriceForGroup
};