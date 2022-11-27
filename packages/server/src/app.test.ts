import { Express } from "express";
import { initApp } from "./app";
import request from "supertest";

describe("root app", () => {
  let app: Express;

  beforeAll(async () => {
    app = await initApp();
  });

  afterAll(async () => {
    jest.restoreAllMocks();
  });

  test("returns a 200", async () => {
    await request(app).get("/").expect(200);
  });
});