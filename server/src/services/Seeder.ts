import userService from "../services/User";
import testUserDetails from "../tests/fixtures/userDetails";

class Seeder {
  static seedDb = async () => {
    try {
      const userExists = await userService.checkIfUserExists(
        testUserDetails.email
      );

      if (!userExists) {
        await userService.signUp(
          testUserDetails.email,
          testUserDetails.password,
          testUserDetails.username
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export default Seeder;
