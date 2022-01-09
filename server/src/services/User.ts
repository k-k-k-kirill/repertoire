import UserModel from "../models/User/User";
import PasswordService from "./Password";
import JWT from "../services/JWT";
import UserExistsError from "../errors/UserExistsError";
import UserNotFoundError from "../errors/UserNotFoundError";
import UnauthorizedError from "../errors/UnauthorizedError";

class User {
  passwordService: any;

  constructor() {
    this.passwordService = new PasswordService();
  }

  public signUp = async (
    email: string,
    password: string,
    username?: string
  ) => {
    let userData = { email, username, password };
    const hashedPassword = this.passwordService.createHash(password);
    userData.password = hashedPassword;

    const existingUser = await UserModel.findOne({
      email,
    });

    if (existingUser) {
      throw new UserExistsError();
    }

    const user = new UserModel(userData);
    await user.save();

    return user._id;
  };

  public login = async (email: string, password: string) => {
    const user = await UserModel.findOne({ email });

    console.log(user);

    if (!user) {
      throw new UserNotFoundError();
    }

    const loggedIn = this.passwordService.compare(password, user.password);

    if (loggedIn) {
      const jwtService = new JWT();

      return {
        accessToken: jwtService.createAccessToken(user._id, user.password),
        refreshToken: jwtService.createRefreshToken(user._id, user.password),
        fingerprint: jwtService.getFingerprint(),
      };
    } else {
      throw new UnauthorizedError();
    }
  };
}

export default new User();
