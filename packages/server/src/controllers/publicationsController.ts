import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { getPublications, getPublicationsCount, ITEM_TYPE, Publication } from "../db/models/publication";

export const publicationsRouter = express.Router();

const getDummyPublications = (): Publication[] => {
  return [
    {
      _id: new ObjectId(),
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
      _id: new ObjectId(),
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
      _id: new ObjectId(),
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

type getPublicationsRequestParams = {
  page?: number;
  pageSize?: number;
}

publicationsRouter.get("/", async (req: Request<null, any, any, getPublicationsRequestParams>, res: Response) => {
  const pageSize = Number(req.query.pageSize);
  const page = Number(req.query.page);
  const [publications, maxCount] = await Promise.all([getPublications({ page, pageSize }), getPublicationsCount()]);
  return res.json({ publications, maxCount });
});