import { Company } from '@prisma/client'

//campos opcionales (uno o los tres)
export type UpdateCompanyDTO = Partial<Pick<Company, 'id' | 'phone' | 'altEmail' | 'address'>>

// & { phone: string | null }  acepta nulls en los campos
export interface CreateCompanyResponseOKDTO {
  newProps: Pick<Company, 'phone' | 'altEmail' | 'address'>
  oldProps: Pick<Company, 'phone' | 'altEmail' | 'address'>
}

// export interface CreateUserResponseOKDTO extends Pick<User, 'email'>, Pick<Company, 'legalName' | 'taxId' | 'phone'> {}
//
//
//
// export interface CreateUserResponseErrorDTO {
//
//   message: string
//
//   error?: string
//
// }
//
//
