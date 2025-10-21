import React, { useState } from 'react'
import { GoPlus, GoDash } from "react-icons/go";
import './SectionPreguntas.css'

const faqs = [
    {
        q: "¿Qué requisitos necesito para solicitar un crédito?",
        a: "Necesitas el ID Fiscal activo (TIN, RUC, CUIT, RUT, NIT) activo, el DNI del representante legal y los estados financieros recientes. Todo 100% online.",
    },
    {
        q: "¿Cuánto tiempo demora la aprobación?",
        a: "El proceso es 100% digital. En promedio respondemos entre 24 y 72 horas hábiles, según el monto y la documentación.",
    },
    {
        q: "¿Cómo sé si mi empresa califica?",
        a: "Al registrarte hacemos una pre-evaluación automática con tu ID Fiscal e información básica. Te decimos al instante si puedes continuar con la solicitud.",
    },
    {
        q: "¿Es seguro compartir mis datos?",
        a: "Sí. Usamos cifrado en tránsito, aplicando procesos de información financiera para proteger tu información. Tus documentos serán accesibles solo por personal autorizado.",
    },
    {
        q: "¿Qué monto máximo puedo solicitar?",
        a: " Los montos dependen del perfil de tu empresa. Desde S/ 10,000 hasta S/ 200,000 — sujeto a evaluación según riesgo.",
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