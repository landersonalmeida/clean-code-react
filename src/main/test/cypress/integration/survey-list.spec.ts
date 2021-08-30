import * as Helper from '../support/helpers'
import * as Http from '../support/survey-list-mocks'
import faker from 'faker'

describe('SurveyList', () => {
  beforeEach(() => {
    Helper.setLocalStorageItem('account', {
      accessToken: faker.datatype.uuid(),
      name: faker.name.findName()
    })
    cy.visit('')
  })

  it('Should present error on UnexpectedError', () => {
    Http.mockUnexpectedError()
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu.')
  })

  it('Should logout on AccessDeniedError', () => {
    Http.mockAccessDeniedError()
    Helper.testUrl('/login')
  })
})
