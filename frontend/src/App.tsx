import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer.tsx';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ChooseRolePage from './pages/ChooseRolePage.tsx';
import RegisterPage from './pages/RegisterPage';


function App() {
  return (
    <>
    <div className="app-container">
      <div className="content-container">
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/iniciar-sesion" element={<LoginPage />} />
              <Route path="/choose-role" element={<ChooseRolePage />} />
              <Route path="/registrarse" element={<RegisterPage />} />
          </Routes>
      <Footer />
      </div>
    </div>
    </>
  )
}

export default App