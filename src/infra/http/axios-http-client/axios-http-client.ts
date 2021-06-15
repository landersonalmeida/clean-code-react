import { HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    let httpResponse: AxiosResponse<any>

    try {
      httpResponse = await axios.post(params.url, params.body)
    } catch (error) {
      const err = error as AxiosResponse<any>
      httpResponse = err
    }

    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
