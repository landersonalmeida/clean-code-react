import { HttpGetParams, HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http'
import axios, { AxiosError, AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await axios.post(params.url, params.body)
    } catch (error) {
      axiosResponse = (error as AxiosError).response!
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }

  async get(params: HttpGetParams): Promise<HttpResponse<any>> {
    const axiosResponse = await axios.get(params.url)

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
