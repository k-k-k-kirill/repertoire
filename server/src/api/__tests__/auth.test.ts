import supertest from "supertest";
import app from "../../app";
import testUsers from "../../tests/fixtures/userDetails";
import testingDatabaseService from "../../services/TestingDatabase";

let cookie = "";
let accessToken = "";
let refreshToken = "";
const testUserDetails = testUsers[0];

beforeAll(async () => {
  await testingDatabaseService.connectToTestingDatabase();

  const response = await supertest(app).post("/user/login").send({
    email: testUserDetails.email,
    password: testUserDetails.password,
  });

  cookie = response.header["set-cookie"];
  accessToken = response.body.accessToken;
  refreshToken = response.body.refreshToken;
});

afterAll(async () => {
  await testingDatabaseService.disconnectFromTestingDatabase();
});

describe("Auth route tests /auth/", () => {
  test("Should refresh token when all necessary fields are provided", async () => {
    const response = await supertest(app)
      .post("/auth/refresh")
      .set("Cookie", cookie)
      .send({
        accessToken,
        refreshToken,
      })
      .expect(200);

    const {
      accessToken: responseAccessToken,
      refreshToken: responseRefreshToken,
    } = response.body;

    expect(responseAccessToken).toBeDefined();
    expect(responseRefreshToken).toBeDefined();
  });

  test("Should return unauthorized", async () => {
    await supertest(app)
      .post("/auth/refresh")
      .set("Cookie", "Context=abc")
      .send({
        accessToken,
        refreshToken,
      })
      .expect(401);
  });

  test("Should return bad request when context cookie is missing", async () => {
    const response = await supertest(app)
      .post("/auth/refresh")
      .send({
        accessToken,
        refreshToken,
      })
      .expect(400);

    const { errors } = response.body;

    expect(errors).toBeDefined();
    expect(errors).toEqual([{ message: "Invalid value", field: "Context" }]);
  });

  test("Should return unauthorized when access token is invalid", async () => {
    await supertest(app)
      .post("/auth/refresh")
      .set("Cookie", cookie)
      .send({
        accessToken: "invalidAccessToken",
        refreshToken,
      })
      .expect(401);
  });

  test("Should return bad request when access token is missing", async () => {
    const response = await supertest(app)
      .post("/auth/refresh")
      .set("Cookie", cookie)
      .send({
        refreshToken,
      })
      .expect(400);

    const { errors } = response.body;

    expect(errors).toBeDefined();
    expect(errors).toEqual([
      { message: "Invalid value", field: "accessToken" },
    ]);
  });

  test("Should return unauthorized when refresh token is invalid", async () => {
    await supertest(app)
      .post("/auth/refresh")
      .set("Cookie", cookie)
      .send({
        accessToken,
        refreshToken: "invalidRefreshToken",
      })
      .expect(401);
  });

  test("Should return bad request when refresh token is missing", async () => {
    const response = await supertest(app)
      .post("/auth/refresh")
      .set("Cookie", cookie)
      .send({
        accessToken,
      })
      .expect(400);

    const { errors } = response.body;

    expect(errors).toBeDefined();
    expect(errors).toEqual([
      { message: "Invalid value", field: "refreshToken" },
    ]);
  });
});
