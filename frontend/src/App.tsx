import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx'
import Footer from './components/Footer.tsx';
import Navbar from './components/Navbar.tsx';

function App() {
  return (
    <>
      <Navbar/>
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