import { GetStorage } from '@/data/protocols/cache'
import { HttpGetClient, HttpGetParams, HttpResponse } from '@/data/protocols/http'

export class AuthorizeHttpGetClientDecorator implements HttpGetClient<any> {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient<any>
  ) { }

  async get(params: HttpGetParams): Promise<HttpResponse<any>> {
    this.getStorage.get('account')
    await this.httpGetClient.get(params)
    return null!
  }
}
