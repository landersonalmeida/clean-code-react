import faker from 'faker'
import { HttpPostClient, HttpPostParams, HttpResponse, HttpStatusCode, HttpGetClient, HttpGetParams } from '@/data/protocols/http'

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.datatype.json()
})

export class HttpPostClientSpy<BodyType, ResponseType> implements HttpPostClient<BodyType, ResponseType> {
  url?: string
  body?: BodyType
  response: HttpResponse<ResponseType> = {
    statusCode: HttpStatusCode.ok
  }

  async post(params: HttpPostParams<BodyType>): Promise<HttpResponse<ResponseType>> {
    this.url = params.url
    this.body = params.body!
    return await Promise.resolve(this.response)
  }
}

export class HttpGetClientSpy implements HttpGetClient {
  url?: string

  async get(params: HttpGetParams): Promise<void> {
    this.url = params.url
  }
}
