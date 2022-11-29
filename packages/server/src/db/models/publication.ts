import { ObjectId } from "mongodb";
import { collections } from "../dbSetup";

export type Publication = {
  _id: ObjectId;
  url: string;
  manualTags: string[];
  abstractNote: string;
  date: Date;
  dateAdded: Date;
  dateModified: Date;
  accessDate: Date;
  key: string;
  itemType: ITEM_TYPE;
  publicationYear: number;
  author: string;
  title: string;
};

export enum ITEM_TYPE {
  WEBPAGE = "webpage",
  VIDEO_RECORDING = "videoRecording",
  MAGAZINE_ARTICLE = "magazineArticle",
  BLOG_POST = "blogPost",
  BOOK = "book",
}

export interface getPublicationsParams {
  page?: number;
  pageSize?: number;
  tagFilter?: string[];
}

/**
 * getPublications
 *
 * queries the publications collection, with paging and filtering by tag
 *
 * @param getPublicationsParams.page - current page to retrieve
 * @param getPublicationsParams.pageSize - number of items to retrieve
 * @param getPublicationsParams.tagFilter - a string list of tags to query by. Uses Mongo's $in (i.e. the tags are or'd)
 * @returns
 */
export async function getPublications({
  page = 0,
  pageSize = 10,
  tagFilter,
}: getPublicationsParams) {
  if (!collections.publications) {
    throw new Error("publications collection not initialized");
  }
  const options = {
    limit: pageSize,
    skip: pageSize * page, // page is 0 indexed
  };
  const tagFilterQuery = tagFilter?.length
    ? { manualTags: { $in: tagFilter } }
    : {};
  const publications = await collections.publications
    .find<Publication>(tagFilterQuery, options)
    .toArray();
  return publications;
}

/**
 * getPublicationsCount
 *
 * gets a count of all publications in the collection, based on an optional filter
 *
 * @param tagFilter - a string list of tags to query by. Uses Mongo's $in (i.e. the tags are or'd)
 * @returns
 */
export async function getPublicationsCount({
  tagFilter,
}: {
  tagFilter?: string[];
}) {
  if (!collections.publications) {
    throw new Error("publications collection not initialized");
  }
  const tagFilterQuery = tagFilter?.length
    ? { manualTags: { $in: tagFilter } }
    : {};
  const publicationsCount = await collections.publications.countDocuments(
    tagFilterQuery
  );
  return publicationsCount;
}

/**
 * getPublicationTags
 *
 * returns all distict tags on publications
 *
 * @returns
 */
export async function getPublicationTags() {
  if (!collections.publications) {
    throw new Error("publications collection not initialized");
  }
  const tags = await collections.publications.distinct("manualTags");
  return tags;
}
