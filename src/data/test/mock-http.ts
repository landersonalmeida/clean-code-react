import faker from 'faker'
import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode } from '@/data/protocols/http'

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: faker.random.arrayElement(['GET', 'POST', 'PUT', 'DELETE']),
  body: faker.datatype.json(),
  headers: faker.datatype.json()
})

export class HttpClientSpy<ResponseType> implements HttpClient<ResponseType> {
  url?: string
  method?: string
  body?: any
  headers?: any
  response: HttpResponse<ResponseType> = {
    statusCode: HttpStatusCode.ok
  }

  async request(data: HttpRequest): Promise<HttpResponse<ResponseType>> {
    this.url = data.url
    this.method = data.method
    this.body = data.body
    this.headers = data.headers
    return await Promise.resolve(this.response)
  }
}
