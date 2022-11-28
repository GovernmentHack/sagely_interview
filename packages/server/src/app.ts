import express, { Express } from "express";
import cors from "cors";
import { tagsRouter } from "./controllers/tagsController";
import { publicationsRouter } from "./controllers/publicationsController";

export async function initApp(): Promise<Express> {
  const app = express();

  app.use(cors());

  app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
  });

  app.use("/tags", tagsRouter);
  app.use("/publications", publicationsRouter);

  return app;
}