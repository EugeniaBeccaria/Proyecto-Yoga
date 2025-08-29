interface SocialButtonProps {
  platform: string;
  logoSrc: string;
}

function SocialButton({ platform, logoSrc }: SocialButtonProps) {
  return (
    <a href="#" className={platform}>
      <img src={logoSrc} alt={'${platform} logo'} />
      <span>{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
    </a>
  );
}

export default SocialButton;