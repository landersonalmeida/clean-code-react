import { FieldValidation, FieldValidationInputType } from '@/validation/protocols/field-validation'
import { InvalidFieldError } from '@/validation/errors'

export class EmailValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate (input: FieldValidationInputType): Error | null {
    const emailRegex: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return (!input[this.field] || emailRegex.test(input[this.field])) ? null : new InvalidFieldError()
  }
}
