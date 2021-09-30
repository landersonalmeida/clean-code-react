export type HttpRequest = {
  url: string
  method: HttpMethod
  body?: any
  headers?: any
}

export interface HttpClient<R> {
  request: (params: HttpRequest) => Promise<HttpResponse<R>>
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500
}

export type HttpResponse<T> = {
  statusCode: HttpStatusCode
  body?: T
}
