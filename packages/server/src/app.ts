import express, { Express } from "express";

export async function initApp(): Promise<Express> {
  const app = express();

  app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
  });

  return app;
}