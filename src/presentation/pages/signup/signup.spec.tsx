import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
// import faker from 'faker'
import SignUp from './signup'

// type SutTypes = {
//   authenticationSpy: AuthenticationSpy
//   saveAccessTokenMock: SaveAccessTokenMock
// }

const makeSut = (): void => {
  render(
    // <Router history={history}>
      <SignUp />
    // </Router>
  )
}

const testChildCount = (field: string, count: number): void => {
  const el = screen.getByTestId(field)
  expect(el.childElementCount).toBe(count)
}

const testButtonIsDisabled = (roleName: string, isDisabled: boolean): void => {
  const button = screen.getByRole(roleName)

  if (isDisabled) {
    expect(button).toBeDisabled()
  } else {
    expect(button).toBeEnabled()
  }
}

const testStatusForField = (fieldName: string, validationError?: string): void => {
  const fieldStatus = screen.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError ?? 'Tudo certo')
  expect(fieldStatus).toHaveTextContent(validationError ? '🔴' : '🟢')
}

describe('SignUp Component', () => {
  test('Should start with initial state', () => {
    const validationError = 'Campo obrigatório'
    makeSut()

    testChildCount('error-wrap', 0)
    testButtonIsDisabled('submit', true)
    testStatusForField('name', validationError)
    testStatusForField('email', validationError)
    testStatusForField('password', validationError)
    testStatusForField('passwordConfirmation', validationError)
  })
})
