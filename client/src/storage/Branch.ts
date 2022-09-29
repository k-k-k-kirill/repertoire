import api from "../api";
import BaseStorage from "./BaseStorage";
import { Branch as BranchType } from "../types/types";

class Branch extends BaseStorage {
  module;

  constructor() {
    super();
    this.module = "branch";
  }

  getOpenings = async () => {
    return api.get(`/${this.module}/openings`);
  };

  getAll = async () => {
    return api.get(`/${this.module}/all`);
  };

  getByParentId = async (parentId: string) => {
    return api.get(`/${this.module}/${parentId}`);
  };

  getById = async (id: string) => {
    return api.get(`/${this.module}/all/${id}`);
  };

  add = async (params: BranchType): Promise<BranchType> => {
    return api.post(`/${this.module}/add`, params);
  };

  modify = async (params: BranchType) => {
    return api.post(`/${this.module}/modify`, params);
  };
}

export default new Branch();
