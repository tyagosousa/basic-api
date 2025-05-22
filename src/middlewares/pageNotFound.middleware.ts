import express, { Request, Response, NextFunction } from "express";
import { NotFound } from "../errors/notFound-error";

export const pageNotFoundHandler = (app: express.Express) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    next(new NotFound("page not found"));
  });
};
