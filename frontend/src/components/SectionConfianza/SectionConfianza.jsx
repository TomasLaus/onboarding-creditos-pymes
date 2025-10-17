import './SectionConfianza.css';

// Importación de imagenes:
import logoSantander from '../../assets/01santander.png'; // Asegúrate de ajustar la ruta a tus imágenes
import logoFalabella from '../../assets/02falabella.png';
import logoBBVA from '../../assets/03bbva.png';
import logoMacro from '../../assets/04macro.png';
import logoSecure from '../../assets/05secure.png';

const SectionConfianza = () => {
  return (
    <section className="section-confianza">
<<<<<<< HEAD
      <h2 className="confianza-title">Conviértete en uno de nuestros aliados estratégicos</h2>
      <p className="confianza-subtitle">Te acompañamos en cada paso — validación rápida y respuesta en 24h</p>
=======
      <h2 className="confianza-title">"Confianza y Respaldo"</h2>
      <p className="confianza-subtitle">Respaldados por regulación SBS y aliados estratégicos</p>
>>>>>>> main
      <div className="logos-container">
        <img src={logoSantander} alt="Logo Santander" className="logo" />
        <img src={logoFalabella} alt="Logo Banco Falabella" className="logo" />
        <img src={logoBBVA} alt="Logo BBVA" className="logo" />
        <img src={logoMacro} alt="Logo Banco Macro" className="logo" />
        <img src={logoSecure} alt="Logo Secure SSL Encryption" className="logo" />
      </div>
<<<<<<< HEAD
      <p className="confianza-footer">+500 PYMES ya obtuvieron financiamiento con nuestra plataforma</p>
=======
      <p className="confianza-footer">Más de 500 PYMES ya confían en nosotros</p>
>>>>>>> main
    </section>
  );
};

export default SectionConfianza;