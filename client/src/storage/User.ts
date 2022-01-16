import axios from "../axios";
import BaseStorage from "./BaseStorage";

class User extends BaseStorage {
  module;
  constructor() {
    super();
    this.module = "user";
  }

  login = (email?: string, password?: string) => {
    return axios.post(`/${this.module}/login`, {
      email,
      password,
    });
  };
}

export default new User();
