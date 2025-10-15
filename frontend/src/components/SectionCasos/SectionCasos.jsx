import './SectionCasos.css'


const casos = [
    {
        mensaje: '"Intentamos probar otras instituciones financieras, pero el proceso era muy engorroso y las aprobaciones lentas. Encontramos en FintechPyme cercano y rápido."',
        nombre: 'Cris Hernández',
        empresa: 'Founder y CEO de Mapoteca',
        imagen: './ceo.png'
    }, {
        mensaje: '"Antes teníamos que ir al banco varias veces para pedir un préstamo. Con FintechPyme lo hicimos todo online, validaron mi RUC y en dos días ya teníamos el prestamo."',
        nombre: 'Fredy Gutiérrez',
        empresa: 'Dueño de Textiles Andinos',
        imagen: './fredy.png'
    }, {
        mensaje: '"Gracias a FintechPyme pudimos ampliar nuestro local. El proceso fue súper rápido y digital, sin papeleos eternos. En una semana ya teníamos el crédito aprobado.”',
        nombre: 'Marta Cortéz',
        empresa: 'Fundadora de Delipan',
        imagen: './marta.png'
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