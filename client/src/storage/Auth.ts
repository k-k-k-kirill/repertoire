import BaseStorage from "./BaseStorage";
import axios from "../axios";

class Auth extends BaseStorage {
  module;

  constructor() {
    super();
    this.module = "auth";
  }

  refreshAccessToken = (oldAccessToken: string, refreshToken: string) => {
    return axios.post(`/${this.module}/refresh`, {
      accessToken: oldAccessToken,
      refreshToken,
    });
  };
}

export default new Auth();
