import * as publicationModule from "./publication";
import { collections } from "../dbSetup";
import { Collection } from "mongodb";

describe("publications", () => {
  test("getPublications will throw if db has not been setup", async () => {
    process.env.MONGODB_CONNSTRING = "";
    await expect(publicationModule.getPublications({})).rejects.toThrow();
  });

  test("getPublications calls find with calulated skip", async () => {
    process.env.MONGODB_CONNSTRING = "whatever";
    collections.publications = { find: jest.fn().mockReturnValue({ toArray: jest.fn() }) } as any as Collection;

    await publicationModule.getPublications({ page: 1, pageSize: 25 });

    expect(collections.publications.find as jest.Mock).toBeCalledTimes(1);
    expect(collections.publications.find as jest.Mock).toBeCalledWith({}, {
      limit: 25,
      skip: 0,
    });

  });

  test("getPublicationsCount will throw if db has not been setup", async () => {
    process.env.MONGODB_CONNSTRING = "";
    await expect(publicationModule.getPublicationsCount({})).rejects.toThrow();
  });

  test("getPublicationTags will throw if db has not been setup", async () => {
    process.env.MONGODB_CONNSTRING = "";
    await expect(publicationModule.getPublicationTags()).rejects.toThrow();
  });
});