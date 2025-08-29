import LoginSocialButtons from "../../viejo/components/LoginSocialButtons.tsx";
import AuthBanner from "../../viejo/components/AuthBanner.tsx";
import LoginFields from "../../viejo/components/LoginFields.tsx";
import { useEffect } from 'react';
import './LoginPage.css'
import { Link } from "react-router-dom";

function LoginPage() {
  useEffect(() => {
    document.body.classList.add('body-inicio-sesion');
    return () => {
      document.body.classList.remove('body-inicio-sesion');
    };
  }, []);

  return (
    <>
    <div className="contenedor-mechi">
      <div className="contenedor-inicio-sesion">
        <div className="contenedor-formulario-is" id="formulario-is">
          <form action="">
              <h2>Inicio de Sesión</h2>
              <p>¿No tienes una cuenta? <Link to="/registrarse" className="a-registrarse">¡Crea una!</Link></p>
              <LoginFields />
              <LoginSocialButtons />
          </form>
        </div>
        <AuthBanner
          className="banner"
          message="Bienvenido/a de nuevo. Inicia sesión para continuar con tu práctica."
          imageSrc="/img/BannerTransparente.png"
        />
      </div>
    </div>
    </>
  );
}

export default LoginPage;