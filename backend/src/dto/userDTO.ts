import { User, Company } from '@prisma/client'

export interface CreateUserDTO
  extends Pick<User, 'email' | 'password' | 'twoFactorSecret' | 'activationToken' | 'tokenExpiresAt'>,
    Pick<Company, 'legalName' | 'taxId' | 'phone'> {}

export interface CreateUserResponseOKDTO extends Pick<User, 'email'>, Pick<Company, 'legalName' | 'taxId' | 'phone'> {}

export interface CreateUserResponseErrorDTO {
  message: string
  error?: string
}
