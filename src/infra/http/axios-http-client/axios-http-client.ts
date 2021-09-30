import { HttpRequest, HttpClient, HttpResponse } from '@/data/protocols/http'
import axios, { AxiosError, AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpClient<any> {
  async request(params: HttpRequest): Promise<HttpResponse<any>> {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await axios.request({
        url: params.url,
        method: params.method,
        data: params.body,
        headers: params.headers
      })
    } catch (error) {
      axiosResponse = (error as AxiosError).response!
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
