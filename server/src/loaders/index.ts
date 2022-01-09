import mongoLoader from "./mongo";
import expressLoader from "./express";
import { Application } from "express";

export interface LoaderParams {
  expressApp: Application;
}

export default async ({ expressApp }: LoaderParams) => {
  await mongoLoader();
  expressLoader(expressApp);
};
