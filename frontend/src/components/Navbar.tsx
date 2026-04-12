import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import "../styles/Navbar.css"
import { HashLink } from 'react-router-hash-link';
import { useState } from "react";
import LogoIcon from './LogoIcon';
import { AuthContext } from '../context/AuthContext.tsx';
import { useContext } from 'react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [showed, setShowed] = useState<boolean>(false)

  const {user} = useContext(AuthContext);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  
  let isAdmin = false
  let isProfessor = false
  let isClient = false
  if(user?.role === 'admin'){
    isAdmin = true
  }
  if(user?.role === "professor"){
    isProfessor = true
  }
  if(user?.role === "client"){
    isClient = true
  }
  
  const dft = !isProfessor && !isAdmin;

  return (
    <>
    <header className="navbar">
      <div className="nav-left">
        <HashLink smooth to="/" onClick={closeMenu}>
          <LogoIcon size={100} className="logo" />
        </HashLink>
      </div>

      {/* BOTÓN HAMBURGUESA: Solo se verá en mobile vía CSS */}
      <button className="menu-toggle" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
      </button>

      {/* Agregué la clase dinámica 'open' para controlar la visibilidad en mobile */}
      <nav className={`nav-right ${isMenuOpen ? 'open' : ''}`}>
        {/* ADMIN MENU */}
        {isAdmin && (
          <>
          <div className="paste-button">
            <HashLink className="button" onClick = {()=>{setShowed(!showed)}}>
              ▼ GESTIONAR CLASES 
            </HashLink>
            {/* Agregué renderizado condicional simple para el dropdown en mobile */}
            {(showed) && (
              <div className="dropdown-content" style={{display: 'block'}}>
                <HashLink smooth to="/ClassCalendar" onClick={closeMenu}>
                  VER CLASES
                </HashLink>
                <HashLink id="top" smooth to="/CreateClassPage" onClick={closeMenu}>
                    CREAR CLASES
                </HashLink>                
                <HashLink id="bottom" smooth to="/DeleteClassPage" onClick={closeMenu}>
                  ELIMINAR CLASES
                </HashLink>   
              </div>
            )}
          </div>

          <HashLink smooth to="/CreateTallerPage#crearTalleres" onClick={closeMenu}>
            CREAR TALLERES
          </HashLink>
          <HashLink smooth to="/MembershipPage#top" onClick={closeMenu}>
            GESTIONAR MEMBRESÍAS
          </HashLink>
          <HashLink smooth to="/CreateProfesorPage#top" onClick={closeMenu}>
            CREAR PROFESOR
          </HashLink>


        </>)
        }
        {/* PROFESSOR MENU */}
        {isProfessor &&
        <>
          <HashLink smooth to="/professor/dashboard#top" onClick={closeMenu}>
            MI PANEL
          </HashLink>
          <HashLink smooth to="/professor/passwordChange#top" onClick={closeMenu}>
            CAMBIAR CONTRASEÑA
          </HashLink>
        </>
        }

        {/* CLIENT MENU (default menu will also be showed)*/}
        {isClient &&
            <>
              <HashLink smooth to="/MyClassesPage" onClick={closeMenu}>MIS CLASES</HashLink>
              {/* FALTA IMPLEMENTAR */}
              {/* <HashLink smooth to="/MyMembershipPage#top" className="link-membresia">MI MEMBRESÍA</HashLink>*/}
            </>
        }


            {/* DEFAULT MENU */}
            {dft && (
              <>
                <HashLink smooth to="/#nosotros" onClick={closeMenu}>NOSOTROS</HashLink>
                <HashLink smooth to="/ClassCalendar" onClick={closeMenu}>CLASES</HashLink>
                <HashLink smooth to="/talleres" onClick={closeMenu}>TALLERES</HashLink>
                <HashLink smooth to="/#reseñas" onClick={closeMenu}>RESEÑAS</HashLink>
              </>
            )}

        <div className="icono-perfil">
            <HashLink smooth to="/LoginPage#top" onClick={closeMenu}>
            <FaUserCircle size={80}/>
            </HashLink>
        </div>
      </nav>
    </header>
    </>
  )
}

export default Navbar;