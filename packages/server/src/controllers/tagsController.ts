import express, { Request, Response } from "express";
import { getPublicationTags } from "../db/models/publication";

export const tagsRouter = express.Router();

tagsRouter.get("/", async (req: Request, res: Response) => {
  const tags = await getPublicationTags();
  return res.json(tags);
});
