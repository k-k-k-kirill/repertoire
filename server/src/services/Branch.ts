import NotFoundError from "../errors/NotFoundError";
import BranchModel from "../models/Branch/Branch";
import {
  BranchData,
  BranchModificationData,
  ModifyActions,
} from "../types/types";

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

  modify = async (branchModificationData: BranchModificationData) => {
    if (branchModificationData.actionType === ModifyActions.UndoMove) {
      await this.cleanupChildBranches(branchModificationData._id);
    }

    const branchData = { ...branchModificationData };
    delete branchData.actionType;

    const newOpening = await BranchModel.findOneAndUpdate(
      { _id: branchData._id },
      branchData,
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

    if (!branch) {
      throw new NotFoundError();
    }

    return branch;
  };

  cleanupChildBranches = async (parentId: string) => {
    await BranchModel.deleteMany({
      parent: parentId,
    });
  };

  delete = async (branchId: string) => {
    await BranchModel.deleteOne({ _id: branchId });
  };
}

export default new Branch();
