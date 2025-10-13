/*"use client"
import { useState } from 'react';
import FacebookLogin, { type SuccessResponse as FBSuccessResponse } from "@greatsumini/react-facebook-login";
import axios from "axios";


type SuccessResponse = FBSuccessResponse & {
    email?: string;
    name?: string;
}

const FacebookAuth = () => {
    const [message, setMessage] = useState<{text: string, severity: "error" | "success"}> ();
    
    const onSuccessHandler = async (response: SuccessResponse) => {
        console.log("Facebook response: ", response);
    
        try {
            // Send data to the backend to register or log in
            const backendResponse = await axios.post ("http://localhost:3000/api/user/facebook", {
                facebookId: response.userID,
                accessToken: response.accessToken,
                email: response.email,
                name: response.name
            });
            console.log("Usuario creado o autenticado: ", backendResponse.data);

            setMessage({text: "Autenticación exitosa", severity: "success"});
        } catch (error) {
            console.log("Error al enviar datos al backend: ", error);
            setMessage({text: "Error en la autenticación", severity: "error"});
        }
    }

    return (
        <div>
            <FacebookLogin
                appId="1313966383551264"
                onSuccess={onSuccessHandler}
                onFail={(error) => {
                    console.log({"Error de Facebook": error});
                    setMessage({text: "Error al iniciar sesión con Facebook", severity: "error"});
                }}
                render= {(renderProps) => (
                    <button
                        type="button"
                        onClick={renderProps.onClick}
                        className="social-button facebook"
                    >
                        <img src="LogoFacebook.png" alt="Facebook logo" className="social-logo" />
                        Facebook
                    </button>
                )}
            />

            {message && (
                <div className={`mensaje-${message.severity}`}>
                    {message.text}
                </div>
            )}
        </div>
    )
};

export default FacebookAuth;*/
