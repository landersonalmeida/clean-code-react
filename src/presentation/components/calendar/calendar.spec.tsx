import { render, screen } from '@testing-library/react'
import { Calendar } from '@/presentation/components'
import React from 'react'

const makeSut = (date: Date): void => {
  render(<Calendar date={date} />)
}

describe('Calendar Component', () => {
  test('Should render with correct values', () => {
    makeSut(new Date('2021-01-12T00:00:00'))
    expect(screen.getByTestId('day')).toHaveTextContent('12')
    expect(screen.getByTestId('month')).toHaveTextContent(/^Jan|jan$/)
    expect(screen.getByTestId('year')).toHaveTextContent('2021')
  })

  test('Should render with correct values', () => {
    makeSut(new Date('2020-01-03T00:00:00'))
    expect(screen.getByTestId('day')).toHaveTextContent('03')
    expect(screen.getByTestId('month')).toHaveTextContent(/^Jan|jan$/)
    expect(screen.getByTestId('year')).toHaveTextContent('2020')
  })
})
