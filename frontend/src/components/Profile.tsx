/*import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";*/
import "../styles/Profile.css";

interface profileProps{
    handleClick: ()=>void
    error: boolean
}

export default function ProfilePage({ handleClick, error}: profileProps) {
    const userProfile = localStorage.getItem('user')
    if(!userProfile){
        return <div>Error: No user data found</div>;
    }

    const user = JSON.parse(userProfile);

    return (
        <div className="profile-container">
            <div className="profile-card">

                <div className="avatar">
                    <img src="/perfilUsuario.webp" alt="avatar" />
                </div>

                <h2>{user.name}</h2>
                <p>{user.email}</p>

                <div className="profile-data">
                    <div className="row">
                        <span className="label">Nombre</span>
                        <span className="value">{user.name}</span>
                    </div>

                    <div className="row">
                        <span className="label">Email</span>
                        <span className="value">{user.email}</span>
                    </div>

                    <div className="row">
                        <span className="label">Rol</span>
                        <span className="value">{user.role}</span>
                    </div>
            </div>
  
            <button onClick={handleClick} className="logout-btn">Cerrar sesión</button>
                {error  &&
                    <div className='error-message'>
                        Error al cerrar sesión
                    </div>
                }
        </div>
    </div>
  );
}

/*
interface profileProps{
    handleClick: ()=>void
    error: boolean
}

function Profile({ handleClick, error}: profileProps) {
    const userProfile = localStorage.getItem('user')
    if(!userProfile){
        return <div>Error: No user data found</div>;
    }

    const user = JSON.parse(userProfile);

    return(
        <div className="profile">
            <h1>Bienvenido, {user.name}</h1>
            <button onClick={handleClick} className="button">Cerrar sesión</button>
                {error  &&
                    <div className='error-message'>
                        Error al cerrar sesión
                    </div>
                }
        </div>
    )
}
export default Profile;*/
