import { Express } from "express";
import { initApp } from "../app";
import request from "supertest";
import { initDbForTests } from "../testUtils/mockDb";

const { getPublicationTagsSpy } = initDbForTests();

describe("publicationsController", () => {
  let app: Express;

  beforeAll(async () => {
    app = await initApp();
  });

  afterAll(async () => {
    jest.restoreAllMocks();
  });

  test("returns a 200 when called", async () => {
    await request(app).get("/tags").expect(200);
    expect(getPublicationTagsSpy).toBeCalled();
  });
});
