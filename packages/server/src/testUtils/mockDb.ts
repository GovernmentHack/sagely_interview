import * as dbSetupModule from "../db/dbSetup";
import * as publicationsModule from "../db/models/publication";

/**
 * initDbForTests
 * Mocks all the database getters and initializers, and returns those spies
 */
export function initDbForTests() {
  const connectToDatabaseSpy = jest
    .spyOn(dbSetupModule, "connectToDatabase")
    .mockImplementation(async () => { });
  const getPublicationsSpy = jest
    .spyOn(publicationsModule, "getPublications")
    .mockImplementation(async () => []);
  const getPublicationTagsSpy = jest
    .spyOn(publicationsModule, "getPublicationTags")
    .mockImplementation(async () => []);
  const getPublicationsCountSpy = jest
    .spyOn(publicationsModule, "getPublicationsCount")
    .mockImplementation(async () => 0);

  return {
    connectToDatabaseSpy,
    getPublicationsSpy,
    getPublicationTagsSpy,
    getPublicationsCountSpy,
  };
}
