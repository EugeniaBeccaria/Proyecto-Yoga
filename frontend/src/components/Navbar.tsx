import { FaUserCircle } from "react-icons/fa";
import "../styles/Navbar.css"
import { HashLink } from 'react-router-hash-link';
import LogoIcon from './LogoIcon';


type NavbarProps = {
  disable?: boolean,
  isAdmin?:boolean
  isProfessor?:boolean
  isClient?:boolean
};

function Navbar({disable,isAdmin,isProfessor,isClient}:NavbarProps) {
  const dft = (isProfessor === false && isAdmin === false) === true;


  return (
    <>
    <header className="navbar">
      <div className="nav-left">
        <HashLink smooth to="/#top">
          <LogoIcon size={100} className="logo" />
        </HashLink>
      </div>

      <nav className="nav-right">
        {/* ADMIN MENU */}
        {isAdmin && !disable &&
        (<>
          <HashLink smooth to="/CreateClassPage#top">
            CREAR CLASES
          </HashLink>
          <HashLink smooth to="/CreateTallerPage#crearTalleres">
            CREAR TALLERES
          </HashLink>
          <HashLink smooth to="/MembershipPage#top">
            GESTIONAR MEMBRESÍAS
          </HashLink>
        </>)
        }
        {/* PROFESSOR MENU */}
        {isProfessor && !disable &&
          <HashLink smooth to="/professor/dashboard#top">
            MI PANEL
          </HashLink>
        }

        {/* CLIENT MENU (default menu will also be showed)*/}
        {isClient && !disable &&
          <HashLink smooth to="/MyClassesPage">
            MIS CLASES
          </HashLink>
        }


            {/* DEFAULT MENU */}
            {dft && !disable && (
              <>
                <HashLink smooth to="/#nosotros">NOSOTROS</HashLink>
                <HashLink to="/clases">CLASES</HashLink>
                <HashLink to="/talleres">TALLERES</HashLink>
                <HashLink smooth to="/#reseñas">RESEÑAS</HashLink>
              </>
            )}


        <div className="icono-perfil">
            <HashLink smooth to="/LoginPage#top">
            {disable ? '' : <FaUserCircle size={80}/>}
            </HashLink>
        </div>
      </nav>
    </header>
    </>
  )
}

export default Navbar;