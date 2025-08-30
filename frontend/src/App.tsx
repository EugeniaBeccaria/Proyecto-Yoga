import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
/*import Footer from './components/Footer.tsx';*/
import "./styles/HomePage.css"


function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  )
}

export default App