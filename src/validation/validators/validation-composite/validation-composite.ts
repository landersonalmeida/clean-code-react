import { InputType, Validation } from '@/presentation/protocols/validation'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class ValidationComposite implements Validation {
  constructor(private readonly validators: FieldValidation[]) {}

  static build(validators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators)
  }

  validate(fieldName: string, input: InputType): string | null {
    const validators = this.validators.filter(v => v.field === fieldName)

    for (const validator of validators) {
      const error = validator.validate(input)

      if (error) return error.message
    }

    return null
  }
}
