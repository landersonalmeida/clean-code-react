import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Login from './Login'
import { ValidationStub } from '@/presentation/test'
import faker from 'faker'

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): void => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError

  render(<Login validation={validationStub} />)
}

describe('Login Component', () => {
  test('Should start with initial value', () => {
    const validationError = faker.lorem.words()
    makeSut({ validationError })

    const errorWrap = screen.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = screen.getByRole('button', { name: 'Entrar' })
    expect(submitButton).toBeDisabled()

    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus).toHaveTextContent('🔴')

    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus).toHaveTextContent('🔴')
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.lorem.words()
    makeSut({ validationError })

    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.lorem.words()
    makeSut({ validationError })

    const passwordInput = screen.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should show valid email state if Validation succeeds', () => {
    makeSut()

    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus.title).toBe('Tudo certo')
    expect(emailStatus.textContent).toBe('🟢')
  })

  test('Should show valid password state if Validation succeeds', () => {
    makeSut()

    const passwordInput = screen.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Tudo certo')
    expect(passwordStatus.textContent).toBe('🟢')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()

    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const passwordInput = screen.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    const submitButton = screen.getByRole('button', { name: 'Entrar' })
    expect(submitButton).toBeEnabled()
  })
})
