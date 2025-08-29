import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import Footer from './components/Footer.tsx';


function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<HomePage />} />
      </Routes>
    <Footer />
    </>
  )
}

export default App