import BaseStorage from "./BaseStorage";
import api from "../api";

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

class Auth extends BaseStorage {
  module;

  constructor() {
    super();
    this.module = "auth";
  }

  refreshAccessToken = (
    oldAccessToken: string,
    refreshToken: string
  ): Promise<RefreshTokenResponse> => {
    return api.post(`/${this.module}/refresh`, {
      accessToken: oldAccessToken,
      refreshToken,
    });
  };
}

export default new Auth();
