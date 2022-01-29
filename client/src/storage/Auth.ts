import BaseStorage from "./BaseStorage";
import api from "../api";

class Auth extends BaseStorage {
  module;

  constructor() {
    super();
    this.module = "auth";
  }

  refreshAccessToken = (oldAccessToken: string, refreshToken: string) => {
    return api.post(`/${this.module}/refresh`, {
      accessToken: oldAccessToken,
      refreshToken,
    });
  };
}

export default new Auth();
