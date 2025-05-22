import express from "express";
import { userRoutes } from "./users.route";

export const routes = (app: express.Express) => {
  userRoutes.use(express.json());
  app.use(userRoutes);
};
