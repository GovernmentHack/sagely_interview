import { Express } from "express";
import { initApp } from "../app";
import request from "supertest";
import { initDbForTests } from "../testUtils/mockDb";

const { getPublicationsSpy, getPublicationsCountSpy } = initDbForTests();

describe("publicationsController", () => {
  let app: Express;

  beforeAll(async () => {
    app = await initApp();
  });

  afterAll(async () => {
    jest.restoreAllMocks();
  });

  test("returns a 200 when called with all parameters", async () => {
    const page = 0;
    const pageSize = 10;
    const tagFilter = ["foo", "bar"];
    await request(app)
      .get("/publications?page=0&pageSize=10&tagFilter[]=foo&tagFilter[]=bar")
      .expect(200);
    expect(getPublicationsSpy).toBeCalledWith({ page, pageSize, tagFilter });
    expect(getPublicationsCountSpy).toBeCalledWith({ tagFilter });
  });
});
