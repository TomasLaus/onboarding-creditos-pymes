import React, { useState } from 'react';
import { useModal } from '../../context/ModalContext';
import './LoginModal.css';
import { FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa';

const LoginModal = () => {
  const { modalType, openModal, closeModal } = useModal();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  if (modalType !== 'LOGIN') return null;

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }
    if (!password) {
      newErrors.password = 'La contraseña es obligatoria';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      
      console.log('Iniciando sesión con:', { email, password });
      closeModal();
    }
  };

  const handleRegisterClick = () => {
    openModal('REGISTER');
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeModal}><FaTimes /></button>
        <h2>Bienvenido de nuevo</h2>
        <p>Ingresa tus credenciales para acceder a tu cuenta</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@empresa.com"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="input-group">
            <label>Contraseña</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          <a href="#">¿Olvidaste tu contraseña?</a>
          <span>¿No tienes cuenta? <a href="#" onClick={handleRegisterClick}>Regístrate aquí</a></span>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;