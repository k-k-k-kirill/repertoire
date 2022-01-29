import OpeningModel from "../models/Opening/Opening";
import { OpeningData } from "../types/types";

class Opening {
  addNew = async (opening: OpeningData) => {
    const newOpening = new OpeningModel(opening);
    await newOpening.save();

    return newOpening;
  };

  getAll = async () => {
    const openings = await OpeningModel.find();
    return openings;
  };
}

export default new Opening();
