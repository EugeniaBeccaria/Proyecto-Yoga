import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import "../styles/Navbar.css"
import { HashLink } from 'react-router-hash-link';
import { useState } from "react";
import LogoIcon from './LogoIcon';
import { AuthContext } from '../context/AuthContext.tsx';
import { useContext } from 'react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const {user} = useContext(AuthContext);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (menuName: string) => {
    setActiveDropdown(activeDropdown === menuName ? null : menuName);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
    setIsMenuOpen(false);
  };
  
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

      <button className="menu-toggle" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
      </button>

      <nav className={`nav-right ${isMenuOpen ? 'open' : ''}`}>
        {isAdmin && (
          <>
          <div className="paste-button">
            <button className="button-link" onClick={() => toggleDropdown('clases')}>
              ▼ GESTIONAR CLASES 
            </button>
            {activeDropdown === 'clases' && (
              <div className="dropdown-content" style={{display: 'block'}}>
                <HashLink smooth to="/ClassCalendar" onClick={closeDropdown}>
                  VER CLASES
                </HashLink>
                <HashLink id="top" smooth to="/CreateClassPage" onClick={closeDropdown}>
                  CREAR CLASES
                </HashLink>                
                <HashLink id="bottom" smooth to="/DeleteClassPage" onClick={closeDropdown}>
                  ELIMINAR CLASES
                </HashLink> 
              </div>
            )}
          </div>

          <div className="paste-button">
            <button className="button-link" onClick={() => toggleDropdown('talleres')}>
              ▼ GESTIONAR TALLERES 
            </button>
            {activeDropdown === 'talleres' && (
              <div className="dropdown-content" style={{display: 'block'}}>
                <HashLink smooth to="/ListTalleresPage" onClick={closeDropdown}>
                  VER TALLERES
                </HashLink>
                <HashLink id="top" smooth to="/CreateTallerPage#crearTalleres" onClick={closeDropdown}>
                  CREAR TALLERES
                </HashLink>
              </div>
            )}
          </div>

          <HashLink smooth to="/MembershipPage#top" onClick={closeMenu}>
            GESTIONAR MEMBRESÍAS
          </HashLink>
          <HashLink smooth to="/CreateProfesorPage#top" onClick={closeMenu}>
            CREAR PROFESOR
          </HashLink>
          <HashLink smooth to="/ListAlumnosPage" onClick={closeMenu}>
            VER ALUMNOS
          </HashLink>  


        </>)
        }

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

        {isClient &&
            <>
              <HashLink smooth to="/MyClassesPage" onClick={closeMenu}>MIS CLASES</HashLink>
              <HashLink smooth to="/MyTalleresPage" onClick={closeMenu}>MIS TALLERES</HashLink>
              
            </>
        }

            {dft && (
              <>
                <HashLink smooth to="/#nosotros" onClick={closeMenu}>NOSOTROS</HashLink>
                <HashLink smooth to="/#reseñas" onClick={closeMenu}>RESEÑAS</HashLink>
                <HashLink smooth to="/ClassCalendar" onClick={closeMenu}>CLASES</HashLink>
                <HashLink smooth to="/talleres" onClick={closeMenu}>TALLERES</HashLink>
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