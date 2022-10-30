import supertest from "supertest";
import app from "../../app";
import mongoose from "mongoose";

beforeAll(async () => {
  const testingUrl = "mongodb://root:rootpassword@localhost:27017/";
  await mongoose.connect(testingUrl);
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

afterAll(async () => {
  await mongoose.connection.close();
});
