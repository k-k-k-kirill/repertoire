import supertest from "supertest";
import app from "../../app";
import testingDatabaseService from "../../services/TestingDatabase";
import testUserDetails from "../../tests/fixtures/userDetails";

beforeAll(async () => {
  await testingDatabaseService.connectToTestingDatabase();
});

afterAll(async () => {
  await testingDatabaseService.disconnectFromTestingDatabase();
});

describe("User route tests /user/", () => {
  test("Should login user when all necessary details are provided", async () => {
    const response = await supertest(app)
      .post("/user/login")
      .send({
        email: testUserDetails.email,
        password: testUserDetails.password,
      })
      .expect(200);

    expect(response.body).toHaveProperty("accessToken");
    expect(response.body).toHaveProperty("refreshToken");
    expect(response.header).toHaveProperty("set-cookie");
  });

  test("Should return not found error if user doesn't exist", async () => {
    await supertest(app)
      .post("/user/login")
      .send({
        email: "email@wrong.com",
        password: testUserDetails.password,
      })
      .expect(404);
  });

  test("Should return unauthorized error if wrong password is provided", async () => {
    await supertest(app)
      .post("/user/login")
      .send({
        email: testUserDetails.email,
        password: "Password1234#",
      })
      .expect(401);
  });

  test("Should return bad request error if invalid email is provided", async () => {
    await supertest(app)
      .post("/user/login")
      .send({
        email: "test",
        password: testUserDetails.password,
      })
      .expect(400);
  });

  test("Should return conflict status when trying to sign up existing user", async () => {
    await supertest(app)
      .post("/user/signup")
      .send({
        email: testUserDetails.email,
        password: testUserDetails.password,
        username: testUserDetails.username,
      })
      .expect(409);
  });

  test("Should return bad request status when trying to sign up user with invalid password", async () => {
    const response = await supertest(app)
      .post("/user/signup")
      .send({
        email: testUserDetails.email,
        password: "test",
        username: testUserDetails.username,
      })
      .expect(400);

    const { errors } = response.body;

    expect(errors).toBeDefined();
    expect(errors).toEqual([
      { message: "Password must be at least 10 chars.", field: "password" },
      { message: "Password must contain a number.", field: "password" },
      {
        message: "Password must containd at least one uppercase letter.",
        field: "password",
      },
      {
        message: "Password must contain at least one special character.",
        field: "password",
      },
    ]);
  });

  test("Should return bad request status when trying to sign up user with invalid password", async () => {
    const response = await supertest(app)
      .post("/user/signup")
      .send({
        email: "test",
        password: testUserDetails.password,
        username: testUserDetails.username,
      })
      .expect(400);

    const { errors } = response.body;

    expect(errors).toBeDefined();
    expect(errors).toEqual([{ message: "Invalid value", field: "email" }]);
  });
});
