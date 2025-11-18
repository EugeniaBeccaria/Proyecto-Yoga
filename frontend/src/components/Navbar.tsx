import { FaUserCircle } from "react-icons/fa";
import "../styles/Navbar.css"
import { HashLink } from 'react-router-hash-link';
import { useState } from "react";
import LogoIcon from './LogoIcon';
import { AuthContext } from '../context/AuthContext.tsx';
import { useContext } from 'react';

function Navbar() {
  const [showed, setShowed] = useState<boolean>(false)

  const {user} = useContext(AuthContext);
  
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
  
  const dft = (isProfessor === false && isAdmin === false) === true;

  return (
    <>
    <header className="navbar">
      <div className="nav-left">
        <HashLink smooth to="/">
          <LogoIcon size={100} className="logo" />
        </HashLink>
      </div>

      <nav className="nav-right">
        {/* ADMIN MENU */}
        {isAdmin && (
          <>
          <div className="paste-button">
            <HashLink className="button" onClick = {()=>{setShowed(!showed)}}>
              ▼ GESTIONAR CLASES 
            </HashLink>
            <div className="dropdown-content">
              <HashLink smooth to="/ClassCalendar">
                VER CLASES
              </HashLink>
              <HashLink id="top" smooth to="/CreateClassPage" >
                  CREAR CLASES
              </HashLink>                
              <HashLink id="bottom" smooth to="/DeleteClassPage">
                ELIMINAR CLASES
              </HashLink>   
            </div>
          </div>

          <HashLink smooth to="/CreateTallerPage#crearTalleres">
            CREAR TALLERES
          </HashLink>
          <HashLink smooth to="/MembershipPage#top">
            GESTIONAR MEMBRESÍAS
          </HashLink>
          <HashLink smooth to="/CreateProfesorPage#top">
            CREAR PROFESOR
          </HashLink>


        </>)
        }
        {/* PROFESSOR MENU */}
        {isProfessor &&
          <HashLink smooth to="/professor/dashboard#top">
            MI PANEL
          </HashLink>
        }

        {/* CLIENT MENU (default menu will also be showed)*/}
        {isClient &&
            <>
              <HashLink smooth to="/MyClassesPage">MIS CLASES</HashLink>
              {/* FALTA IMPLEMENTAR */}
              {/* <HashLink smooth to="/MyMembershipPage#top" className="link-membresia">MI MEMBRESÍA</HashLink>*/}
            </>
        }


            {/* DEFAULT MENU */}
            {dft && (
              <>
                <HashLink smooth to="/#nosotros">NOSOTROS</HashLink>
                <HashLink smooth to="/ClassCalendar">CLASES</HashLink>
                <HashLink smooth to="/talleres">TALLERES</HashLink>
                <HashLink smooth to="/#reseñas">RESEÑAS</HashLink>
              </>
            )}

        <div className="icono-perfil">
            <HashLink smooth to="/LoginPage#top">
            <FaUserCircle size={80}/>
            </HashLink>
        </div>
      </nav>
    </header>
    </>
  )
}

export default Navbar;