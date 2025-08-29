import './RoleCard.css';
import { Link } from 'react-router-dom';

interface RoleCardProps {
  title: string;
  imageSrc: string;
  description: string;
  buttonText: string;
  link: string;
}

function RoleCard({ title, imageSrc, description, buttonText, link }: RoleCardProps) {
  return (
    <div className="tarjeta">
      <h3>{title}</h3>
      <img src={imageSrc} alt={`Imagen de ${title}`} />
      <p>{description}</p>
      <nav>
        <Link to={link} className="boton-tarjeta">{buttonText}</Link>
      </nav>
    </div>
  );
}

export default RoleCard;