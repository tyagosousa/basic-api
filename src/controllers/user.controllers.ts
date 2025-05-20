import { NextFunction, Request, Response } from 'express'
import { getFirestore } from 'firebase-admin/firestore' 
import { ValidationError } from '../errors/validation.error';
import { DocExists } from '../errors/docExists-error';

type User = {
    id: Number,
  name: string;
  email: string;
}

export class UsersController{

    static async getAll(req: Request, res: Response, next: NextFunction){
        try {
            const snapshot = await getFirestore().collection('users').get()
            const users = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                } 
            })
            res.status(200).send(users)
        } catch (error) {
            next(error)
        }
    }

    static async getOne(req: Request, res: Response, next: NextFunction){
       try {
         let userId = req.params.id
         const doc = await getFirestore().collection('users').doc(userId).get()
         let user = {
             id: doc.id,
             ...doc.data()
         }
         if(doc.exists){
            res.send(user)
         }else{
            throw new DocExists("User doesn't identified")
         }
       } catch (error) {
            next(error)
       }
    }

    static async create(req: Request, res: Response, next: NextFunction){
        try {
            const user: User = req.body;
            if(!user.email || user.email.length === 0 || !user.name || user.name.length === 0){
                throw new ValidationError('All camps are requerid')
            }
            const userCreated = await getFirestore().collection('users').add(user)
            res.status(201).send({       
                message:`${userCreated.id} was created!`
            });
        } catch (error) {
            next(error)
        }
    }

    static async update(req: Request, res: Response, next: NextFunction){
       try {
            let userId = req.params.id
            let user: User = req.body
            await getFirestore().collection('users').doc(userId).set({
                name: user.name,
                email: user.email
            })
            res.send({
                message: "User updated"
            })
       } catch (error) {
             next(error)
       }
    }

    static async delete(req: Request, res: Response, next: NextFunction){
       try {
            let userId = req.params.id
            await getFirestore().collection('users').doc(userId).delete()
            res.status(204).end()
       } catch (error) {
           next(error)
       }
    }
}