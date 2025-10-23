/**
 * Devuelve un identificador formateado con un prefijo y los últimos dígitos del ID.
 *
 * @param {string | number} id - El identificador completo (por ejemplo, un UUID o número largo).
 * @param {string} prefix - Prefijo a mostrar antes del ID (por ejemplo, "DOC" o "USR").
 * @param {number} [lastDigits=4] - Cantidad de dígitos finales del ID a mostrar. Por defecto 4.
 * @returns {string} El ID formateado, por ejemplo: "DOC-9535"
 *
 * @example
 * formatId("1761247949535", "DOC"); // "DOC-9535"
 * @example
 * formatId("ABC123456789", "USER", 6); // "USER-456789"
 */
export function formatStrAddingPrefix(
  id: string | number,
  prefix: string,
  lastDigits: number = 4
): string {
  const idStr = String(id)
  const suffix = idStr.slice(-lastDigits)
  return `${prefix}-${suffix}`
}

/**
 * Formatea un número como moneda, adaptándolo al formato local o al definido por parámetro.
 *
 * @param {number} value - El número a formatear (por ejemplo, 4500).
 * @param {string} [currency='USD'] - Código de moneda según ISO 4217 (por ejemplo, 'USD', 'ARS', 'EUR').
 * @param {string} [locale='en-US'] - Configuración regional (por ejemplo, 'en-US', 'es-AR').
 * @returns {string} Número formateado como moneda (por ejemplo, "$4,500.00" o "US$ 4.500,00").
 *
 * @example
 * formatCurrency(4500); // "$4,500.00"
 * @example
 * formatCurrency(4500, 'ARS', 'es-AR'); // "AR$ 4.500,00"
 */
export function formatCurrency(
  value: number,
  currency: string = 'ARS',
  locale: string = 'es-AR'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}
