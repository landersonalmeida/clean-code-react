import { MinLengthValidation } from '@/validation/validators/min-length/min-length-validation'
import { InvalidFieldError } from '@/validation/errors'
import faker from 'faker'

const makeSut = (minLength: number): MinLengthValidation => new MinLengthValidation(faker.database.column(), minLength)

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const sut = makeSut(5)
    const error = sut.validate(faker.lorem.word(3))
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if value is valid', () => {
    const sut = makeSut(5)
    const error = sut.validate(faker.lorem.word(5))
    expect(error).toBeFalsy()
  })
})
