export type TypeErrorSource = {
  path: string | number
  message: string
}[]

export type GenericErrorResponce = {
  statusCode: number
  message: string
  errorSourse: TypeErrorSource
}
