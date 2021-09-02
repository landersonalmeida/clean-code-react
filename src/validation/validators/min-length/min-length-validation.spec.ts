import { MinLengthValidation } from '@/validation/validators/min-length/min-length-validation'
import { InvalidFieldError } from '@/validation/errors'
import faker from 'faker'

const makeSut = (field: string, minLength: number): MinLengthValidation => new MinLengthValidation(field, minLength)

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const field = faker.database.column()
    const sut = makeSut(field, 5)
    const error = sut.validate({ [field]: faker.lorem.word(3) })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if value is valid', () => {
    const field = faker.database.column()
    const sut = makeSut(field, 5)
    const error = sut.validate({ [field]: faker.lorem.word(5) })
    expect(error).toBeFalsy()
  })

  test('Should return falsy if value is field does not exist in schema', () => {
    const sut = makeSut('any_field', 5)
    const error = sut.validate({ invalidField: faker.lorem.word(5) })
    expect(error).toBeFalsy()
  })
})
