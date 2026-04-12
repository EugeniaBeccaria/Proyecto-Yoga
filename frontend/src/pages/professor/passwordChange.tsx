import {useState} from "react";
import axios from "axios";
import "../../styles/professor/passwordChange.css";

type PasswordForm = {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
};

interface error {
    error: boolean;
    message: string;
}

export default function PasswordChange() {
    const [messageError, setMessageError] = useState<error>({
        error: false,
        message: "",
    });

    const [passwordData, setPasswordData] = useState<PasswordForm>({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordData({ ...passwordData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmNewPassword) {
            setMessageError({ error: true, message: "Las contraseñas no coinciden" });
            return;
        }

        try {
            const res = await axios.put(
                "http://localhost:3000/api/users/change-password",
                {
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword,
                },
                { withCredentials: true }
            );

            if (res.status === 200) {
                alert("Contraseña actualizada con éxito");
                setMessageError({ error: false, message: "" });

                setPasswordData({
                    currentPassword: "",
                    newPassword: "",
                    confirmNewPassword: "",
                });
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    if (error.response.status === 400) {
                        setMessageError({ error: true, message: "Contraseña actual incorrecta" });
                    } else if (error.response.status === 500) {
                        setMessageError({ error: true, message: "Error del servidor. Inténtalo de nuevo más tarde." });
                    } else {
                        setMessageError({ error: true, message: "Error desconocido. Inténtalo de nuevo." });
                    }
                }
            } else {
                setMessageError({ error: true, message: "Error inesperado. Inténtalo de nuevo." });
            }
        }
    };

    return (
        <div className="password-change-container">
            <h2 className="password-change-titulo">Cambiar Contraseña</h2>

            {messageError.error && (<div className="message-error">{messageError.message}</div>)}

            <form onSubmit={handleSubmit} className="password-change-form">
                <label className="password-change-label">Contraseña actual: </label>
                <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handleChange}
                    required
                    className="password-change-input"
                />

                <label className="password-change-label">Nueva contraseña: </label>
                <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handleChange}
                    required
                    className="password-change-input"
                />

                <p className="password-hint">La contraseña debe tener al menos 6 caracteres, una mayúscula y un número.</p>

                <label className="password-change-label">Confirmar nueva contraseña: </label>
                <input
                    type="password"
                    name="confirmNewPassword"
                    value={passwordData.confirmNewPassword}
                    onChange={handleChange}
                    required
                    className="password-change-input"
                />

                <button type="submit" className="password-change-button">Cambiar Contraseña</button>
            </form>
        </div>
    );
}