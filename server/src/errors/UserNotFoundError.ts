import CustomError from "./CustomError";

export default class UserNotFoundError extends CustomError {
  statusCode = 404;
  reason = "User not found.";

  constructor() {
    super("User not found.");

    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }

  serializeErrors = () => {
    return [{ message: this.reason }];
  };
}
