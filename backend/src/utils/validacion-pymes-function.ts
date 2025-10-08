/**
 * 🔎 Validación de identificaciones fiscales de LATAM
 * Soporta: RUC (Perú), NIT (Colombia), CUIT (Argentina), RUT (Chile)
 * Detecta automáticamente el tipo según el formato si no se especifica.
 */

export function validarIdentificacionFiscal(id: string, tipo?: 'RUC' | 'NIT' | 'CUIT' | 'RUT'): boolean {
  const clean = id.replace(/[^0-9kK]/g, '')

  // Detección automática si no se pasa tipo
  if (!tipo) {
    if (/^\d{11}$/.test(clean)) return validarRUC(clean) || validarCUIT(clean)
    if (/^\d{9,10}$/.test(clean)) return validarNIT(clean)
    if (/^[0-9]+[-]?[0-9kK]$/.test(id)) return validarRUT(id)
    return false
  }

  switch (tipo.toUpperCase()) {
    case 'CUIT':
      return validarCUIT(clean)
    case 'RUC':
      return validarRUC(clean)
    case 'NIT':
      return validarNIT(clean)
    case 'RUT':
      return validarRUT(id)
    default:
      return false
  }
}

// 🇦🇷 CUIT - Argentina
function validarCUIT(cuit: string): boolean {
  if (!/^\d{11}$/.test(cuit)) return false
  const coef = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]
  const nums = cuit.split('').map(Number)
  const verificador = nums.pop()!
  const suma = nums.reduce((acc, n, i) => acc + n * coef[i], 0)
  const resto = suma % 11
  const dv = resto === 0 ? 0 : resto === 1 ? 9 : 11 - resto
  return dv === verificador
}

// 🇵🇪 RUC - Perú
function validarRUC(ruc: string): boolean {
  if (!/^\d{11}$/.test(ruc)) return false
  const arr = ruc.split('').map(Number)
  const factores = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]
  const suma = arr.slice(0, 10).reduce((acc, n, i) => acc + n * factores[i], 0)
  const resto = suma % 11
  const digito = 11 - resto
  const verificador = digito >= 10 ? digito - 10 : digito
  return verificador === arr[10]
}

//Colombia
function validarNIT(nit: string): boolean {
  const clean = nit.replace(/[^\d]/g, '')
  if (!/^\d{9,10}$/.test(clean)) return false

  const cuerpo = clean.slice(0, -1)
  const digitoVerificador = parseInt(clean.slice(-1))

  // Pesos oficiales DIAN (de derecha a izquierda)
  const pesos = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71]

  let suma = 0
  const longitud = cuerpo.length

  for (let i = 0; i < longitud; i++) {
    const digito = parseInt(cuerpo.charAt(longitud - 1 - i))
    suma += digito * pesos[i]
  }

  const resto = suma % 11
  const digitoEsperado = resto > 1 ? 11 - resto : resto

  return digitoVerificador === digitoEsperado
}

// 🇨🇱 RUT - Chile
function validarRUT(rut: string): boolean {
  const clean = rut.replace(/\./g, '').replace('-', '')
  if (!/^\d{7,8}[0-9kK]$/.test(clean)) return false

  const cuerpo = clean.slice(0, -1)
  const dv = clean.slice(-1).toUpperCase()
  let suma = 0
  let multiplicador = 2

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i]) * multiplicador
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1
  }

  const resto = 11 - (suma % 11)
  const digito = resto === 11 ? '0' : resto === 10 ? 'K' : resto.toString()
  return digito === dv
}

// 🧪 Ejemplos de uso
/*
console.log(validarIdentificacionFiscal('20-12345678-3', 'CUIT')); // 🇦🇷
console.log(validarIdentificacionFiscal('20123456789', 'RUC'));     // 🇵🇪
console.log(validarIdentificacionFiscal('800197268-4', 'NIT'));     // 🇨🇴
console.log(validarIdentificacionFiscal('12.345.678-5', 'RUT'));    // 🇨🇱
console.log(validarIdentificacionFiscal('20-12345678-3'));          // auto-detección
*/
