import BranchModel from "../models/Branch/Branch";
import { BranchData } from "../types/types";

class Branch {
  addNew = async (branch: BranchData, userId: string) => {
    let data = branch;

    if (!branch.parent) {
      data.owner = userId;
    }

    const newOpening = new BranchModel(branch);
    await newOpening.save();

    return newOpening;
  };

  modify = async (modifiedBranch: BranchData) => {
    const newOpening = await BranchModel.findOneAndUpdate(
      { _id: modifiedBranch._id },
      modifiedBranch,
      { new: true }
    );

    return newOpening;
  };

  getAll = async () => {
    const branches = await BranchModel.find({});
    return branches;
  };

  getOpenings = async (userId: string) => {
    const openings = await BranchModel.find({ parent: null, owner: userId });
    return openings;
  };

  getByParentId = async (parentId: string) => {
    const branches = await BranchModel.find({ parent: parentId });

    return branches;
  };

  getById = async (id: string) => {
    const branch = await BranchModel.findOne({ _id: id });

    return branch;
  };
}

export default new Branch();
