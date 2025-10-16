import { Company } from '@prisma/client'

// id siempre requerido, campos opcionales ('phone' | 'altEmail' | 'address')
export type UpdateCompanyDTO = Pick<Company, 'id'> & Partial<Pick<Company, 'phone' | 'altEmail' | 'address'>>

export interface CreateCompanyResponseOKDTO {
  newProps: Pick<Company, 'phone' | 'altEmail' | 'address'>
  oldProps: Pick<Company, 'phone' | 'altEmail' | 'address'>
}
