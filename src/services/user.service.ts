import { getFirestore } from "firebase-admin/firestore";
import { User } from "../models/user.model";
import { NotFound } from "../errors/notFound-error";

export class UserService{

    async getAll(): Promise<User[]>{
         const snapshot = await getFirestore().collection('users').get()
                return snapshot.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    } 
                }) as User[]
            }

    async getOne(id: string): Promise<User>{
         const doc = await getFirestore().collection('users').doc(id).get()
         if(doc.exists){
                return {
                id: doc.id,
                ... doc.data()
            } as User
         }else{
            throw new NotFound('Usuário não identificado')
         }
    }

    async create(user: User){
        await getFirestore().collection('users').add(user)
    }

    async update(id: string, user: User){
        let docRef = getFirestore().collection('users').doc(id)
        if((await docRef.get()).exists){
            await docRef.set({
                name: user.name,
                email: user.email
            })
            }else{
                throw new NotFound('O usuário não foi encontrado')
            }
    }

    async delete(id: string){
        let docRef = getFirestore().collection('users').doc(id)
        if((await docRef.get()).exists){
            await getFirestore().collection('users').doc(id).delete()
        }else{
            throw new NotFound('O usuário não foi encontrado')
        }
    }


}