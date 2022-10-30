import mongoose from "mongoose";

class TestingDatabase {
  private testingDatabaseUrl = "mongodb://root:rootpassword@localhost:27017/";

  connectToTestingDatabase = async () =>
    await mongoose.connect(this.testingDatabaseUrl);

  disconnectFromTestingDatabase = async () => await mongoose.connection.close();
}

export default new TestingDatabase();
