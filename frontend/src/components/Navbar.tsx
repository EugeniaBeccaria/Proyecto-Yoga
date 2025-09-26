import { FaUserCircle } from "react-icons/fa";
import "../styles/Navbar.css"
import { HashLink } from 'react-router-hash-link';


type NavbarProps = {
  disable?: boolean,
  isAdmin?:boolean
  isProfessor?:boolean
  isClient?:boolean
};

function Navbar({disable,isAdmin,isProfessor,isClient}:NavbarProps) {
  
  return (
    <>
    <header className="navbar">
      <div className="nav-left">
        <HashLink smooth to="/#top">
          <img src="/LogoShantiYoga.png" alt="Logo Shanti Yoga" className="logo" />
        </HashLink>
      </div>

      <nav className="nav-right">
        {/* ADMIN MENU */}
        {isAdmin &&
        (<>
          <HashLink smooth to="/createClassPage">
            CREAR CLASES
          </HashLink>
          <HashLink smooth to="/crearTalleres">
            CREAR TALLERES
          </HashLink>
          <HashLink smooth to="/manageMembershipPage">
            GESTIONAR MEMBRESÍAS
          </HashLink>
        </>)
        }
        {/* PROFESSOR MENU */}
        {isProfessor &&
          <HashLink smooth to="/professorDashboard">
            VER ALUMNOS
          </HashLink>
        }

        {/* CLIENT MENU (default menu will also be showed)*/}
        {isClient &&
          <HashLink smooth to="/myClassesPage">
            MIS CLASES
          </HashLink>
        }


        {/* DEFAULT MENU */}
        {isProfessor === false && isAdmin === false &&
        (<>
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
        </>)
        }

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