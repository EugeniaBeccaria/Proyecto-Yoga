import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"

type NavbarProps = {
  disable?: boolean;
};
function Navbar({disable}:NavbarProps) {
  return (
    <header className="navbar">
      <div className="nav-left">
        <Link to={"/"}>
        <img src="/LogoShantiYoga.png" alt="Logo Shanti Yoga" className="logo" />
        </Link>
      </div>

      <nav className="nav-right">
        {disable ? '' : <Link to="/">NOSOTROS</Link>}
        {disable ? '' : <Link to="/">CLASES</Link>}
        {disable ? '' : <Link to="/">TALLERES</Link>}
        {disable ? '' : <Link to="/">RESEÑAS</Link>}

        {<div className="icono-perfil">
            <Link to="/LoginPage">
            {disable ? '' : <FaUserCircle size={30}/>}
            </Link>
        </div>}
      </nav>
    </header>
  )
}

export default Navbar;