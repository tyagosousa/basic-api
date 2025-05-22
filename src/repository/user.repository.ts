import { CollectionReference, getFirestore } from "firebase-admin/firestore"
import { User } from "../models/user.model"
//import { NotFound } from "../errors/notFound-error"

export class UserRepository{

    private collection: CollectionReference

    constructor(){
        this.collection = getFirestore().collection('users')
    }

    async getAll(): Promise<User[]>{
        const snapshot = await this.collection.get()
        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
                            } 
            }) as User[]
    }

    async delete(id: string){
        await this.collection.doc(id).delete()
    }

    async getOne(id: string): Promise<User | null>{
         const doc = await this.collection.doc(id).get()
         return {
                id: doc.id,
                ... doc.data()
            } as User
    }

    async update(user: User) {
        let docRef = this.collection.doc(user.id)
        await docRef.set({
            name: user.name,
            email: user.email
        })
    }

}

