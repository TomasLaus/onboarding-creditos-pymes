import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'secret_temporal'

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    return decoded // esto contiene el payload original (por ej. { id, email, ... })
  } catch (err) {
    return null
  }
}

//revisar esta function
export const generateToken = (id: string): string => {
  const payload = { userId: id }
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '10m' // ⏱ 10 minutos
  })
}
