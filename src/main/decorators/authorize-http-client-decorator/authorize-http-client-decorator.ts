import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols/http'
import { GetStorage } from '@/data/protocols/cache'

export class AuthorizeHttpClientDecorator implements HttpClient<any> {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpClient: HttpClient<any>
  ) { }

  async request(params: HttpRequest): Promise<HttpResponse<any>> {
    const account = this.getStorage.get('account')

    if (account?.accessToken) {
      Object.assign(params, {
        headers: {
          ...params.headers,
          'x-access-token': account.accessToken
        }
      })
    }

    const httpResponse = await this.httpClient.request(params)

    return httpResponse
  }
}
