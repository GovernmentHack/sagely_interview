import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { getPublications, getPublicationsCount, ITEM_TYPE, Publication } from "../db/models/publication";

export const publicationsRouter = express.Router();

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