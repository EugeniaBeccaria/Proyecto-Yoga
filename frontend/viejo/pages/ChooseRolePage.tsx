import { useEffect }  from 'react';
import './ChooseRolePage.css';
import RoleCard from '../../viejo/components/RoleCard';

function ChooseRolePage() {
useEffect(() => {
    document.body.classList.add('body-registrar');
    return () => {
      document.body.classList.remove('body-registrar');
    };
  }, []);

  return (
    <>
    <header>
        <h2>Elegí tu rol en este viaje</h2>
        <p>Elegí el camino que vas a recorrer. Ingresá como profesor/a o alumno/a.</p>
    </header>
    <main className="contenedor-tarjetas">
      <RoleCard
        title="PROFESOR"
        imageSrc="/img/Tarjeta2.png"
        description="Desde la enseñaza, quiero conectar."
        buttonText="Crear cuenta como profesor/a"
        link="/registrarse"
      />
      <RoleCard
        title="ALUMNO"
        imageSrc="/img/Tarjeta1.png"
        description="Estoy buscando un momento para mí."
        buttonText="Crear cuenta como alumno/a"
        link="/registrarse"
      />
    </main>
    </>
  )
}

export default ChooseRolePage;