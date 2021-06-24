import { AddAccountParams } from '@/domain/usecases'
import faker from 'faker'

export const mockAddAccountParams = (): AddAccountParams => {
  const password = faker.internet.password()

  return {
    name: faker.random.words(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}
