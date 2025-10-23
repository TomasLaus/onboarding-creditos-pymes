import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './SolicitarUno.css'
import { sanitizeMinMax, sanitizeNumberInput } from '../../utils/number-utils'
import { parseToFloat } from '../../utils/number-utils'
import { useAppContext } from '../../context/appContext'

const rellenarDatosTesting = (userData, rellenar = true) => {
  if (rellenar) {
    return {
      producto: 'capital-trabajo', // debe coincidir con <option value="capital-trabajo">
      idFiscal: userData.taxId,
      moneda: 'peso', // debe coincidir con <option value="peso">
      ventas: 'rango3', // elegí el rango que quieras mostrar como preseleccionado
      monto: parseFloat(50000),
      plazo: parseInt(12),
      tipoDocumento: 'dni', // coincide con <option value="dni">
      numDocumento: '12345678',
      nombre: userData.legalName,
      celular: userData.phone,
      email: userData.email,
      aceptaDatos: true,
      aceptaTerminos: true
    }
  }
}

const CreditForm = () => {
  const URL_BACKEND =
    import.meta.env.VITE_NODE_ENV === 'production'
      ? import.meta.env.VITE_BACKEND_PRODUCTION
      : import.meta.env.VITE_BACKEND_LOCAL
  const navigate = useNavigate()

  const { userData, setCreditApplicationData } = useAppContext()

  //testing
  const [formData, setFormData] = useState({})
  useEffect(() => {
    if (userData) {
      setFormData(rellenarDatosTesting(userData))
    }
  }, [])
  //endtesting

  // const [formData, setFormData] = useState({
  //   producto: '',
  //   idFiscal: userData.taxId,
  //   moneda: '',
  //   ventas: '',
  //   monto: '',
  //   plazo: '',
  //   tipoDocumento: '',
  //   numDocumento: '',
  //   nombre: userData.legalName,
  //   celular: userData.phone,
  //   email: userData.email,
  //   aceptaDatos: false,
  //   aceptaTerminos: false
  // })

  const formdataToSend = {
    companyId: userData.idCompany,
    product: formData.producto,
    coin: parseFloat(formData.moneda),
    monthlySales: parseInt(formData.ventas),
    tipoDni: formData.tipoDocumento,
    dni: formData.numDocumento,
    fullname: formData.nombre,
    amount: formData.monto,
    termMonths: formData.plazo
  }

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')

  // --- Manejo de cambios en los campos del formulario---
  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Limpia el error de ese campo si el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: null
      }))
    }
  }

  // formateo de monto al escribir
  const formatMonto = e => {
    const sanitized = sanitizeNumberInput(e.target.value)
    const floatValue = parseToFloat(sanitized)
    setFormData(prev => ({
      ...prev,
      [e.target.name]: floatValue
    }))
  }

  //formateo plazo al escribir
  const formatPlazo = e => {
    const sanitized = sanitizeMinMax(e.target.value)
    setFormData(prev => ({
      ...prev,
      [e.target.name]: sanitized
    }))
  }

  // validación simple antes de enviar
  const validateForm = () => {
    const newErrors = {}
    if (!formData.producto) newErrors.producto = 'Seleccione un producto'
    if (!formData.idFiscal) newErrors.idFiscal = 'Ingrese el ID Fiscal'
    if (!formData.moneda) newErrors.moneda = 'Elija una moneda'
    if (!formData.ventas) newErrors.ventas = 'Seleccione las ventas'
    if (!formData.monto) newErrors.monto = 'Ingrese un monto'
    if (!formData.plazo) newErrors.plazo = 'Ingrese un plazo'
    if (!formData.tipoDocumento)
      newErrors.tipoDocumento = 'Seleccione tipo de documento'
    if (!formData.numDocumento)
      newErrors.numDocumento = 'Ingrese número de documento'
    if (!formData.nombre) newErrors.nombre = 'Ingrese su nombre'
    if (!formData.celular) newErrors.celular = 'Ingrese su celular'
    if (!formData.email) newErrors.email = 'Ingrese su email'
    if (!formData.aceptaDatos)
      newErrors.aceptaDatos = 'Debe aceptar el tratamiento de datos'
    if (!formData.aceptaTerminos)
      newErrors.aceptaTerminos = 'Debe aceptar los términos'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // función para guardar los datos

  const handleSave = async e => {
    e.preventDefault()
    setServerError('')
    setErrors({})

    const isValid = validateForm()
    if (!isValid) {
      setServerError('Por favor, complete todos los campos obligatorios.')
      return
    }

    setLoading(true)
    console.log('Guardando datos:', formData)

    try {
      // Aquí se coloca el endpoint del backend.
      const response = await axios.post(
        `${URL_BACKEND}/api/credit-applications`,
        formdataToSend
      )

      console.log('Respuesta del servidor:', response.data)
      setCreditApplicationData({ idCreditApplication: response.data.id })
      alert('¡Datos guardados con éxito!')
      handleContinue()
    } catch (error) {
      console.error('Error al guardar los datos:', error)
      if (error.response) {
        setServerError(
          `Error del servidor: ${error.response.data.message || error.message}`
        )
      } else if (error.request) {
        setServerError('Error de conexión. Por favor, revise su red.')
      } else {
        setServerError('Ocurrió un error inesperado al guardar.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleContinue = () => {
    navigate('/dashboard/solicitud-dos')
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Ingresa los datos para tu solicitud de crédito</h2>
        <p>Paso 1 de 3</p>
        <div className="stepper">
          <span className="step active"></span>
          <span className="step"></span>
          <span className="step"></span>
        </div>
      </div>

      {/* --- Mensaje de error del servidor--- */}
      {serverError && (
        <div
          className="form-error-general"
          style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}
        >
          {serverError}
        </div>
      )}

      <form>
        {/* --- Sección 1: Producto --- */}
        <h3>Elige tu producto</h3>

        <div className="form-group">
          <label htmlFor="producto">Seleccione un producto</label>
          <select
            id="producto"
            name="producto"
            value={formData.producto}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar</option>
            <option value="capital-trabajo">Capital de trabajo</option>
            <option value="compra-deuda">Compra de deuda</option>
            <option value="pago-credito">Pago de crédito</option>
          </select>
          {errors.producto && (
            <small className="form-error-field" style={{ color: 'red' }}>
              {errors.producto}
            </small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="idFiscal">ID Fiscal ( RUT / CUIT )</label>
          <input
            type="text"
            id="idFiscal"
            name="idFiscal"
            placeholder="Ej: 20154025201"
            value={formData.idFiscal}
            onChange={handleChange}
            required
          />
          {errors.idFiscal && (
            <small className="form-error-field" style={{ color: 'red' }}>
              {errors.idFiscal}
            </small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="moneda">Elije moneda</label>
          <select
            id="moneda"
            name="moneda"
            value={formData.moneda}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar moneda</option>
            <option value="dolares">Dólares</option>
            <option value="peso">Peso</option>
          </select>
          {errors.moneda && (
            <small className="form-error-field" style={{ color: 'red' }}>
              {errors.moneda}
            </small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="ventas">Ventas promedio mensuales</label>
          <select
            id="ventas"
            name="ventas"
            value={formData.ventas}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar rango</option>
            <option value="rango1">Menos de $ 3,000.00</option>
            <option value="rango2">$ 3,000.00 - $ 15,000.00</option>
            <option value="rango3">$ 15,000.00 - $ 60,000.00</option>
            <option value="rango4">$ 60,000.00 - $ 90,000.00</option>
            <option value="rango5">$ 90,000.00 - $ 200,000.00</option>
            <option value="rango6">Más de $ 200,000.00</option>
          </select>
          {errors.ventas && (
            <small className="form-error-field" style={{ color: 'red' }}>
              {errors.ventas}
            </small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="monto">Digite el monto a solicitar</label>
          <input
            type="number"
            id="monto"
            name="monto"
            placeholder="Ej: 5000"
            value={formData.monto}
            onChange={formatMonto}
            required
          />
          {errors.monto && (
            <small className="form-error-field" style={{ color: 'red' }}>
              {errors.monto}
            </small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="plazo">¿Por cuanto tiempo? (meses)</label>
          <input
            type="number"
            id="plazo"
            name="plazo"
            placeholder="Ej: 24"
            value={formData.plazo}
            onChange={formatPlazo}
            min="1"
            max="120"
            required
          />
          <small className="form-helper-text">
            Min. 1 mes - Max. 120 meses
          </small>
          {errors.plazo && (
            <small
              className="form-error-field"
              style={{ color: 'red', display: 'block' }}
            >
              {errors.plazo}
            </small>
          )}
        </div>

        <h3>Datos de contacto</h3>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="tipoDocumento">Tipo de documento</label>
            <select
              id="tipoDocumento"
              name="tipoDocumento"
              value={formData.tipoDocumento}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar</option>
              <option value="dni">DNI</option>
              <option value="ce">Carné de extranjería</option>
              <option value="permisoTemporal">
                Permiso Temporal de Permanencia
              </option>
            </select>
            {errors.tipoDocumento && (
              <small className="form-error-field" style={{ color: 'red' }}>
                {errors.tipoDocumento}
              </small>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="numDocumento">Ingrese número de documento</label>
            <input
              type="text"
              id="numDocumento"
              name="numDocumento"
              placeholder="Ej: 12345678"
              value={formData.numDocumento}
              onChange={handleChange}
              required
            />
            {errors.numDocumento && (
              <small className="form-error-field" style={{ color: 'red' }}>
                {errors.numDocumento}
              </small>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="nombre">Ingrese su nombre y apellido</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Ej: Juan Pérez"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          {errors.nombre && (
            <small className="form-error-field" style={{ color: 'red' }}>
              {errors.nombre}
            </small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="celular">Ingrese su número de celular</label>
          <input
            type="tel"
            id="celular"
            name="celular"
            placeholder="Ej: +51 9XXXXXXXX"
            value={formData.celular}
            onChange={handleChange}
            required
          />
          {errors.celular && (
            <small className="form-error-field" style={{ color: 'red' }}>
              {errors.celular}
            </small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Ingrese su email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Ej: nombre@empresa.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && (
            <small className="form-error-field" style={{ color: 'red' }}>
              {errors.email}
            </small>
          )}
        </div>

        {/* --- cajas para aceptación de términos y condiciones --- */}
        <div className="form-group-checkbox">
          <input
            type="checkbox"
            id="aceptaDatos"
            name="aceptaDatos"
            checked={formData.aceptaDatos}
            onChange={handleChange}
            required
          />
          <label htmlFor="aceptaDatos">
            He leído y acepto el Tratamiento de datos personales
          </label>
          {errors.aceptaDatos && (
            <small
              className="form-error-field"
              style={{ color: 'red', display: 'block' }}
            >
              {errors.aceptaDatos}
            </small>
          )}
        </div>

        <div className="form-group-checkbox">
          <input
            type="checkbox"
            id="aceptaTerminos"
            name="aceptaTerminos"
            checked={formData.aceptaTerminos}
            onChange={handleChange}
            required
          />
          <label htmlFor="aceptaTerminos">
            Acepto los Términos y condiciones
          </label>
          {errors.aceptaTerminos && (
            <small
              className="form-error-field"
              style={{ color: 'red', display: 'block' }}
            >
              {errors.aceptaTerminos}
            </small>
          )}
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-save"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                <p>Subiendo archivos...</p>
              </>
            ) : (
              'Continuar'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreditForm
