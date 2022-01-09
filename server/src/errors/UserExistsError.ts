import CustomError from "./CustomError";

export default class UserExistsError extends CustomError {
  statusCode = 409;
  reason = "User with such e-mail already exists.";

  constructor() {
    super("User with such e-mail already exists.");

    Object.setPrototypeOf(this, UserExistsError.prototype);
  }

  serializeErrors = () => {
    return [{ message: this.reason }];
  };
}
