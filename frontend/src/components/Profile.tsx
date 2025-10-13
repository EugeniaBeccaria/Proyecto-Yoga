
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
export default Profile;
