import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import './LoginPage.css'
import { useAppContext } from '../../context/appContext'
import Modalizar from '../../components/ModalMultiuso'

const LoginPage = () => {
  const URL_BACKEND =
    import.meta.env.VITE_NODE_ENV === 'production'
      ? import.meta.env.VITE_BACKEND_PRODUCTION
      : import.meta.env.VITE_BACKEND_LOCAL

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const navigate = useNavigate()
  const { setTokenLogin, tokenLogin, userData, setUserData } = useAppContext()
  const [showModal, setShowModal] = useState(false)
  const [erroresBackend, setErroresBackend] = useState('')
  const [isLoading, setIsLoading] = useState(false)


  const validateField = (name, value) => {
    let error = ''
    if (!value) {
      error = 'Este campo es obligatorio'
    } else if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      error = 'El correo electrónico no es válido'
    }
    return error
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    const error = validateField(name, value)
    setErrors({ ...errors, [name]: error })
    setApiError('')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setApiError('')
    setIsLoading(true) //  Empieza el loading...
    const newErrors = {}
    let hasErrors = false

    for (const key in formData) {
      const error = validateField(key, formData[key])
      if (error) {
        newErrors[key] = error
        hasErrors = true
      }
    }

    if (hasErrors) {
      setErrors(newErrors)
      return
    }

    try {
      const response = await axios.post(`${URL_BACKEND}/api/login`, formData)
      setShowModal(true)
      console.log(response.data)
      if (response.data.accessToken) {
        setShowModal(false)
        setTokenLogin(response.data.accessToken)
        //userData is:
        // legalName: '',
        // taxId: '',
        // email: '',
        // phone: ''
        // idUser: '',
        // idCompany: '',
        //   companyAltEmail: ''
        setUserData({
          ...userData,
          email: response.data.user.email,
          legalName: response.data.company.legalName,
          taxId: response.data.company.taxId,
          phone: response.data.user.phone,
          idUser: response.data.user.id,
          idCompany: response.data.company.id,
          companyAltEmail: response.data.company.altEmail
        })
        console.log(tokenLogin)
        console.log(userData)
        navigate('/dashboard')
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErroresBackend(
          error.response.data.message + ' ' + error.response.data.error
        )
        const errorMessage =
          error.response.data.detail || 'Ocurrió un error al iniciar sesión.'
        setApiError(errorMessage)
      } else {
        setApiError(
          'No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.'
        )
      }
    } finally {
      setIsLoading(false) // Termina loading...
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
        <div className="login-page-container">
          <div className="login-form-wrapper">
            <h2>Bienvenido de nuevo</h2>
            <p>Ingresa tus credenciales para acceder a tu cuenta</p>
            <p style={{ color: 'red' }}>(Primer acceso debe confirmase vía email)</p>
            <form onSubmit={handleSubmit} noValidate>
              {apiError && <div className="api-error-message">{apiError}</div>}
              {erroresBackend && (
                <div className="api-error-message">{erroresBackend}</div>
              )}
              <div className="input-group">
                <label>Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@empresa.com"
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
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
              <button type="submit" className="login-button" disabled={isLoading}>
                {isLoading ? (
                  <div className="spinner"></div>
                ) : (
                  'Iniciar Sesión'
                )}
              </button>
            </form>
            <div className="links">
              <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
              <span>
                ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default LoginPage
