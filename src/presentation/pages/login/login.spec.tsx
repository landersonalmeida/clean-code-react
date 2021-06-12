import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import faker from 'faker'
import 'jest-localstorage-mock'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Login from './Login'
import { AuthenticationSpy, ValidationStub } from '@/presentation/test'
import { InvalidCredentialsError } from '@/domain/errors'

type SutTypes = {
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError

  const authenticationSpy = new AuthenticationSpy()

  render(
    <Router history={history}>
      <Login validation={validationStub} authentication={authenticationSpy} />
    </Router>
  )

  return { authenticationSpy }
}

const populateEmailField = (email: string = faker.internet.email()): void => {
  const emailInput = screen.getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (password: string = faker.internet.password()): void => {
  const passwordInput = screen.getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password } })
}

const simulateStatusForField = (fieldName: string, validationError?: string): void => {
  const emailStatus = screen.getByTestId(`${fieldName}-status`)
  expect(emailStatus.title).toBe(validationError ?? 'Tudo certo')
  expect(emailStatus).toHaveTextContent(validationError ? '🔴' : '🟢')
}

const simulateAValidSubmit = (
  email: string = faker.internet.email(),
  password: string = faker.internet.password()
): void => {
  populateEmailField(email)
  populatePasswordField(password)

  const submitButton = screen.getByRole('submit')
  submitButton.click()
}

describe('Login Component', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('Should start with initial value', () => {
    const validationError = faker.lorem.words()
    makeSut({ validationError })

    const errorWrap = screen.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = screen.getByRole('submit')
    expect(submitButton).toBeDisabled()

    simulateStatusForField('email', validationError)
    simulateStatusForField('password', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.lorem.words()

    makeSut({ validationError })
    populateEmailField()

    simulateStatusForField('email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.lorem.words()

    makeSut({ validationError })
    populatePasswordField()
    simulateStatusForField('password', validationError)
  })

  test('Should show valid email state if Validation succeeds', () => {
    makeSut()
    populateEmailField()
    simulateStatusForField('email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    makeSut()
    populatePasswordField()
    simulateStatusForField('password')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()
    populateEmailField()
    populatePasswordField()

    const submitButton = screen.getByRole('submit')
    expect(submitButton).toBeEnabled()
  })

  test('Should show spinner on submit', () => {
    makeSut()
    simulateAValidSubmit()

    const spinner = screen.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('Should call authentication with correct values', () => {
    const { authenticationSpy } = makeSut()

    const email = faker.internet.email()
    const password = faker.internet.password()

    simulateAValidSubmit(email, password)

    expect(authenticationSpy.params).toEqual({ email, password })
  })

  test('Should call authentication only once', () => {
    const { authenticationSpy } = makeSut()

    simulateAValidSubmit()
    simulateAValidSubmit()

    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call authentication if form is invalid', () => {
    const { authenticationSpy } = makeSut({ validationError: faker.random.words() })

    populateEmailField()
    fireEvent.submit(screen.getByRole('form'))

    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if authentication failed', async () => {
    const { authenticationSpy } = makeSut()

    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))

    simulateAValidSubmit()

    const errorWrap = screen.getByTestId('error-wrap')

    await waitFor(() => errorWrap)

    const mainError = screen.getByTestId('main-error')
    expect(mainError.textContent).toBe(error.message)
    expect(errorWrap.childElementCount).toBe(1)
  })

  test('Should add accessToken to localStorage on success', async () => {
    const { authenticationSpy } = makeSut()

    simulateAValidSubmit()

    await waitFor(() => screen.getByRole('form'))

    expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessToken)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('Should navigate to signUp page', async () => {
    makeSut()

    const register = screen.getByTestId('signup')
    fireEvent.click(register)

    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
