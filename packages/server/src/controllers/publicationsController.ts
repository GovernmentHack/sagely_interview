import express, { Request, Response } from "express";

export const publicationsRouter = express.Router();

type Publication = {
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

enum ITEM_TYPE {
  WEBPAGE = "webpage",
  VIDEO_RECORDING = "videoRecording",
  MAGAZINE_ARTICLE = "magazineArticle",
  BLOG_POST = "blogPost",
  BOOK = "book",
}

const getPublications = (): Publication[] => {
  return [
    {
      url: "https://www.google.com",
      manualTags: ["reference", "stuff"],
      abstractNote: "Its google. look it up",
      date: new Date(),
      dateAdded: new Date(),
      dateModified: new Date(),
      accessDate: new Date(),
      key: "YEHV4F7I",
      itemType: ITEM_TYPE.WEBPAGE,
      publicationYear: 1970,
      author: "GovernmentHack",
      title: "Google",
    },
    {
      url: "https://www.facebook.com",
      manualTags: ["networking", "stuff"],
      abstractNote: "Its facebook. look it up",
      date: new Date(),
      dateAdded: new Date(),
      dateModified: new Date(),
      accessDate: new Date(),
      key: "YEHV5F7I",
      itemType: ITEM_TYPE.WEBPAGE,
      publicationYear: 1999,
      author: "GovernmentHack",
      title: "Facebook",
    },
    {
      url: "https://www.youtube.com/watch?v=YWA-xbsJrVg",
      manualTags: ["reference", "guide"],
      abstractNote: "Its a youtube video. look it up",
      date: new Date(),
      dateAdded: new Date(),
      dateModified: new Date(),
      accessDate: new Date(),
      key: "YEDG4F7I",
      itemType: ITEM_TYPE.VIDEO_RECORDING,
      publicationYear: 2016,
      author: "Someone Else",
      title: "Make a Webpage",
    }
  ]
}

publicationsRouter.get("/", async (req: Request, res: Response) => {
  // TODO: return all tags from data store
  return res.json(getPublications());
});