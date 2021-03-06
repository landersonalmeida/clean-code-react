import * as FormHelper from '../utils/form-helpers'
import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'
import faker from 'faker'

const path = /api\/signup/
const mockEmailInUseError = (): void => Http.mockForbiddenError(path, 'POST')
const mockUnexpectedError = (): void => Http.mockServerError(path, 'POST')
const mockSuccess = (): void => Http.mockOk(path, 'POST', 'account', 'signupRequest')

const populateFields = (): void => {
  cy.getByTestId('name').focus().type(faker.name.findName())
  FormHelper.testInputStatus('name')

  cy.getByTestId('email').focus().type(faker.internet.email())
  FormHelper.testInputStatus('email')

  const password = faker.random.alphaNumeric(7)
  cy.getByTestId('password').focus().type(password)
  cy.getByTestId('passwordConfirmation').focus().type(password)
}

const simulateValidSubmit = (): void => {
  populateFields()

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

  it('Should reset state on page load', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    FormHelper.testInputStatus('email')
    cy.getByTestId('login-link').click()
    cy.getByTestId('signup-link').click()
    FormHelper.testInputStatus('email', 'Campo obrigatório')
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
    mockEmailInUseError()

    simulateValidSubmit()

    FormHelper.testMainError('Esse e-mail já está em uso')

    Helper.testUrl('/signup')
  })

  it('Should present UnexpectedError on default error cases', () => {
    mockUnexpectedError()

    simulateValidSubmit()

    FormHelper.testMainError('Algo de errado aconteceu.')

    Helper.testUrl('/signup')
  })

  // it('Should store account on localStorage if valid credentials are provided', () => {
  //   mockSuccess()

  //   simulateValidSubmit()

  //   Helper.testUrl('/')

  //   Helper.testLocalStorageItem('account')
  // })

  it('Should prevent multiple submits', () => {
    mockSuccess()

    populateFields()

    cy.getByRole('submit').dblclick()

    cy.wait('@signupRequest')

    cy.get('@signupRequest.all').should('have.length', 1)
  })

  it('Should not call submit if form is invalid', () => {
    mockSuccess()

    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')

    cy.get('@signupRequest.all').should('have.length', 0)
  })
})
