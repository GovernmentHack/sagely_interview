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
}

export enum ITEM_TYPE {
  WEBPAGE = "webpage",
  VIDEO_RECORDING = "videoRecording",
  MAGAZINE_ARTICLE = "magazineArticle",
  BLOG_POST = "blogPost",
  BOOK = "book",
}

export async function getPublications({ page, limit, pageSize = 10 }: { page?: number; limit?: number, pageSize?: number }) {
  if (!collections.publications) {
    throw new Error("publications collection not initialized");
  }
  const options = {
    limit,
    skip: page ? (pageSize * page) : undefined,
  }
  const publications = await collections.publications.find<Publication>({}, options).toArray();
  return publications;
}

export async function getPublicationsCount() {
  if (!collections.publications) {
    throw new Error("publications collection not initialized");
  }
  const publicationsCount = await collections.publications.countDocuments();
  return publicationsCount;
}
