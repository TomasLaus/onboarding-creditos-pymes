import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { validateRut, validateCuit } from '../../utils/validators'
import './RegisterPage.css'
import Modalizar from '../../components/ModalMultiuso'

const RegisterPage = () => {
  const URL_BACKEND =
    import.meta.env.VITE_NODE_ENV === 'production'
      ? import.meta.env.VITE_BACKEND_PRODUCTION
      : import.meta.env.VITE_BACKEND_LOCAL

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    legalName: '',
    taxId: '',
    email: '',
    phone: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [erroresBackend, setErroresBackend] = useState('')
  const [showModal, setShowModal] = useState(false)

  const activarCuentaTemporal = async (token, email) => {
    const url = `${URL_BACKEND}/api/users/activate?token=${token}&email=${email}`
    try {
      const response = await fetch(url)
      const data = await response.json()
      return data
    } catch (err) {
      console.error(err)
    }
  }

  const validateField = async (name, value) => {
    let error = ''
    switch (name) {
      case 'legalName':
        if (!value) error = 'La razón social es obligatoria'
        break
      case 'taxId':
        if (!value) {
          error = 'El RUT/CUIT es obligatorio'
        } else if (!validateRut(value) && !validateCuit(value)) {
          //  error = 'El RUT o CUIT no es válido'
        }
        break
      case 'email':
        if (!value) {
          error = 'El correo electrónico es obligatorio'
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'El correo electrónico no es válido'
        }
        break
      case 'phone':
        if (!value) error = 'El teléfono es obligatorio'
        break
      case 'password':
        if (!value) {
          error = 'La contraseña es obligatoria'
        } else if (value.length < 8) {
          error = 'La contraseña debe tener al menos 8 caracteres'
        }
        break
      default:
        break
    }
    return error
  }

  const handleChange = async e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    const error = await validateField(name, value)
    setErrors({ ...errors, [name]: error })
    setApiError('')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setApiError('')
    const newErrors = {}
    for (const key in formData) {
      const error = await validateField(key, formData[key])
      if (error) newErrors[key] = error
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      setShowModal(true)
      const response = await axios.post(
        `${URL_BACKEND}/api/users/create`,
        formData
      )
      console.log(response.data.data)
      if (response.status === 201) {
        //console.log(response.data)
        const tempToken = response.data.data.tokenActivacion
        const tempEmail = response.data.data.email
        const tempActivation = await activarCuentaTemporal(tempToken, tempEmail)
        console.log(tempActivation)
        navigate('/login')
      }
      setShowModal(false)
    } catch (error) {
      setShowModal(false)
      console.log(error)

      if (error.response && error.response.data) {
        setErroresBackend(error.response.data.message)
        const errorMessage =
          error.response.data.detail || 'Ocurrió un error durante el registro.'
        setApiError(errorMessage)
      } else {
        setApiError(
          'No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.'
        )
      }
    }
  }

  return (
    <>
      {showModal === true ? (
        <Modalizar setShow={setShowModal} show={showModal} bgColor="bg-dark">
          <p style={{ fontSize: '30px', margin: 0, alignContent: 'center' }}>
            procesando... espere.
          </p>
        </Modalizar>
      ) : (
        <div className="register-page-container">
          <div className="register-form-wrapper">
            <h2>Crear cuenta</h2>
            <p>Completa tus datos para registrarte en la plataforma</p>
            <form onSubmit={handleSubmit} noValidate>
              {apiError && <div className="api-error-message">{apiError}</div>}
              {erroresBackend && (
                <div className="api-error-message">{erroresBackend}</div>
              )}
              <div className="input-group">
                <label>Nombre Completo o Razón Social</label>
                <input
                  type="text"
                  name="legalName"
                  value={formData.legalName}
                  onChange={handleChange}
                  placeholder="Empresa S.A."
                />
                {errors.legalName && (
                  <span className="error-message">{errors.legalName}</span>
                )}
              </div>
              <div className="input-group">
                <label>TIN ( RUC / NIT / RUT / CUIT )</label>
                <input
                  type="text"
                  name="taxId"
                  value={formData.taxId}
                  onChange={handleChange}
                  placeholder="20123456789"
                />
                {errors.taxId && (
                  <span className="error-message">{errors.taxId}</span>
                )}
              </div>
              <div className="input-group">
                <label>Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="contacto@empresa.com"
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>
              <div className="input-group">
                <label>Teléfono</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+51 999 999 999"
                />
                {errors.phone && (
                  <span className="error-message">{errors.phone}</span>
                )}
              </div>
              <div className="input-group">
                <label>Contraseña</label>
                <div className="password-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="........"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle-icon"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
              </div>
              <button type="submit" className="register-button">
                Registrarse
              </button>
            </form>
            <div className="links">
              <span>
                ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default RegisterPage
