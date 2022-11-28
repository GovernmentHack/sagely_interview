import express, { Request, Response } from "express";

export const tagsRouter = express.Router();

tagsRouter.get("/", (req: Request, res: Response) => {
  // TODO - return all tags from datastore
  return res.json(["foo", "bar"]);
});