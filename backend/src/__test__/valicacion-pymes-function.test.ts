import { validarIdentificacionFiscal } from '../utils/validacion-pymes-function'

describe('validacion-pymes-function.ts (validaciones fiscales para LATAM)', () => {
  test('valida CUIT (Argentina)', () => {
    expect(validarIdentificacionFiscal('20-22486722-1', 'CUIT')).toBe(true)
    // reemplazá con un CUIT real válido para probar: ej. "20-93381515-6"
  })

  test('valida RUC (Perú)', () => {
    expect(validarIdentificacionFiscal('20123456789', 'RUC')).toBe(false)
  })

  test('valida NIT (Colombia)', () => {
    expect(validarIdentificacionFiscal('800197268-4', 'NIT')).toBe(true)
  })

  test('valida RUT (Chile)', () => {
    expect(validarIdentificacionFiscal('12.345.678-5', 'RUT')).toBe(true)
  })

  test('detección automática de tipo', () => {
    expect(validarIdentificacionFiscal('20-32328737-7')).toBe(true)
  })

  test('detección automática de tipo inválido ', () => {
    expect(validarIdentificacionFiscal('20-32328737-733')).toBe(false)
  })
})
