import { FieldValidation, FieldValidationInputType } from '@/validation/protocols/field-validation'
import { InvalidFieldError } from '@/validation/errors'

export class CompareFieldsValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly fieldToCompare: string
  ) {}

  validate (input: FieldValidationInputType): Error|null {
    return input[this.field] !== input[this.fieldToCompare] ? new InvalidFieldError() : null
  }
}
