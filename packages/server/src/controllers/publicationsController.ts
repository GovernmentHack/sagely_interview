import express, { Request, Response } from "express";
import {
  getPublications,
  getPublicationsCount,
} from "../db/models/publication";

export const publicationsRouter = express.Router();

type getPublicationsRequestParams = {
  page?: number;
  pageSize?: number;
  tagFilter?: string[];
};

publicationsRouter.get(
  "/",
  async (
    req: Request<null, any, any, getPublicationsRequestParams>,
    res: Response
  ) => {
    const pageSize = Number(req.query.pageSize);
    const page = Number(req.query.page);
    const tagFilter = req.query.tagFilter;
    const [publications, maxCount] = await Promise.all([
      getPublications({ page, pageSize, tagFilter }),
      getPublicationsCount({ tagFilter }),
    ]);
    return res.json({ publications, maxCount });
  }
);
