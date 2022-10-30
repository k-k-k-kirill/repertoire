import supertest from "supertest";
import app from "../../app";
import mongoose from "mongoose";
import testingDatabaseService from "../../services/TestingDatabase";

beforeAll(async () => {
  await testingDatabaseService.connectToTestingDatabase();
});

afterAll(async () => {
  await testingDatabaseService.disconnectFromTestingDatabase();
});

describe("This is test of testing", () => {
  test("Jest is doing testing", async () => {
    await supertest(app)
      .post("/user/login")
      .send({
        email: "test@test.test",
        password: "test",
      })
      .expect(200);
  });
});
