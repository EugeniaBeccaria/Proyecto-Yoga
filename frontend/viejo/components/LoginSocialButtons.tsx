import SocialButton from './SocialButton.tsx';
import './LoginSocialButtons.css'

function LoginSocialButtons() {
  return (
    <>
    <div className="linea">
      <span>O</span>
    </div>
    <div className="otros-inicios-sesion">
      <SocialButton platform="google" logoSrc="/img/googleTransparente.png" />
      <SocialButton platform="facebook" logoSrc="/img/facebook.png" />
      <SocialButton platform="apple" logoSrc="/img/appleTransparente.png" />
    </div>
    </>
  );
}

export default LoginSocialButtons;