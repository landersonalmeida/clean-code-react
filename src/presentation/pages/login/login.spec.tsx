import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Login from './Login'

describe('Login Component', () => {
  test('Should start with initial value', () => {
    render(<Login />)
    const errorWrap = screen.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = screen.getByRole('button', { name: /Entrar/i })
    expect(submitButton).toBeDisabled()
  })
})
