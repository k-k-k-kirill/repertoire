import express, { Application, Request, Response } from "express";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Up and running!");
});

app.listen(3000, () => {
  console.log("App is listening on port 3000!");
});
