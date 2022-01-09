import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import makeId from "../helpers/makeId";
import bcrypt from "bcrypt";
import UnauthorizedError from "../errors/UnauthorizedError";
import UserModel from "../models/User/User";

interface TokenPayload extends JwtPayload {
  userId: string;
  context: string;
}

export default class JWT {
  private accessSecret: string;
  private refreshSecret: string;
  private fingerprint: string;
  private saltRounds = 10;

  constructor(fingerprint?: string) {
    this.accessSecret = config.ACCESS_SECRET!;
    this.refreshSecret = config.REFRESH_SECRET!;
    this.fingerprint = fingerprint || makeId(64);
  }

  createRefreshToken = (userId: string, password: string) => {
    const secret = `${this.refreshSecret}${password}`;
    return jwt.sign({ userId, context: this.getFingerprintHash() }, secret, {
      expiresIn: "7d",
    });
  };

  createAccessToken = (userId: string, password: string) => {
    const secret = `${this.accessSecret}${password}`;
    return jwt.sign({ userId, context: this.getFingerprintHash() }, secret, {
      expiresIn: "15min",
    });
  };

  refreshToken = async (oldAccessToken: string, refreshToken: string) => {
    const { userId } = this.decode(refreshToken);
    const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      throw new UnauthorizedError();
    }

    const { password } = user;
    const refreshSecret = `${this.refreshSecret}${password}`;
    const refreshTokenValid = this.verify(refreshToken, refreshSecret);
    const refreshTokenContextValid = this.verifyContext(refreshToken);
    const oldAccessTokenContextValid = this.verifyContext(oldAccessToken);

    if (
      !refreshTokenValid ||
      !refreshTokenContextValid ||
      !oldAccessTokenContextValid
    ) {
      throw new UnauthorizedError();
    }

    return {
      refreshToken,
      accessToken: this.createAccessToken(userId, password),
    };
  };

  verify = (token: string, secret: string) => jwt.verify(token, secret);

  decode = (token: string) => jwt.decode(token) as TokenPayload;

  getFingerprintHash = () => bcrypt.hashSync(this.fingerprint, this.saltRounds);

  getFingerprint = () => this.fingerprint;

  verifyContext = (token: string) => {
    return bcrypt.compareSync(
      this.getFingerprint(),
      this.decode(token).context
    );
  };
}
