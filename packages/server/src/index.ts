import dotenv from "dotenv";
import { initApp } from "./app";

dotenv.config();

initApp().then((app) => {
  const port = process.env.PORT ?? 3000;
  const base_url = process.env.BASE_URL ?? "127.0.0.1";

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://${base_url}:${port}`);
  });
});

