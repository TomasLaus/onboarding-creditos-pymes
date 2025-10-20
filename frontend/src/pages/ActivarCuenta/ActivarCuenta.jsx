import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const ActivarCuenta = () => {
  const { token, email } = useParams()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  const handleActivate = () => {
    const activationLink = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/users/activate?token=${token}&email=${email}`
    fetch(activationLink)
      .then(response => {
        if (
          response.message ===
          'Cuenta activada correctamente. Ya puedes iniciar sesión.'
        ) {
          setTimeout(() => {
            setLoading(false)
            navigate('/login')
          }, 3000)
        } else {
          setError(response.message)
        }
      })
      .catch(error => {
        setError('Error de red. Por favor, intenta nuevamente más tarde.')
      })
  }

  useEffect(() => {
    handleActivate()
  }, [])

  return (
    <div>
      {error !== null ? (
        <p>{error}</p>
      ) : (
        <div>
          {loading ? (
            <p>Validando, espere...</p>
          ) : (
            <p>La cuenta ha sido activada correctamente. Redireccionando...</p>
          )}
        </div>
      )}
    </div>
  )
}

export default ActivarCuenta
