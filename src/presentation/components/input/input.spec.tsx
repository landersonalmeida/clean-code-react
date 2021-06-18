import React from 'React'
import { screen, render } from '@testing-library/react'
import Input from './input'
import Context from '@/presentation/contexts/form/form-context'

describe('InputComponent', () => {
  test('Should begin with readOnly', () => {
    render(
      <Context.Provider value={{ state: {} }}>
        <Input name="field" />
      </Context.Provider>
    )

    const input = screen.getByTestId('field') as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })
})
