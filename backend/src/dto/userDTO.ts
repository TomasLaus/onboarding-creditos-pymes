import { User } from '@prisma/client'

export interface CreateUserDTO extends Omit<User, 'id' | 'createdAt' | 'updatedAt'> {}

export interface CreateUserResponseOKDTO extends Pick<User, 'email'> {}

export interface CreateUserResponseErrorDTO {
  message: string
  error?: string
}
