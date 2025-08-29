import AuthBanner from '../components/AuthBanner.tsx';
import { useEffect } from 'react';
import './RegisterPage.css'
import RegisterFields from '../components/RegisterFields.tsx';
import LoginSocialButtons from '../components/LoginSocialButtons.tsx';


function RegisterPage() {
  useEffect(() => {
    document.body.classList.add('body-registro');
    return () => {
      document.body.classList.remove('body-registro');
    };
  }, []);

  return (
    <>
    <div className="contenedor-mechi">
      <div className="contenedor-inicio-sesion">
        <div className="contenedor-formulario-is" id="formulario-is">
          <form className="formulario-registro" action="" id="formulario-registro">
            <RegisterFields />
            <LoginSocialButtons />
          </form>
        </div>
        <AuthBanner
            className="banner-registro"
            message="Damos el primer paso juntos/as. Creá tu cuenta."
            imageSrc="/img/BannerTransparente1.png"
          />
      </div>
    </div>
    </>
  );
}

export default RegisterPage;