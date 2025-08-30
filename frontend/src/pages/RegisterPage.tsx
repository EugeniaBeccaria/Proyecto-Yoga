import AuthBanner from '../components/AuthBanner';
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


  //etiqueta de form en el componente RegisterFields para manejar el submit mejor
  return (
    <>
    <div className="contenedor-mechi">
      <div className="contenedor-inicio-sesion">
        <div className="contenedor-formulario-is" id="formulario-is"> 
            <RegisterFields />
            <LoginSocialButtons />
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