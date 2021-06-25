import React from 'react'
import faker from 'faker'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SignUp from './signup'
import { Helper, ValidationStub } from '@/presentation/test'

// type SutTypes = {
//   authenticationSpy: AuthenticationSpy
//   saveAccessTokenMock: SaveAccessTokenMock
// }

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): void => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError

  render(
    // <Router history={history}>
      <SignUp validation={validationStub} />
    // </Router>
  )
}

const populateField = (fieldName: string, value = faker.random.word()): void => {
  const input = screen.getByTestId(fieldName)
  fireEvent.input(input, { target: { value } })
}

describe('SignUp Component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.word()
    makeSut({ validationError })

    Helper.testChildCount('error-wrap', 0)
    Helper.testButtonIsDisabled('submit', true)
    Helper.testStatusForField('name', validationError)
    Helper.testStatusForField('email', 'Campo obrigatório')
    Helper.testStatusForField('password', 'Campo obrigatório')
    Helper.testStatusForField('passwordConfirmation', 'Campo obrigatório')
  })

  test('Should show name error if Validation fails', () => {
    const validationError = faker.lorem.words()

    makeSut({ validationError })
    populateField('name')

    Helper.testStatusForField('name', validationError)
  })
})
