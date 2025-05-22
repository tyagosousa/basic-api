import { getFirestore } from "firebase-admin/firestore";
import { User } from "../models/user.model";
import { UserRepository } from "../repository/user.repository";
import { NotFound } from "../errors/notFound-error";

export class UserService{

    private userRepository: UserRepository

    constructor(){
        this.userRepository = new UserRepository()
    }

    async getAll(): Promise<User[]>{
            return this.userRepository.getAll()
        }

    async getOne(id: string): Promise<User>{
        const user = await this.userRepository.getOne(id)
        if(!user){
            throw new NotFound('user is not identified')   
        }
        return user
    }

    async create(user: User){
        await getFirestore().collection('users').add(user)
    }

    async update(id: string, user: User){

        const _user = await this.userRepository.getOne(id)
        if(!_user){
            throw new NotFound('users is not identified')
        }

        _user.name = user.name
        _user.email = user.email

        this.userRepository.update(_user)
    }

    async delete(id: string){
        const _user = await this.userRepository.getOne(id)
        if(!_user){
            throw new NotFound('users is not identified')
        }
       return this.userRepository.delete(id)
    }


}