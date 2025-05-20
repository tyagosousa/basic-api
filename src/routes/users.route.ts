import express from 'express'
import { UsersController } from '../controllers/user.controllers';

export const userRoutes = express.Router()

userRoutes.use(express.json())

userRoutes.get('/users', UsersController.getAll)
userRoutes.get('/users/:id', UsersController.getOne)
userRoutes.post('/users', UsersController.create)
userRoutes.put('/users/:id', UsersController.update)
userRoutes.delete('/users/:id', UsersController.delete)