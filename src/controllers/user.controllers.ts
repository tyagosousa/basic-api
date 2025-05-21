import { NextFunction, Request, Response } from 'express'
import { getFirestore } from 'firebase-admin/firestore' 
import { NotFound } from '../errors/notFound-error';
import { User } from '../models/user.model';

export class UsersController{

    static async getAll(req: Request, res: Response, next: NextFunction){
        const snapshot = await getFirestore().collection('users').get()
            const users = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                } 
            })
            res.status(200).send(users)
    }

    static async getOne(req: Request, res: Response, next: NextFunction){
       let userId = req.params.id
         const doc = await getFirestore().collection('users').doc(userId).get()
         if(doc.exists){
            res.send({
                id: doc.id,
             ...doc.data()
            })
         }else{
            throw new NotFound("User is not identified")
         }
    }

    static async create(req: Request, res: Response, next: NextFunction){
        const user = req.body;          
        const userCreated = await getFirestore().collection('users').add(user)
        res.status(201).send({       
            message:`${userCreated.id} was created!`
        });
    }

    static async update(req: Request, res: Response, next: NextFunction){
        let userId = req.params.id
        let user = req.body as User
        let docRef = await getFirestore().collection('users').doc(userId)
        if((await docRef.get()).exists){
            await docRef.set({
                name: user.name,
                email: user.email
            })
                res.status(200).send({
            message: "User updated"
            })
            }else{
                throw new NotFound('O usuário não foi encontrado')
            }
    }

    static async delete(req: Request, res: Response, next: NextFunction){
        let userId = req.params.id
        await getFirestore().collection('users').doc(userId).delete()
        res.status(204).end()
    }
}