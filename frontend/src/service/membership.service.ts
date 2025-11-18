import axios from "axios";

async function searchUserMembership(userId: number) {
    try {
        await axios(`http://localhost:3000/api/membership/user/${userId}`, { withCredentials: true })
        return true
    } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
            return false;
        }
        console.error("Error crítico buscando membresía:", error);
        throw error;
    }
}

export const membershipService = {
    searchUserMembership
};