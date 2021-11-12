import { EmailInUseError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { AddAccountSpy, mockAccountModel } from '@/domain/test'
import { SignUp } from '@/presentation/pages'
import { Helper, ValidationStub } from '@/presentation/test'
import { currentAccountState } from '@/presentation/components'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import faker from 'faker'
import { RecoilRoot } from 'recoil'
import React from 'react'

type SutTypes = {
  addAccountSpy: AddAccountSpy
  setCurrentAccountMock: (account: AccountModel) => void
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/signup'] })
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError

  const addAccountSpy = new AddAccountSpy()
  const setCurrentAccountMock = jest.fn()
  const mockedState = { setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }

  render(
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, mockedState)}>
      <Router history={history}>
        <SignUp
          validation={validationStub}
          addAccount={addAccountSpy}
        />
      </Router>
    </RecoilRoot>
  )

  return { addAccountSpy, setCurrentAccountMock }
}

const simulateAValidSubmit = async (
  name: string = faker.name.findName(),
  email: string = faker.internet.email(),
  password: string = faker.internet.password()
): Promise<void> => {
  Helper.populateField('name', name)
  Helper.populateField('email', email)
  Helper.populateField('password', password)
  Helper.populateField('passwordConfirmation', password)

  const form = screen.getByRole('form')
  fireEvent.submit(form)

  await waitFor(() => form)
}

describe('SignUp Component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.word()
    makeSut({ validationError })

    expect(screen.getByTestId('error-wrap').children).toHaveLength(0)
    expect(screen.getByRole('submit')).toBeDisabled()
    Helper.testStatusForField('name', validationError)
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  test('Should show name error if Validation fails', () => {
    const validationError = faker.lorem.words()

    makeSut({ validationError })

    Helper.populateField('name')
    Helper.testStatusForField('name', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.lorem.words()

    makeSut({ validationError })

    Helper.populateField('email')
    Helper.testStatusForField('email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.lorem.words()

    makeSut({ validationError })

    Helper.populateField('password')
    Helper.testStatusForField('password', validationError)
  })

  test('Should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.lorem.words()

    makeSut({ validationError })

    Helper.populateField('passwordConfirmation')
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  test('Should show valid name state if Validation succeeds', () => {
    makeSut()

    Helper.populateField('name')
    Helper.testStatusForField('name')
  })

  test('Should show valid email state if Validation succeeds', () => {
    makeSut()

    Helper.populateField('email')
    Helper.testStatusForField('email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    makeSut()

    Helper.populateField('password')
    Helper.testStatusForField('password')
  })

  test('Should show valid passwordConfirmation state if Validation succeeds', () => {
    makeSut()

    Helper.populateField('passwordConfirmation')
    Helper.testStatusForField('passwordConfirmation')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()

    Helper.populateField('name')
    Helper.populateField('email')
    Helper.populateField('password')
    Helper.populateField('passwordConfirmation')
    expect(screen.getByRole('submit')).toBeEnabled()
  })

  test('Should show spinner on submit', async () => {
    makeSut()

    await simulateAValidSubmit()

    expect(screen.queryByTestId('spinner')).toBeInTheDocument()
  })

  test('Should call AddAccount with correct values', async () => {
    const { addAccountSpy } = makeSut()

    const name = faker.name.findName()
    const email = faker.internet.email()
    const password = faker.internet.password()

    await simulateAValidSubmit(name, email, password)

    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password
    })
  })

  test('Should call AddAccount only once', async () => {
    const { addAccountSpy } = makeSut()

    await simulateAValidSubmit()
    await simulateAValidSubmit()

    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('Should not call AddAccount if form is invalid', async () => {
    const { addAccountSpy } = makeSut({ validationError: faker.random.words() })

    await simulateAValidSubmit()

    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('Should present error if AddAccount failed', async () => {
    const { addAccountSpy } = makeSut()

    const error = new EmailInUseError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)

    await simulateAValidSubmit()

    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
  })

  test('Should call UpdateCurrentAccount on success', async () => {
    const { addAccountSpy, setCurrentAccountMock } = makeSut()

    await simulateAValidSubmit()

    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('Should go back to login page', async () => {
    makeSut()

    const loginLink = screen.getByTestId('login-link')
    fireEvent.click(loginLink)

    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/login')
  })
})
