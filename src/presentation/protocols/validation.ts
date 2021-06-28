export type InputType = {
  [key: string]: string
}

export interface Validation {
  validate: (fieldName: string, input: InputType) => string | null
}
