import './AuthBanner.css'

interface AuthBannerProps {
  className: string;
  message: string;
  imageSrc: string;
}

function AuthBanner({ className, message, imageSrc }: AuthBannerProps) {
  return (
    <>
    <div className={className}>
      <div className="forma forma1"></div>
      <div className="forma forma2"></div>
      <div className="forma forma3"></div>
      <h1>Bienvenido/a a <span>Shanti Yoga</span></h1>
      <p>{message}</p>
      <img src={imageSrc} alt="Banner de Shanti Yoga" />
    </div>
    </>
  );
}

export default AuthBanner;