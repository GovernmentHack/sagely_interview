import * as publicationModule from "./publication";

describe("publications", () => {
  test("setup will throw if db has not been setup", async () => {
    process.env.MONGODB_CONNSTRING = "";
    await expect(publicationModule.getPublications({})).rejects.toThrow();
  });
});