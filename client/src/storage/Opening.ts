import api from "../api";
import BaseStorage from "./BaseStorage";

class Opening extends BaseStorage {
  module;

  constructor() {
    super();
    this.module = "opening";
  }

  getAll = async () => {
    return api.get(`/${this.module}/all`);
  };
}

export default new Opening();
