import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import makeId from "../helpers/makeId";
import bcrypt from "bcryptjs";
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
  userId: string | null;

  constructor(fingerprint?: string) {
    this.accessSecret = config.ACCESS_SECRET!;
    this.refreshSecret = config.REFRESH_SECRET!;
    this.fingerprint = fingerprint || makeId(64);
    this.userId = null;
  }

  createRefreshToken = async (userId: string, password: string) => {
    const secret = `${this.refreshSecret}${password}`;
    return jwt.sign(
      { userId, context: await this.getFingerprintHash() },
      secret,
      {
        expiresIn: "7d",
      }
    );
  };

  createAccessToken = async (userId: string, password: string) => {
    const secret = `${this.accessSecret}${password}`;
    return jwt.sign(
      {
        userId,
        context: await this.getFingerprintHash(),
      },
      secret,
      {
        expiresIn: "15min",
      }
    );
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
      accessToken: await this.createAccessToken(userId, password),
    };
  };

  verifyAccessToken = async (accessToken: string) => {
    const user = await this.getUserFromToken(accessToken);

    if (!user) {
      throw new UnauthorizedError();
    }

    const { password } = user;
    const accessTokenSecret = `${this.accessSecret}${password}`;
    const accessTokenContextValid = await this.verifyContext(accessToken);
    const accessTokenValid = this.verify(accessToken, accessTokenSecret);

    if (!accessTokenValid || !accessTokenContextValid) {
      throw new UnauthorizedError();
    }

    return true;
  };

  getUserFromToken = async (token: string) => {
    const { userId } = this.decode(token);
    this.userId = userId;
    const user = await UserModel.findOne({ _id: userId });
    return user;
  };

  verify = (token: string, secret: string) => jwt.verify(token, secret);

  decode = (token: string) => jwt.decode(token) as TokenPayload;

  getFingerprintHash = async () => {
    const hash = await bcrypt.hash(this.fingerprint, this.saltRounds);
    return hash;
  };

  getFingerprint = () => this.fingerprint;

  verifyContext = async (token: string) => {
    const valid = await bcrypt.compare(
      this.getFingerprint(),
      this.decode(token).context
    );

    return valid;
  };
}
