import React from 'react'
import './SectionCasos.css'

const casos = [
    {
        mensaje: 'Intentamos probar otras  instituciones financieras, pero el proceso era muy engorroso y las aprobaciones lentas. Encontramos en Lorem algo cercano y rápido.',
        nombre: 'Cris Hernández',
        empresa: 'Founder y CEO de Mapoteca',
        imagen: './ceo.png'
    }, {
        mensaje: 'Intentamos probar otras  instituciones financieras, pero el proceso era muy engorroso y las aprobaciones lentas. Encontramos en Lorem algo cercano y rápido.',
        nombre: 'Cris Hernández',
        empresa: 'Founder y CEO de Mapoteca',
        imagen: './ceo.png'
    }, {
        mensaje: 'Intentamos probar otras  instituciones financieras, pero el proceso era muy engorroso y las aprobaciones lentas. Encontramos en Lorem algo cercano y rápido.',
        nombre: 'Cris Hernández',
        empresa: 'Founder y CEO de Mapoteca',
        imagen: './ceo.png'
    }
]

const Casos = () => {
    return (
        <div>
            <h2 className='casosTitulo'>Casos de éxito</h2>
            <div className='casosContenedor'>
                {casos.map((caso, i) => (
                    <div key={i} className='casoCard'>
                        <p className='casoCard-mensaje'>{caso.mensaje}</p>
                        <img className='casoCard-imagen' src={caso.imagen} alt="Foto del CEO" />
                        <h3 className='casoCard-nombre'>{caso.nombre}</h3>
                        <span className='casoCard-empresa'>{caso.empresa}</span>
                    </div>
                ))}

            </div>
        </div>

    )
}

export default Casos