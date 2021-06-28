import { InputType, Validation } from '@/presentation/protocols/validation'

export class ValidationStub implements Validation {
  errorMessage?: string | undefined
  fieldName?: string
  fieldValue?: string

  validate (fieldName: string, input: InputType): string {
    return this.errorMessage!
  }
}
