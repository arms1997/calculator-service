import type { Request, Response, NextFunction } from "express";
import { ValidateError } from "tsoa";
import { UserError } from "../User/UserError";
import { AuthError } from "../Authentication/AuthError";

export type ErrorType = UserError | AuthError;

export const ERROR_MAP: Record<ErrorType, number> = {
  [UserError.USER_NOT_FOUND]: 404,
  [UserError.USER_ALREADY_EXISTS]: 409,
  [AuthError.INVALID_CREDENTIALS]: 401,
};

export const ErrorHandlingMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined => {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }

  if (err instanceof Error) {
    const errorType = err.message as ErrorType;
    if (errorType in ERROR_MAP) {
      return res.status(ERROR_MAP[errorType]).json({ message: errorType });
    }

    return res.status(500).json({
      message: err.message,
    });
  }

  next();
};
