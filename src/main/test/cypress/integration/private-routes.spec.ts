import * as Helper from '../utils/helpers'

describe('PrivateRoutes', () => {
  it('Should logout if survey-list has no token', () => {
    cy.visit('')
    Helper.testUrl('/login')
  })
})
