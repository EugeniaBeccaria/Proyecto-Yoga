import './AboutUs.css';

function AboutUs() {
  return (
    <>
    <section className="contenedor sobre-nosotros">
        <h2 className="titulo">Sobre Nosotros</h2>
        <div className="contenedor-sobre-nosotros">
            <img src="img/QuiSo.jpg" alt="Sobre Nosotros" className="imagen-sobre-nosotros"/>
            <div className="contenido-textos">
                <h3>¿Quiénes Somos?</h3>
                <p>En Shanti Yoga creemos en el poder del bienestar integral. Somos un espacio dedicado a la práctica del yoga en sus diferentes formas, con clases semanales guiadas por profesionales certificados y apasionados por lo que hacen. Además, ofrecemos talleres especiales de meditación, respiración y alineación corporal, para profundizar tu experiencia. Nuestro estudio cuenta con salones cómodos y equipados, y una plataforma online simple para que puedas reservar tu lugar y elegir la membresía que mejor se adapte a vos. Shanti Yoga es más que una clase: es un momento para volver a vos.</p>
                
            </div>
        </div>
    </section>
    </>
  )
}

export default AboutUs;