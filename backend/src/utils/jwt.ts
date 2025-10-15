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
