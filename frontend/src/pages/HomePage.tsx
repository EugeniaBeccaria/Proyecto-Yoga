import AboutUs from '../components/AboutUs.tsx';
import TestimonialCard from '../components/TestimonialCard';
import HeaderHomePage from '../components/HeaderHomePage.tsx';
import { useEffect } from 'react';
import './HomePage.css';


const testimonialsData = [
  {
    name: 'Lucía',
    image: '/img/Persona1.jpg',
    text: '“Desde que empecé en Shanti Yoga, siento que tengo un espacio solo para mí. Las clases son súper variadas, los profesores transmiten mucha paz y profesionalismo, y me encanta poder reservar todo desde la web sin complicaciones. Es mi momento favorito de la semana.”',
  },
  {
    name: 'Manuel',
    image: '/img/Persona3.jpg',
    text: '“Llegué al estudio buscando mejorar mi postura y terminé encontrando mucho más. En Shanti Yoga me sentí cómodo desde el primer día. Los salones son amplios, el ambiente es cálido y se nota que cada clase está pensada con dedicación. Recomiendo especialmente los talleres, son muy completos.”',
  },
  {
    name: 'Juana',
    image: '/img/Persona2.jpg',
    text: '“Lo que más valoro de Shanti Yoga es la flexibilidad: hay clases para distintos niveles, los horarios se adaptan a mi rutina y las membresías son accesibles. Me encanta venir a practicar y salir con una energía totalmente renovada. Es un lugar que se siente como un refugio.”',
  },
];

function HomePage() {
  useEffect(() => {
    document.body.classList.add('body-inicio');
    return () => {
      document.body.classList.remove('body-inicio');
    };
  }, []);

  return (
    <>
    <HeaderHomePage />
    <AboutUs />
      <section className="contenedor"> {/*decía <section className="contenedor clientes">, borré clientes*/}
        <h2 className="titulo">La experiencia de conectar cuerpo, mente y alma</h2>
        <div className="cards">
          {testimonialsData.map(testimonial => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
      </section>
    </>
  );
}

export default HomePage;