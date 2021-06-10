import React from 'react'
import { render, RenderResult, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Login from './Login'
import { Validation } from '@/presentation/protocols/validation'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

class ValidationSpy implements Validation {
  errorMessage?: string
  fieldName?: string
  fieldValue?: string

  validate (fieldName: string, fieldValue: string): string {
    this.fieldName = fieldName
    this.fieldValue = fieldValue
    return this.errorMessage!
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = render(<Login validation={validationSpy} />)
  return {
    sut,
    validationSpy
  }
}

describe('Login Component', () => {
  test('Should start with initial value', () => {
    makeSut()

    const errorWrap = screen.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = screen.getByRole('button', { name: 'Entrar' })
    expect(submitButton).toBeDisabled()

    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus.title).toBe('Campo obrigatório')
    expect(emailStatus).toHaveTextContent('🔴')

    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(passwordStatus).toHaveTextContent('🔴')
  })

  test('Should call Validation with correct email', () => {
    const { validationSpy } = makeSut()

    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    expect(validationSpy.fieldName).toBe('email')
    expect(validationSpy.fieldValue).toBe('any_email')
  })

  test('Should call Validation with correct password', () => {
    const { validationSpy } = makeSut()

    const passwordInput = screen.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: 'any_password' } })
    expect(validationSpy.fieldName).toBe('password')
    expect(validationSpy.fieldValue).toBe('any_password')
  })
})
