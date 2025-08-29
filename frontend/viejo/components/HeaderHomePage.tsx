import { Link } from 'react-router-dom';
import './HeaderHomePage.css';

function HeaderHomePage() {
  return (
    <header>
      <nav>
        <Link to="/iniciar-sesion">Iniciar Sesión</Link>
        <Link to="/choose-role">Registrarse</Link>
      </nav> 
      <section className="textos-header">
            <h1>Shanti Yoga</h1>
            <h2>Tu momento de paz comienza aquí</h2>
      </section>
      <div className="wave" style={{height: '150px', overflow: 'hidden'}} ><svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{height: '100%', width: '100%'}}><path d="M0.00,49.85 C150.00,149.60 349.20,-49.85 500.00,49.85 L500.00,149.60 L0.00,149.60 Z" style={{stroke: 'none', fill:'#daebfb'}}></path></svg></div>
    </header>
  );
}

export default HeaderHomePage;