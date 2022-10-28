import userService from "../services/User";

class Seeder {
  static seedDb = async () => {
    await userService.signUp("test@test.test", "test", "test");
  };
}

export default Seeder;
