import { GetStorage } from '@/data/protocols/cache'
import { HttpGetClient, HttpGetParams, HttpResponse } from '@/data/protocols/http'

export class AuthorizeHttpGetClientDecorator implements HttpGetClient<any> {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient<any>
  ) { }

  async get(params: HttpGetParams): Promise<HttpResponse<any>> {
    const account = this.getStorage.get('account')

    if (account?.accessToken) {
      Object.assign(params, {
        headers: {
          ...params.headers,
          'x-access-token': account.accessToken
        }
      })
    }

    await this.httpGetClient.get(params)
    return null!
  }
}
