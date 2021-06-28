import { FieldValidation, FieldValidationInputType } from '@/validation/protocols/field-validation'

export class FieldValidationSpy implements FieldValidation {
  error: Error | null = null

  constructor(readonly field: string) {}

  validate (input: FieldValidationInputType): Error | null {
    return this.error
  }
}
