import mongoose from 'mongoose'
import {
  GenericErrorResponce,
  TypeErrorSource,
} from '../Interface/Error_Interface'

export const handelCastError = (
  err: mongoose.Error.CastError,
): GenericErrorResponce => {
  const errorSource: TypeErrorSource = [
    {
      path: err?.path,
      message: err?.message,
    },
  ]

  const statusCode = 400
  return {
    statusCode,
    message: 'Invalid Id',
    errorSourse: errorSource,
  }
}

export default handelCastError
