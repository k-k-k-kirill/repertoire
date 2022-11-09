import supertest from "supertest";
import app from "../../app";
import testingDatabaseService from "../../services/TestingDatabase";
import testUserDetails from "../../tests/fixtures/userDetails";
import { ModifyActions } from "../../types/types";

let cookie = "";
let accessToken = "";
let testOpeningId = "";
let childBranchId = "";
let grandChildBranchId = "";

beforeAll(async () => {
  await testingDatabaseService.connectToTestingDatabase();

  const response = await supertest(app).post("/user/login").send({
    email: testUserDetails.email,
    password: testUserDetails.password,
  });

  cookie = response.header["set-cookie"];
  accessToken = response.body.accessToken;

  const openingResponse = await supertest(app)
    .post("/branch/add")
    .set("Authorization", accessToken)
    .set("Cookie", cookie)
    .send({
      title: "Test",
      parent: null,
      mainLine: ["e2", "e4"],
      startPosition: "start",
      endPosition: "start",
    })
    .expect(200);

  testOpeningId = openingResponse.body._id;

  const childBranchResponse = await supertest(app)
    .post("/branch/add")
    .set("Authorization", accessToken)
    .set("Cookie", cookie)
    .send({
      title: "Test",
      parent: testOpeningId,
      mainLine: ["e2", "e4"],
      startPosition: "start",
      endPosition: "start",
    })
    .expect(200);

  childBranchId = childBranchResponse.body._id;

  const grandChildBranchResponse = await supertest(app)
    .post("/branch/add")
    .set("Authorization", accessToken)
    .set("Cookie", cookie)
    .send({
      title: "Test",
      parent: childBranchId,
      mainLine: ["e2", "e4"],
      startPosition: "start",
      endPosition: "start",
    })
    .expect(200);

  grandChildBranchId = grandChildBranchResponse.body._id;
});

afterAll(async () => {
  await testingDatabaseService.disconnectFromTestingDatabase();
});

describe("Branch route tests /branch/", () => {
  test("Opening can be added successfully", async () => {
    const response = await supertest(app)
      .post("/branch/add")
      .set("Authorization", accessToken)
      .set("Cookie", cookie)
      .send({
        title: "Test",
        parent: null,
        mainLine: ["e2", "e4"],
        startPosition: "start",
        endPosition: "start",
      })
      .expect(200);

    expect(response.body.title).toEqual("Test");
    expect(response.body.parent).toEqual(null);
    expect(response.body.startPosition).toEqual("start");
    expect(response.body.endPosition).toEqual("start");
    expect(response.body.owner).toBeDefined();
  });

  test("Child branch can be added successfully", async () => {
    const response = await supertest(app)
      .post("/branch/add")
      .set("Authorization", accessToken)
      .set("Cookie", cookie)
      .send({
        title: "Test",
        parent: testOpeningId,
        mainLine: ["e2", "e4"],
        startPosition: "start",
        endPosition: "start",
      })
      .expect(200);

    expect(response.body.title).toEqual("Test");
    expect(response.body.parent).toEqual(testOpeningId);
    expect(response.body.startPosition).toEqual("start");
    expect(response.body.endPosition).toEqual("start");
    expect(response.body.owner).toBeDefined();
  });

  test("Bad request returned when trying to add branch with invalid values", async () => {
    const response = await supertest(app)
      .post("/branch/add")
      .set("Authorization", accessToken)
      .set("Cookie", cookie)
      .send({
        title: 123,
        parent: 123,
        mainLine: "test",
        startPosition: 123,
        endPosition: 123,
      })
      .expect(400);

    expect(response.body.errors).toEqual([
      { message: "Missing opening title", field: "title" },
      { message: "Invalid value", field: "parent" },
      { message: "Invalid value", field: "mainLine" },
      { message: "Invalid value", field: "startPosition" },
      { message: "Invalid value", field: "endPosition" },
    ]);
  });

  test("Branch can be retrieved by id successfully", async () => {
    const response = await supertest(app)
      .get(`/branch/all/${testOpeningId}`)
      .set("Authorization", accessToken)
      .set("Cookie", cookie)
      .expect(200);

    expect(response.body._id).toEqual(testOpeningId);
    expect(response.body.title).toEqual("Test");
    expect(response.body.parent).toEqual(null);
    expect(response.body.mainLine).toEqual(["e2", "e4"]);
    expect(response.body.startPosition).toEqual("start");
    expect(response.body.endPosition).toEqual("start");
    expect(response.body.owner).toBeDefined();
  });

  test("Branch name can be modified successfully", async () => {
    const response = await supertest(app)
      .post("/branch/modify")
      .set("Authorization", accessToken)
      .set("Cookie", cookie)
      .send({
        _id: testOpeningId,
        title: "Test rename",
        parent: null,
        mainLine: ["e2", "e4"],
        startPosition: "start",
        endPosition: "start",
        actionType: ModifyActions.RenameBranch,
      })
      .expect(200);

    expect(response.body._id).toEqual(testOpeningId);
    expect(response.body.title).toEqual("Test rename");
    expect(response.body.parent).toEqual(null);
    expect(response.body.mainLine).toEqual(["e2", "e4"]);
    expect(response.body.startPosition).toEqual("start");
    expect(response.body.endPosition).toEqual("start");
    expect(response.body.owner).toBeDefined();
  });

  test("New move can be added successfully to main line", async () => {
    const response = await supertest(app)
      .post("/branch/modify")
      .set("Authorization", accessToken)
      .set("Cookie", cookie)
      .send({
        _id: testOpeningId,
        title: "Test",
        parent: null,
        mainLine: ["e2", "e4", "d6"],
        startPosition: "2131231",
        endPosition: "12312312",
        actionType: ModifyActions.AddMove,
      })
      .expect(200);

    expect(response.body._id).toEqual(testOpeningId);
    expect(response.body.title).toEqual("Test");
    expect(response.body.parent).toEqual(null);
    expect(response.body.mainLine).toEqual(["e2", "e4", "d6"]);
    expect(response.body.startPosition).toEqual("2131231");
    expect(response.body.endPosition).toEqual("12312312");
    expect(response.body.owner).toBeDefined();
  });

  test("Child branches are cleaned up if move was undone in parent", async () => {
    await supertest(app)
      .post("/branch/modify")
      .set("Authorization", accessToken)
      .set("Cookie", cookie)
      .send({
        _id: childBranchId,
        title: "Test",
        parent: testOpeningId,
        mainLine: ["e2", "e4"],
        startPosition: "start",
        endPosition: "start",
        actionType: ModifyActions.UndoMove,
      })
      .expect(200);

    await supertest(app)
      .get(`/branch/all/${grandChildBranchId}`)
      .set("Authorization", accessToken)
      .set("Cookie", cookie)
      .expect(404);
  });

  test("Branch can be successfully deleted", async () => {
    await supertest(app)
      .delete(`/branch/${testOpeningId}`)
      .set("Authorization", accessToken)
      .set("Cookie", cookie)
      .expect(204);

    await supertest(app)
      .get(`/branch/all/${testOpeningId}`)
      .set("Authorization", accessToken)
      .set("Cookie", cookie)
      .expect(404);
  });
});
