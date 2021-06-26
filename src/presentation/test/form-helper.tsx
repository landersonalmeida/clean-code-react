import faker from 'faker'
import { fireEvent, screen } from '@testing-library/react'

export const testChildCount = (field: string, count: number): void => {
  const el = screen.getByTestId(field)
  expect(el.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (roleName: string, isDisabled: boolean): void => {
  const button = screen.getByRole(roleName)

  if (isDisabled) {
    expect(button).toBeDisabled()
  } else {
    expect(button).toBeEnabled()
  }
}

export const testStatusForField = (fieldName: string, validationError?: string): void => {
  const fieldStatus = screen.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError ?? 'Tudo certo')
  expect(fieldStatus).toHaveTextContent(validationError ? '🔴' : '🟢')
}

export const populateField = (fieldName: string, value = faker.random.word()): void => {
  const input = screen.getByTestId(fieldName)
  fireEvent.input(input, { target: { value } })
}
