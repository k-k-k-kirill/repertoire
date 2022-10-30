import userService from "../services/User";
import mongoose from "mongoose";

class Seeder {
  static seedDb = async () => {
    try {
      await userService.signUp("test@test.test", "test", "test");
    } catch (err) {
      console.log(err);
    }
  };
}

export default Seeder;
