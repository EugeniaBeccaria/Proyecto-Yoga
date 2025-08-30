import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"


function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-left">
        <img src="/LogoShantiYoga.png" alt="Logo Shanti Yoga" className="logo" />
      </div>

      <nav className="nav-right">
        <Link to="/">NOSOTROS</Link>
        <Link to="/">CLASES</Link>
        <Link to="/">TALLERES</Link>
        <Link to="/">RESEÑAS</Link>

        {<div className="icono-perfil">
            <FaUserCircle size={28}/>
        </div>}
      </nav>
    </header>
  )
}

export default Navbar;