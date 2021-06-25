import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
// import faker from 'faker'
import SignUp from './signup'
import { Helper } from '@/presentation/test'

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

describe('SignUp Component', () => {
  test('Should start with initial state', () => {
    const validationError = 'Campo obrigatório'
    makeSut()

    Helper.testChildCount('error-wrap', 0)
    Helper.testButtonIsDisabled('submit', true)
    Helper.testStatusForField('name', validationError)
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
    Helper.testStatusForField('passwordConfirmation', validationError)
  })
})
