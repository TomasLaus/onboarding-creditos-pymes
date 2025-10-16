import { useAppContext } from '../../context/appContext'

const DashboardPage = () => {
  const { userData } = useAppContext()
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // centra verticalmente
        alignItems: 'center', // centra horizontalmente
        minHeight: '100vh', // ocupa toda la altura de la ventana
        textAlign: 'center', // centra el texto
        padding: '20px'
      }}
    >
      <h1>Dashboard</h1>
      {userData ? (
        <div>
          <h2>Bienvenido, {userData.email}</h2>
          <p>Tu RUT/CUIT es: {userData.taxId}</p>
        </div>
      ) : (
        <div>
          <h2>No has iniciado sesión o credenciales inválidas.</h2>
          <p>Por favor, inicia sesión para acceder a esta página.</p>
          <Link to="/login">Iniciar sesión</Link>
        </div>
      )}
    </div>
  )
}

export default DashboardPage
