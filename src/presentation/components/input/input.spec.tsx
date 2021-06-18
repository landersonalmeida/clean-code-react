import React from 'React'
import { screen, render, RenderResult } from '@testing-library/react'
import Input from './input'
import Context from '@/presentation/contexts/form/form-context'

const makeSut = (): void => {
  render(
    <Context.Provider value={{ state: {} }}>
      <Input name="field" />
    </Context.Provider>
  )
}

describe('InputComponent', () => {
  test('Should begin with readOnly', () => {
    makeSut()

    const input = screen.getByTestId('field') as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })
})
