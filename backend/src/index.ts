import express, { Application, Request, Response } from "express";
import cors from "cors";
import cron from "node-cron";

import { getData } from "./api/subgraph";

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.disable("x-powered-by");

app.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    message: "Server is running.",
  });
});

const PORT = 3000;

try {
  app.listen(PORT, (): void => {
    console.log(`Connected successfully on port ${PORT}`);
    cron.schedule(`0 0 * * *`, () => {
      getData();
    });
  });
} catch (error: any) {
  console.error(`Error ocurred: ${error.message}`);
}
