import { CompareFieldsValidation } from './compare-fields-validation'
import { InvalidFieldError } from '@/validation/errors'
import faker from 'faker'

const makeSut = (field: string, fieldToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(field, fieldToCompare)

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const field = 'any_field'
    const fielToCompare = 'other_field'
    const sut = makeSut(field, fielToCompare)
    const error = sut.validate({
      [field]: 'any_value',
      [fielToCompare]: 'other_value'
    })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if compare is valid', () => {
    const field = 'any_field'
    const fielToCompare = 'other_field'
    const value = faker.random.word()
    const sut = makeSut(field, fielToCompare)
    const error = sut.validate({
      [field]: value,
      [fielToCompare]: value
    })
    expect(error).toBeFalsy()
  })
})
