import api from "../api";
import BaseStorage from "./BaseStorage";

class User extends BaseStorage {
  module;

  constructor() {
    super();
    this.module = "user";
  }

  login = (email?: string, password?: string) => {
    return api.post(`/${this.module}/login`, {
      email,
      password,
    });
  };

  signUp = (email?: string, password?: string) => {
    return api.post(`/${this.module}/signup`, {
      email,
      password,
    });
  };
}

export default new User();
