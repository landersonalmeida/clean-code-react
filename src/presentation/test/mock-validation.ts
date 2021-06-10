import { Validation } from '@/presentation/protocols/validation'

export class ValidationStub implements Validation {
  errorMessage?: string
  fieldName?: string
  fieldValue?: string

  validate (fieldName: string, fieldValue: string): string {
    return this.errorMessage!
  }
}
