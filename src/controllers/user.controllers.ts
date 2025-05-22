import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import { UserService } from "../services/user.service";

export class UsersController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    res.status(200).send(await new UserService().getAll());
  }

  static async getOne(req: Request, res: Response, next: NextFunction) {
    await new UserService().getOne(req.params.id);
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    await new UserService().create(req.body);
    res.status(201).send({ message: "user created with sucess!" });
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    await new UserService().update(req.params.id, req.body as User);
    res.status(200).send({ message: "user updated with sucess" });
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    await new UserService().delete(req.params.id);
    res.status(204).end();
  }
}
