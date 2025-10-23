/**
 * Sanitiza un valor de entrada para asegurar que solo contenga números
 * y limite el valor entre un rango mínimo y máximo permitido.
 *
 * @param value - El valor ingresado por el usuario (string o número)
 * @param min - Valor mínimo permitido (por defecto 1)
 * @param max - Valor máximo permitido (por defecto 120)
 * @returns El número limpio y ajustado dentro del rango
 */
export function sanitizeMinMax(
  value: string | number,
  min = 1,
  max = 120
): number {
  // Convertimos el valor a string por si viene como número
  const strValue = String(value)

  // Eliminamos todo lo que no sea dígito usando una expresión regular
  const cleaned = strValue.replace(/[^0-9]/g, '')

  // Convertimos el string limpio a número
  const num = Number(cleaned)

  // Si el resultado no es un número válido, devolvemos el mínimo permitido
  if (isNaN(num)) return min

  // Limitamos el valor dentro del rango definido (min - max)
  const clamped = Math.min(Math.max(num, min), max)

  // Retornamos el valor final validado
  return clamped
}

/**
 * Redondea un número a N decimales (por defecto 2)
 */
export const roundToDecimals = (value: number, decimals = 2): number => {
  const factor = Math.pow(10, decimals)
  return Math.round(value * factor) / factor
}

/**
 * Convierte un string o number a float seguro
 * Retorna 0 si no es válido
 */
export const parseToFloat = (value: string | number): number => {
  const n = typeof value === 'string' ? parseFloat(value) : value
  return isNaN(n) ? 0 : n
}

/**
 * Formatea un número a string con N decimales
 */
export const formatDecimals = (value: number, decimals = 2): string => {
  return roundToDecimals(value, decimals).toFixed(decimals)
}

/**
 * Suma un array de números
 */
export const sum = (numbers: number[]): number => {
  return numbers.reduce((acc, val) => acc + val, 0)
}

/**
 * Multiplica un número por un factor y redondea a 2 decimales
 */
export const multiplyAndRound = (value: number, factor: number): number => {
  return roundToDecimals(value * factor, 2)
}

/**
 * Limpia un string dejando solo números y un punto decimal
 * Útil para inputs
 */
export const sanitizeNumberInput = (value: string): string => {
  let cleanValue = value.replace(/[^0-9.]/g, '')

  // Permite solo un punto decimal
  const parts = cleanValue.split('.')
  if (parts.length > 2) {
    cleanValue = parts[0] + '.' + parts.slice(1).join('')
  }

  // Limita a 2 decimales
  if (parts[1]?.length > 2) {
    cleanValue = parts[0] + '.' + parts[1].slice(0, 2)
  }

  return cleanValue
}
