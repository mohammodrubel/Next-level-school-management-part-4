import {
  GenericErrorResponce,
  TypeErrorSource,
} from '../Interface/Error_Interface'

export const handelDuplicateError = (err: any): GenericErrorResponce => {
  // Using a simpler regular expression to extract the value
  const match = err.message.match(/"([^"]+)"/)

  // Check if there's a match and get the captured group
  const extractedMessage = match?.[1] || null

  const errorSource: TypeErrorSource = [
    {
      path: '',
      message: `${extractedMessage} is already exist`,
    },
  ]

  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error',
    errorSourse: errorSource,
  }
}
