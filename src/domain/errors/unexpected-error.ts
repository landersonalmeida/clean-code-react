export class UnexpectedError extends Error {
  constructor() {
    super('Algo de errado aconteceu.')
    this.name = 'UnexpectedError'
  }
}
