import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = '';
    if (!value) {
      error = 'Este campo es obligatorio';
    } else if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      error = 'El correo electrónico no es válido';
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
    setApiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    const newErrors = {};
    let hasErrors = false;

    for (const key in formData) {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        hasErrors = true;
      }
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    try {
      // NOTE: This endpoint will be fixed later as requested by the user.
      await axios.post('http://localhost:3000/api/auth/login', formData);
      navigate('/');
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.detail || 'Ocurrió un error al iniciar sesión.';
        setApiError(errorMessage);
      } else {
        setApiError('No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.');
      }
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-form-wrapper">
        <h2>Bienvenido de nuevo</h2>
        <p>Ingresa tus credenciales para acceder a tu cuenta</p>
        <form onSubmit={handleSubmit} noValidate>
          {apiError && <div className="api-error-message">{apiError}</div>}
          <div className="input-group">
            <label>Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@empresa.com"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
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
              <span onClick={() => setShowPassword(!showPassword)} className="password-toggle-icon">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          <button type="submit" className="login-button">Iniciar Sesión</button>
        </form>
        <div className="links">
          <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
          <span>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link></span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
