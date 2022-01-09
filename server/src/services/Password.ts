import bcrypt from "bcrypt";

class Password {
  private saltRounds: number;

  constructor() {
    this.saltRounds = 10;
  }

  createHash = (plainTextPassword: string) => {
    return bcrypt.hashSync(plainTextPassword, this.saltRounds);
  };

  compare = (plainTextPassword: string, hashedPassword: string) => {
    return bcrypt.compareSync(plainTextPassword, hashedPassword);
  };
}

export default Password;
