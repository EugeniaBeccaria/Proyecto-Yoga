interface SocialButtonProps {
  platform: string;
  logoSrc: string;
  onClick: () => void; 
}

function SocialButton({ platform, logoSrc, onClick }: SocialButtonProps) {
  return (
    <button 
      type="button" 
      className={platform} 
      onClick={(e) => {
        e.preventDefault(); 
        onClick(); 
      }}
    >
      <img src={logoSrc} alt={`${platform} logo`} /> 
      <span>{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
    </button>
  );
}

export default SocialButton;