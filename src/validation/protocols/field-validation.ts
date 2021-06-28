export type FieldValidationInputType = {
  [key: string]: string
}

export interface FieldValidation {
  field: string
  validate: (input: FieldValidationInputType) => Error | null
}
