import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx'
import Footer from './components/Footer.tsx';
import Navbar from './components/Navbar.tsx';
import { useState, useEffect } from "react";

interface User{
  id: number,
  email:string,
  role:string
}

function App() {

  const [user ,setUser] = useState<User>({  
    id: 0,
    email:'',
    role:''})
  
  useEffect(()=>{
  const userSerializado = localStorage.getItem('user')
  if (userSerializado){
    const userSave = JSON.parse(userSerializado)
    setUser({
      id:userSave.id,
      email:userSave.email,
      role:userSave.role
    });
  }},[])
  
  console.log(user)
  let isAdmin = false
  let isProfessor = false
  if(user.role === 'admin'){
    isAdmin = true
  }
  if(user.role === "professor"){
    isProfessor = true
  }


  return (
    <>
      <Navbar isAdmin={isAdmin} isProfessor={isProfessor}/>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/RegisterPage" element={<RegisterPage />}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App