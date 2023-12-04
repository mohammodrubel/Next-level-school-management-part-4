import express, {
  Application,
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from 'express'
import { ZodError, ZodIssue } from 'zod'
import { TypeErrorSource } from '../Interface/Error_Interface'
import config from '../../config'
import { AppError, handelZodError } from './appError'
import { handelValidationError } from './handelValidationError'
import handelCastError from './handelCastError'
import { handelDuplicateError } from './handelDuplicateError'
const globalErrorHandeler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500
  let message = 'something went wrong'
  let ErrorSource: TypeErrorSource = [
    {
      path: 'string',
      message: 'something went wrong',
    },
  ]

  if (err instanceof ZodError) {
    const simplified = handelZodError(err)
    statusCode = simplified?.statusCode
    message = simplified?.message
    ErrorSource = simplified?.ErrorSource
  } else if (err?.name === 'validationError') {
    const simplifiedError = handelValidationError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    ErrorSource = simplifiedError?.errorSourse
  } else if (err?.name === 'CastError') {
    const simplifiedError = handelCastError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    ErrorSource = simplifiedError?.errorSourse
  } else if (err?.code === 11000) {
    const simplifiedError = handelDuplicateError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    ErrorSource = simplifiedError?.errorSourse
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode
    message = err?.message
    ErrorSource = [{ path: '', message: err?.message }]
  } else if (err instanceof Error) {
    message = err?.message
    ErrorSource = [{ path: '', message: err?.message }]
  }
  return res.status(statusCode).json({
    success: false,
    message,
    ErrorSource,
    stack: config.node_env === 'development' ? err?.stack : null,
  })
}

export default globalErrorHandeler
