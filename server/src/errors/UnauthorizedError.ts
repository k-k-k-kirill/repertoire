import CustomError from "./CustomError";

export default class UnauthorizedError extends CustomError {
  statusCode = 401;
  reason = "User unauthorized.";

  constructor() {
    super("User unauthorized.");

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeErrors = () => {
    return [{ message: this.reason }];
  };
}
