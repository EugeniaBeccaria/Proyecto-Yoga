import { FaUserCircle } from "react-icons/fa";
/*import { Link } from "react-router-dom";*/
import "../styles/Navbar.css"
import { useNavigate } from "react-router-dom";



function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="nav-left">
        <img src="/LogoShantiYoga.png" alt="Logo Shanti Yoga" className="logo" />
      </div>

      <nav className="nav-right">
        <a href="#nosotros">NOSOTROS</a>
        <a href="#clases">CLASES</a>
        <a href="#talleres">TALLERES</a>
        <a href="#reseñas">RESEÑAS</a>

        {<div className="icono-perfil" onClick = {() => navigate("/login")}style={{cursor: "pointer"}}>
            <FaUserCircle size={28}/>
        </div>}
      </nav>
    </header>
  )
}

export default Navbar;