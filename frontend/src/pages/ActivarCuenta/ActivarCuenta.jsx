import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const ActivarCuenta = () => {
  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const token = queryParams.get('token')
  const email = queryParams.get('email')

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const handleActivate = () => {
    const activationLink = `${
      import.meta.env.VITE_BACKEND_PRODUCTION
    }/api/users/activate?token=${token}&email=${email}`

    fetch(activationLink)
      .then(res => res.json())
      .then(data => {
        if (
          data.message ===
          'Cuenta activada correctamente. Ya puedes iniciar sesión.'
        ) {
          setLoading(false)
          setTimeout(() => navigate('/login'), 3000)
        } else {
          setError(data.message)
          setLoading(false)
        }
      })
      .catch(() => {
        setError('Error de red. Por favor, intenta nuevamente más tarde.')
        setLoading(false)
      })
  }

  useEffect(() => {
    handleActivate()
  }, [])

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {loading ? (
        <p>Validando, espere por favor... </p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <p>La cuenta ha sido activada correctamente. Redireccionando...</p>
      )}
    </div>
  )
}

export default ActivarCuenta
