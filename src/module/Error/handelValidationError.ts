import mongoose from 'mongoose'
import {
  GenericErrorResponce,
  TypeErrorSource,
} from '../Interface/Error_Interface'

export const handelValidationError = (
  err: mongoose.Error.ValidationError,
): GenericErrorResponce => {
  const errorSource: TypeErrorSource = Object.values(err.errors).map(
    (
      item: mongoose.Error.ValidatorError | mongoose.Error.CastError,
    ): {
      path: string | number
      message: string
    } => {
      return {
        path: item?.path,
        message: item?.message,
      }
    },
  )

  const statusCode = 400

  return {
    statusCode,
    message: 'Validation Error',
    errorSourse: errorSource,
  }
}
