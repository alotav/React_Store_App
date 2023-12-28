import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="aboutus">
      <div>
        <h2>Sobre Nosotros</h2>
        <h3>¡Bienvenido/a a Shop Cart!</h3>
        <p>
          Shop Cart va más allá de ser simplemente una plataforma de compras; es
          el proyecto final de React desarrollado como parte del curso ofrecido
          por Alkemy. Cada producto en nuestra tienda proviene de fakestoreapi,
          lo que significa que son productos ficticios creados con fines
          prácticos.
        </p>
        <p>
          Sientete libre de comprar, todo es gratis!{" "}
          <i className="fa-regular fa-face-smile"></i>
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
