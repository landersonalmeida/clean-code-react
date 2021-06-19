import React from 'react'
import faker from 'faker'
import { screen, render, fireEvent } from '@testing-library/react'
import Input from './input'
import Context from '@/presentation/contexts/form/form-context'

const makeSut = (fieldName: string): void => {
  render(
    <Context.Provider value={{ state: {} }}>
      <Input name={fieldName} />
    </Context.Provider>
  )
}

describe('InputComponent', () => {
  test('Should begin with readOnly', () => {
    const field = faker.database.column()

    makeSut(field)

    const input = screen.getByTestId(field) as HTMLInputElement

    expect(input.readOnly).toBe(true)
  })

  test('Should remove readOnly on focus', () => {
    const field = faker.database.column()

    makeSut(field)

    const input = screen.getByTestId(field) as HTMLInputElement

    fireEvent.focus(input)

    expect(input.readOnly).toBe(false)
  })
})
