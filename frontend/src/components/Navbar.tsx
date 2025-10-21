import { FaUserCircle } from "react-icons/fa";
import "../styles/Navbar.css"
import { HashLink } from 'react-router-hash-link';
import { useEffect, useState, useRef } from "react";

interface User{
  id: number,
  email:string,
  role:string
}

function Navbar() {
  const hasFetched = useRef(false); // ← Para evitar doble fetch debido al strict mode 
  const [showed, setShowed] = useState<boolean>(false)
  const [user ,setUser] = useState<User>({  
    id: 0,
    email:'',
    role:''})

  async function loadUser(){
    const userSerializado = localStorage.getItem('user')
    if (userSerializado){
      const userSave = JSON.parse(userSerializado)
      setUser({
        id:userSave.id,
        email:userSave.email,
        role:userSave.role
      });
    }
  }
  
  useEffect(()=>{
    loadUser()
  },[])
  
  useEffect(()=>{
    if (hasFetched.current) return;
    hasFetched.current = true;
  },[user])
  
  let isAdmin = false
  let isProfessor = false
  let isClient = false
  if(user.role === 'admin'){
    isAdmin = true
  }
  if(user.role === "professor"){
    isProfessor = true
  }
  if(user.role === "client"){
    isClient = true
  }
  
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
        {isAdmin && (
          <>
          <div className="paste-button">
            <HashLink className="button" onClick = {()=>{setShowed(!showed)}}>
              ▼ GESTIONAR CLASES 
            </HashLink>
            <div className="dropdown-content">
            {showed &&
                    <>
                      <HashLink id="top" smooth to="/CreateClassPage#top" >
                          CREAR CLASES
                      </HashLink>                
                      <HashLink id="middle" smooth to="/UpdateClassPage#top">
                          ACTUALIZAR CLASES
                      </HashLink>            
                      <HashLink id="bottom" smooth to="/DeleteClassPage#top">
                          ELIMINAR CLASES
                      </HashLink>   
                    </>
              }
            </div>
          </div>

          <HashLink smooth to="/CreateTallerPage#crearTalleres">
            CREAR TALLERES
          </HashLink>
          <HashLink smooth to="/MembershipPage#top">
            GESTIONAR MEMBRESÍAS
          </HashLink>
          <HashLink smooth to="/MembershipPage#top">
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
              <HashLink smooth to="/#nosotros">NOSOTROS</HashLink>
              <HashLink smooth to="/clases">CLASES</HashLink>
              <HashLink smooth to="/talleres">TALLERES</HashLink>
              <HashLink smooth to="/#reseñas">RESEÑAS</HashLink>
              <HashLink smooth to="/MyClassesPage">
              MIS CLASES
              </HashLink>
            </>
        }


            {/* DEFAULT MENU */}
            {dft && (
              <>
                <HashLink smooth to="/#nosotros">NOSOTROS</HashLink>
                <HashLink smooth to="/clases">CLASES</HashLink>
                <HashLink smooth to="/talleres">TALLERES</HashLink>
                <HashLink smooth to="/MembershipPage#top" className="link-membresia">
                  MI MEMBRESÍA
                </HashLink>


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