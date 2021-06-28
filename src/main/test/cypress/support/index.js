Cypress.Commands.add('getByTestId', (id) => cy.get(`[data-testid=${id}]`))
Cypress.Commands.add('getByRole', (role) => cy.get(`[role=${role}]`))
