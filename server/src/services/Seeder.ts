import userService from "../services/User";
import testUsers from "../tests/fixtures/userDetails";

class Seeder {
  static seedDb = async () => {
    try {
      const promises = testUsers.map(async (user) => {
        const userExists = await userService.checkIfUserExists(user.email);

        if (!userExists) {
          return await userService.signUp(
            user.email,
            user.password,
            user.username
          );
        }
      });

      Promise.all(promises);
    } catch (err) {
      console.log(err);
    }
  };
}

export default Seeder;
