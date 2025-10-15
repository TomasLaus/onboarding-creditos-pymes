import React, { useState } from 'react'
import { GoPlus, GoDash } from "react-icons/go";
import './SectionPreguntas.css'

const faqs = [
    {
        q: "¿Qué requisitos necesito para solicitar un crédito?",
        a: "Solo necesitas tu RUC activo, DNI del representante legal y los estados financieros recientes de tu empresa.Todo se sube de forma digital, sin trámites presenciales.",
    },
    {
        q: "¿Cuánto tiempo demora la aprobación?",
        a: "Nuestro proceso de evaluación es 100 % digital. En promedio, obtendrás una respuesta entre 24 y 72 horas hábiles, según el monto solicitado.",
    },
    {
        q: "¿Cómo sé si mi empresa califica?",
        a: "Durante el registro realizamos una pre-evaluación automática con tus datos del RUC y la información básica de tu empresa.",
    },
    {
        q: "¿Es seguro compartir mis datos?",
        a: "Sí, en Fintech Pyme utiliza cifrado de datos y cumple con las normas de protección de información financiera (KYC/AML). Tu información está protegida en todo momento.",
    },
    {
        q: "¿Qué monto máximo puedo solicitar?",
        a: "Los montos dependen del perfil financiero de tu empresa.Ofrecemos créditos desde S/ 10,000 hasta S/ 200,000, con plazos flexibles y tasas personalizadas.",
    },
];

const Preguntas = () => {

    const [open, setOpen] = useState(null);

    return (

        <div className='faq'>
            <h2>Preguntas frecuentes</h2>
            {faqs.map((item, i) => (
                <div key={i} className={`faq-item ${open === i ? "open" : ""}`}>
                    <button onClick={() => setOpen(open === i ? null : i)}>
                        <span>{item.q}</span>
                        {open === i ? (
                            <GoDash className="faq-icon" />
                        ) : (
                            <GoPlus className="faq-icon" />
                        )}
                    </button>
                    {open === i && <p>{item.a}</p>}
                </div>
            ))}

            <div className="faq-contact">
                <h3>¿Más dudas?</h3>
                <a href="#contacto">Ponte en contacto con Nosotros</a>
            </div>
        </div>

    )
}

export default Preguntas