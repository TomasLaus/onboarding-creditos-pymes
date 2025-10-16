import './SectionBeneficios.css';
import { FiZap } from 'react-icons/fi';
import { IoPhonePortraitOutline, IoLockClosedOutline, IoEyeOutline } from 'react-icons/io5';

const beneficios = [
  {
    icon: <FiZap />,
    title: 'Rápido',
    description: 'Descubre una variedad de productos únicos y personalizados hechos con',
  },
  {
    icon: <IoPhonePortraitOutline />,
    title: '100% digital',
    description: 'Descubre una variedad de productos únicos y personalizados hechos con',
  },
  {
    icon: <IoLockClosedOutline />,
    title: 'Seguro',
    description: 'Descubre una variedad de productos únicos y personalizados hechos con',
  },
  {
    icon: <IoEyeOutline />,
    title: 'Transparente',
    description: 'Descubre una variedad de productos únicos y personalizados hechos con',
  },
];

const SectionBeneficios = () => {
  return (
    <section className="section-beneficios">
      <h2 className="beneficios-title">Beneficios para tu PYME</h2>
      <div className="beneficios-container">
        {beneficios.map((beneficio, index) => (
          <div key={index} className="beneficio-card">
            <div className="icon-circle">
              {beneficio.icon}
            </div>
            <h3 className="beneficio-card-title">{beneficio.title}</h3>
            <p className="beneficio-card-description">{beneficio.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SectionBeneficios;