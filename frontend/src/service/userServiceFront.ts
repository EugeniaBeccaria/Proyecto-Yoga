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

export const userService = {
    saveProfileData,
    getCurrentUserProfile
};