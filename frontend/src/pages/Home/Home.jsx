import Banner_home from "../../components/Banner_home/Banner_home.jsx";
import SectionConfianza from '../../components/SectionConfianza/SectionConfianza.jsx';
import SectionBeneficios from "../../components/SectionBeneficios/SectionBeneficios.jsx";
import SectionCasos from "../../components/SectionCasos/SectionCasos.jsx";
import SectionPreguntas from "../../components/SectionPreguntas/SectionPreguntas.jsx";
import "./Home.css";

function Home() {
  return (
    <>
      <Banner_home />
      <SectionConfianza />
      <SectionBeneficios /> 
      <SectionCasos />
      <SectionPreguntas />
    </>
  );
}

export default Home;
