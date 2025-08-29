import './TestimonialCard.css'

interface Testimonial {
  name: string;
  image: string;
  text: string;
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="card">
      <img src={testimonial.image} alt={testimonial.name} />
      <div className="contenido-texto-card">
        <h4>{testimonial.name}</h4>
        <p>{testimonial.text}</p>
      </div>
    </div>
  );
}

export default TestimonialCard;