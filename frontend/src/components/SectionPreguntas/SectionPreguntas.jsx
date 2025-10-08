import React, { useState } from 'react'
import { GoPlus, GoDash } from "react-icons/go";
import './SectionPreguntas.css'

const faqs = [
    {
        q: "¿Puedo cancelar o reprogramar una sesión?",
        a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        q: "¿Puedo cancelar o reprogramar una sesión?",
        a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        q: "¿Puedo cancelar o reprogramar una sesión?",
        a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    },
    {
        q: "¿Puedo cancelar o reprogramar una sesión?",
        a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    },
    {
        q: "¿Puedo cancelar o reprogramar una sesión?",
        a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
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