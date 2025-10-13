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
  const dft = (isProfessor === false && isAdmin === false && isClient === false) === true;


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
          <HashLink smooth to="/ProfessorDashboard">
            VER ALUMNOS
          </HashLink>
        }

        {/* CLIENT MENU (default menu will also be showed)*/}
        {isClient && !disable &&
          <HashLink smooth to="/MyClassesPage">
            MIS CLASES
          </HashLink>
        }


        {/* DEFAULT MENU */}
        {dft && !disable &&
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