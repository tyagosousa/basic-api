import express from "express";
import { UsersController } from "../controllers/user.controllers";
import asyncHandler from "express-async-handler";
import { celebrate, Segments } from "celebrate";
import { userSchema } from "../models/user.model";
export const userRoutes = express.Router();

userRoutes.use(express.json());

userRoutes.get("/users", asyncHandler(UsersController.getAll));
userRoutes.get("/user/:id", asyncHandler(UsersController.getOne));
userRoutes.post(
  "/users",
  celebrate({ [Segments.BODY]: userSchema }),
  asyncHandler(UsersController.create)
);
userRoutes.put(
  "/users/:id",
  celebrate({ [Segments.BODY]: userSchema }),
  asyncHandler(UsersController.update)
);
userRoutes.delete("/users/:id", asyncHandler(UsersController.delete));
