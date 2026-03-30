import axios from "axios";

async function searchUserMembership(userId: number) {
    try {
        const response = await axios(`http://localhost:3000/api/membership/user/${userId}`, { withCredentials: true });
        if (response.status === 200) { // encontro una membresia activa para el usuario
            console.log("Membresía encontrada para el usuario:", response.data.data);
            return true;
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
            return false;
        }
        console.error("Error crítico buscando membresía:", error);
        throw error;
    }
}

async function pollingSearchMembership(sessionId: string, maxAttempts = 10, delay = 3000): Promise<boolean> {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            const response = await axios.get(`http://localhost:3000/api/membership/session/${sessionId}`, { withCredentials: true });
            if (response.status === 200) {
                console.log("Membresía encontrada en el intento", attempt);
                return true;
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
                console.log(`Intento ${attempt}: Membresía no encontrada, reintentando en ${delay / 1000} segundos...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                console.error("Error crítico buscando membresía:", error);
                throw error;
            }
        }
    }
    console.warn("Membresía no encontrada después de varios intentos.");
    return false;
}

export const membershipService = {
    searchUserMembership,
    pollingSearchMembership
};