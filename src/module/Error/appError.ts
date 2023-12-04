import { ZodError, ZodIssue } from 'zod'
import { TypeErrorSource } from '../Interface/Error_Interface'

export class AppError extends Error {
  public statusCode: number

  constructor(statusCode: number, message: string, stack = '') {
    super(message)
    this.statusCode = statusCode

    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export const handelZodError = (err: ZodError) => {
  const ErrorSource: TypeErrorSource = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    }
  })
  const statusCode = 400

  return {
    statusCode,
    message: 'Validation Error',
    ErrorSource,
    err,
  }
}
