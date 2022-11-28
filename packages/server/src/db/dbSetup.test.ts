import * as dbModule from "./dbSetup";

describe("mongoDb", () => {
  test("setup will throw if no connection string is provided", async () => {
    process.env.MONGODB_CONNSTRING = "";
    await expect(dbModule.connectToDatabase()).rejects.toThrow();
  });
});