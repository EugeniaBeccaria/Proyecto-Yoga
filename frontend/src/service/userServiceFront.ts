import axios from "axios";
import type { UserUpdate } from "../components/Profile";

interface ApiValidationError {
    field?: string;
    path?: string;
    message?: string;
    msg?: string;
}

// interface CurrentUserResponse {
//     data: {
//         name?: string;
//         email?: string;
//         role?: string;
//         birthdate?: string;
//         phone?: string;
//         dni?: string;
//     }
// }

async function getCurrentUserProfile() {
    const res = await axios.get('http://localhost:3000/api/users/me', {
        withCredentials: true
    });

    return res.data.data;
}

async function saveProfileData(userData: UserUpdate, setFieldErrors: (errors: Record<string, string>) => void){
    try {
        const res = await axios.put('http://localhost:3000/api/users/update',{
            name: userData.name,
            lastname: userData.lastname,
            birthdate: (userData.birthdate) ,
            email: userData.email,
            phone: userData.phone,
            dni: userData.dni
        }, { withCredentials: true })
        return res.status;
    }
    catch(err){
        if (axios.isAxiosError(err)) {
            if (err.response?.status === 400 && err.response.data.errors) {
                const validationErrors: ApiValidationError[] = err.response.data.errors;
                const errorsMap: Record<string, string> = {};
                validationErrors.forEach((error) => {
                    const fieldName = error.field ?? error.path;
                    const message = error.message ?? error.msg;
                    if (fieldName && message) {
                        errorsMap[fieldName] = message;
                    }
                });
                setFieldErrors(errorsMap);
            }
            return err.response?.status ?? 500;
        }
        return 500;
    }
}

async function getProfessors() {
    {/*const res = await axios.get('http://localhost:3000/api/users/professors', {
        withCredentials: true
    });
    return res.data.data;
}*/}
    try {
            const res = await axios.get('http://localhost:3000/api/users/professors', {
                withCredentials: true
            });
            // Soporta respuesta estructurada { data: [...] } o directa [...]
            return res.data.data ?? res.data;
        } catch (err) {
            console.error("Error en getProfessors:", err);
            throw err;
        }
    }

async function deleteUser(id:string) {
    {/*const res = await axios.delete(`http://localhost:3000/api/users/remove/${id}`, {
        withCredentials: true
    });
    return res.data;
}*/}
    try {
            const res = await axios.delete(`http://localhost:3000/api/users/remove/${id}`, {
                withCredentials: true
            });
            return res.data;
        } catch (err) {
            console.error("Error en deleteUser:", err);
            throw err;
        }
    }

export const userService = {
    saveProfileData,
    getCurrentUserProfile,
    getProfessors,
    deleteUser
};

export const deleteProfesor = async (id: string) => {
    const response = await axios.delete(`http://localhost:3000/api/users/${id}`, {
        withCredentials: true
    });
    return response.data;
};