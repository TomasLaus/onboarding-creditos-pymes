import Banner_home from "../../components/Banner_home/Banner_home.jsx";
import SectionConfianza from '../../components/SectionConfianza/SectionConfianza.jsx';
import SectionBeneficios from "../../components/SectionBeneficios/SectionBeneficios.jsx";
import "./Home.css";

function Home() {
  return (
    <>
      <Banner_home />
      <SectionConfianza />
      <SectionBeneficios /> 
    </>
  );
}

export default Home;
