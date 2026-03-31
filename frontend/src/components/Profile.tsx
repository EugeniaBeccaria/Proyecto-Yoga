/*import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";*/
import "../styles/Profile.css";
import { useEffect, useState, type ChangeEvent } from "react";
import { userService } from "../service/userServiceFront.ts";

export interface ValidationError {
    field: string;
    message: string;
}

interface profileProps{
    handleClick: ()=>void
    error: boolean
}
export interface UserUpdate {
    name: string ;
    birthdate?: string;
    email: string;
    phone?: string ;
    dni?: string ;
    role: string ;
}

function formatBirthdateForInput(value?: string | Date): string {
    if (!value) {
        return '';
    }

    if (typeof value === 'string') {
        if (value.includes('T')) {
            return value.split('T')[0];
        }
        return value;
    }

    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export default function ProfilePage({ handleClick, error}: profileProps) {
    const [userData, setUserData] = useState<UserUpdate>({
        name:  '',
        birthdate: '',
        email: '',
        phone: '',
        dni: '',
        role: ''
    });
    const [success, setSuccess] = useState<boolean>(false);
    const [hasUser, setHasUser] = useState<boolean>(true);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        const userProfile = localStorage.getItem('user');
        
        if (userProfile) {
            const parsedUser = JSON.parse(userProfile);
            setUserData({
                name: parsedUser.name || '',
                email: parsedUser.email || '',
                role: parsedUser.role || '',
                birthdate: '',
                phone: '',
                dni: ''
            });
        } else {
            setHasUser(false);
        }

        const loadCurrentProfile = async () => {
            try {
                const currentUser = await userService.getCurrentUserProfile();
                setUserData((prev) => ({
                    ...prev,
                    name: currentUser.name || prev.name,
                    email: currentUser.email || prev.email,
                    role: currentUser.role || prev.role,
                    birthdate: formatBirthdateForInput(currentUser.birthdate),
                    phone: currentUser.phone || '',
                    dni: currentUser.dni || ''
                }));

                const currentStored = localStorage.getItem('user');
                if (currentStored) {
                    localStorage.setItem('user', JSON.stringify({
                        id: currentUser.id,
                        name: currentUser.name || '',
                        email: currentUser.email || '',
                        role: currentUser.role || ''
                    }));
                }
            }
            catch (err) {
                console.error('No se pudo cargar el perfil actual', err);
            }
        };

        loadCurrentProfile();
    }, []);

    const handleSave = async () => {
        console.log("Datos a guardar:", userData);
        setFieldErrors({});
        const response = await userService.saveProfileData(userData, setFieldErrors);
        if (response === 200) {
            setSuccess(true);
            setFieldErrors({});
            setTimeout(() => setSuccess(false), 3000);
        }
        else {
            setTimeout(() => setFieldErrors({}), 5000);
            setSuccess(false);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };
    
    if (!hasUser) {
            return <div className="profile-container">Error: No user data found</div>;
        }

    return (
        <div className="profile-container">
            <div className="profile-card">

                <div className="avatar">
                    <img src="/perfilUsuario.webp" alt="avatar" />
                </div>

                <h2>{userData.name}</h2>
                <p>{userData.email}</p>

                <div className="profile-data">
                    <div className="row">
                        <span className="label">Nombre Completo</span>
                        <span className="value">{userData.name}</span>
                    </div>

                    <div className="row">
                        <span className="label">Fecha de nacimiento</span>
                        <input 
                            type="date" 
                            name="birthdate" 
                            value={userData.birthdate} 
                            onChange={handleChange} 
                        />
                    </div>

                    <div className="row">
                        <span className="label">Email</span>
                        <span className="value">{userData.email}</span>
                    </div>

                    <div className="row">
                        <span className="label">Teléfono</span>
                        <input 
                            type="tel" 
                            name="phone" 
                            placeholder="Añadir teléfono"
                            value={userData.phone} 
                            onChange={handleChange} 
                        />
                    </div>

                    <div className="row">
                        <span className="label">DNI</span>
                        <input 
                            type="text" 
                            name="dni" 
                            placeholder="Añadir DNI"
                            value={userData.dni} 
                            onChange={handleChange} 
                        />
                    </div>                                        

                    <div className="row">
                        <span className="label">Rol</span>
                        <span className="value">{userData.role}</span>
                    </div>
            </div>

            {fieldErrors.dni && <span className="error-text">{fieldErrors.dni}</span>}
            {fieldErrors.phone && <span className="error-text">{fieldErrors.phone}</span>}
            {fieldErrors.birthdate && <span className="error-text">{fieldErrors.birthdate}</span>}

            <button onClick={handleClick} className="logout-btn">Cerrar sesión</button>
            <button id="btn-save" onClick={handleSave}>Guardar datos</button>
                {success &&
                    <div className='success-message'>
                        Datos guardados correctamente
                    </div>
                }
                

                {error  &&
                    <div className='error-message'>
                        Error al cerrar sesión
                    </div>
                }
            </div>
        </div>
    );
}
