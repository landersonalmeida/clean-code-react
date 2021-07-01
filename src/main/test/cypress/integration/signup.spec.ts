import faker from 'faker'
import * as Http from '../support/signup-mocks'
import * as FormHelper from '../support/form-helper'

const simulateValidSubmit = (): void => {
  cy.getByTestId('name').focus().type(faker.name.findName())
  FormHelper.testInputStatus('name')

  cy.getByTestId('email').focus().type(faker.internet.email())
  FormHelper.testInputStatus('email')

  const password = faker.random.alphaNumeric(7)
  cy.getByTestId('password').focus().type(password)
  cy.getByTestId('passwordConfirmation').focus().type(password)

  cy.getByRole('submit').click()
}

describe('SignUp', () => {
  beforeEach(() => {
    cy.visit('signup')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('name').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('name', 'Campo obrigatório')

    cy.getByTestId('email').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('email', 'Campo obrigatório')

    cy.getByTestId('password').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('password', 'Campo obrigatório')

    cy.getByTestId('passwordConfirmation').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('passwordConfirmation', 'Campo obrigatório')

    cy.getByRole('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('name').focus().type(faker.random.alphaNumeric(2))
    FormHelper.testInputStatus('name', 'Campo inválido')

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    FormHelper.testInputStatus('password', 'Campo inválido')

    cy.getByTestId('passwordConfirmation').focus().type(faker.random.alphaNumeric(4))
    FormHelper.testInputStatus('passwordConfirmation', 'Campo inválido')

    cy.getByRole('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('name').focus().type(faker.name.findName())
    FormHelper.testInputStatus('name')

    cy.getByTestId('email').focus().type(faker.internet.email())
    FormHelper.testInputStatus('email')

    const password = faker.random.alphaNumeric(5)

    cy.getByTestId('password').focus().type(password)
    FormHelper.testInputStatus('password')

    cy.getByTestId('passwordConfirmation').focus().type(password)
    FormHelper.testInputStatus('passwordConfirmation')

    cy.getByRole('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present EmailInUseError on 403', () => {
    Http.mockEmailInUseError()

    simulateValidSubmit()

    FormHelper.testMainError('Esse e-mail já está em uso')

    FormHelper.testUrl('/signup')
  })

  it('Should present UnexpectedError on default error cases', () => {
    Http.mockUnexpectedError()

    simulateValidSubmit()

    FormHelper.testMainError('Algo de errado aconteceu.')

    FormHelper.testUrl('/signup')
  })
})
