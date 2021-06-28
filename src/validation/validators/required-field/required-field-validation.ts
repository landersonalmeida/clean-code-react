import { FieldValidation, FieldValidationInputType } from '@/validation/protocols/field-validation'
import { RequiredFieldError } from '@/validation/errors'

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate (input: FieldValidationInputType): Error|null {
    return input[this.field] ? null : new RequiredFieldError()
  }
}
