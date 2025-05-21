import express from 'express'
import { UsersController } from '../controllers/user.controllers';
import asyncHandler from 'express-async-handler'

export const userRoutes = express.Router()

userRoutes.use(express.json())

userRoutes.get('/users', asyncHandler(UsersController.getAll))
userRoutes.get('/users/:id', asyncHandler(UsersController.getOne))
userRoutes.post('/users', asyncHandler(UsersController.create))
userRoutes.put('/users/:id', asyncHandler(UsersController.update))
userRoutes.delete('/users/:id', asyncHandler(UsersController.delete))