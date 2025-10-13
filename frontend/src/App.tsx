import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
import Footer from './components/Footer.tsx';
import Navbar from './components/Navbar.tsx';
import HomePage from './pages/HomePage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx'
import CreateClassPage from './pages/admin/CreateClassPage.tsx';
import CreateTallerPage from './pages/admin/CreateTallerPage.tsx';
import MembershipPage from './pages/admin/MembershipPage.tsx';
import PrivateRoutes from './components/PrivateRoutes.tsx';
import AdminRoutes from './components/AdminRoutes.tsx';
import MyClassesPage from './pages/MyClassesPage.tsx';
import ProfessorRoutes from './components/professorRoutes.tsx';
import ProfessorDashboardPage from './pages/professor/professorDashboardPage.tsx';

interface User{
  id: number,
  email:string,
  role:string
}

function App() {
  const hasFetched = useRef(false); // ← Para evitar doble fetch debido al strict mode 
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


  return (
    <>
      <Navbar isAdmin={isAdmin} isProfessor={isProfessor} isClient={isClient}/>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/RegisterPage" element={<RegisterPage />}/>

            <Route path='/MyClassesPage' element={
              <PrivateRoutes>
                <MyClassesPage />
              </PrivateRoutes>
              } />

          <Route path="/CreateClassPage" 
          element={
            <AdminRoutes>
              <CreateClassPage />
            </AdminRoutes>
            }/>

          
          <Route path="/CreateTallerPage" element={
            <AdminRoutes>
              <CreateTallerPage />
            </AdminRoutes>
            } />

          <Route path="/MembershipPage" element={
            <AdminRoutes>
              <MembershipPage />
            </AdminRoutes>
            } />

          <Route path="/professor/dashboard" element={
            <ProfessorRoutes>
              <ProfessorDashboardPage />
            </ProfessorRoutes>
            } />

      </Routes>
      <Footer/>
    </>
  )
}

export default App