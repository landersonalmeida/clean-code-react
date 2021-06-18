import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import faker from 'faker'
import 'jest-localstorage-mock'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Login } from '@/presentation/pages'
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

const simulateAValidSubmit = async (
  email: string = faker.internet.email(),
  password: string = faker.internet.password()
): Promise<void> => {
  populateEmailField(email)
  populatePasswordField(password)

  const form = screen.getByRole('form')
  fireEvent.submit(form)

  await waitFor(() => form)
}

const testStatusForField = (fieldName: string, validationError?: string): void => {
  const emailStatus = screen.getByTestId(`${fieldName}-status`)
  expect(emailStatus.title).toBe(validationError ?? 'Tudo certo')
  expect(emailStatus).toHaveTextContent(validationError ? '🔴' : '🟢')
}

const testErrorWrapChildCount = (count: number): void => {
  const errorWrap = screen.getByTestId('error-wrap')
  expect(errorWrap.childElementCount).toBe(count)
}

const testElementExists = (fieldName: string): void => {
  const el = screen.getByTestId(fieldName)
  expect(el).toBeTruthy()
}

const testElementText = (fieldName: string, text: string): void => {
  const el = screen.getByTestId(fieldName)
  expect(el.textContent).toBe(text)
}

const testButtonIsDisabled = (roleName: string, isDisabled: boolean): void => {
  const button = screen.getByRole(roleName)

  if (isDisabled) {
    expect(button).toBeDisabled()
  } else {
    expect(button).toBeEnabled()
  }
}

describe('Login Component', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('Should start with initial value', () => {
    const validationError = faker.lorem.words()
    makeSut({ validationError })

    testErrorWrapChildCount(0)
    testButtonIsDisabled('submit', true)
    testStatusForField('email', validationError)
    testStatusForField('password', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.lorem.words()

    makeSut({ validationError })
    populateEmailField()

    testStatusForField('email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.lorem.words()

    makeSut({ validationError })
    populatePasswordField()
    testStatusForField('password', validationError)
  })

  test('Should show valid email state if Validation succeeds', () => {
    makeSut()
    populateEmailField()
    testStatusForField('email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    makeSut()
    populatePasswordField()
    testStatusForField('password')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()
    populateEmailField()
    populatePasswordField()

    testButtonIsDisabled('submit', false)
  })

  test('Should show spinner on submit', async () => {
    makeSut()
    await simulateAValidSubmit()

    testElementExists('spinner')
  })

  test('Should call authentication with correct values', async () => {
    const { authenticationSpy } = makeSut()

    const email = faker.internet.email()
    const password = faker.internet.password()

    await simulateAValidSubmit(email, password)

    expect(authenticationSpy.params).toEqual({ email, password })
  })

  test('Should call authentication only once', async () => {
    const { authenticationSpy } = makeSut()

    await simulateAValidSubmit()
    await simulateAValidSubmit()

    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call authentication if form is invalid', async () => {
    const { authenticationSpy } = makeSut({ validationError: faker.random.words() })

    await simulateAValidSubmit()

    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if authentication failed', async () => {
    const { authenticationSpy } = makeSut()

    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))

    await simulateAValidSubmit()

    testElementText('main-error', error.message)

    testErrorWrapChildCount(1)
  })

  test('Should add accessToken to localStorage on success', async () => {
    const { authenticationSpy } = makeSut()

    await simulateAValidSubmit()

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
