import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import Register from './pages/RegisterPage.tsx'
/*import Footer from './components/Footer.tsx';*/
import "./styles/HomePage.css"



function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/RegisterPage" element={<Register />}/>
      </Routes>
    </>
  )
}

export default App