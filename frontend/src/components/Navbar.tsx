import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"
import { HashLink } from 'react-router-hash-link';


type NavbarProps = {
  disable?: boolean;
};

function Navbar({disable}:NavbarProps) {
  return (
    <header className="navbar">
      <div className="nav-left">
        <HashLink to="/#top">
          <img src="/LogoShantiYoga.png" alt="Logo Shanti Yoga" className="logo" />
        </HashLink>
      </div>

      <nav className="nav-right">
        <HashLink smooth to="/#nosotros">
          NOSOTROS
        </HashLink>
        <HashLink smooth to="/#clases">
          CLASES
        </HashLink>
        <HashLink smooth to="/#talleres">
          TALLERES
        </HashLink>
        <HashLink smooth to="/#reseñas">
          RESEÑAS
        </HashLink>

        <div className="icono-perfil">
            <Link to="/LoginPage#top">
            {disable ? '' : <FaUserCircle size={80}/>}
            </Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar;