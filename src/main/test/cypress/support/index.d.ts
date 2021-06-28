declare namespace Cypress {
  interface Chainable {
    getByTestId: (id: string) => Chainable<Element>
    getByRole: (role: string) => Chainable<Element>
  }
}
