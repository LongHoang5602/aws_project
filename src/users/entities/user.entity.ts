import { CreateUserDto } from "../dto/create-user.dto"
import { v4 as uuidv4 } from 'uuid';

export class User {
    userID: string
    name: string
    username: string
    password: string
    email: string
    role: string
    createAt: Date
    updateAt?: Date

    static newInstanceFromDTO(data: CreateUserDto): User {
        const result = new User()
        result.userID = uuidv4()
        result.name = data.name
        result.username = data.username
        result.password = data.password
        result.email = data.email
        result.role = data.role
        result.createAt = new Date()
        return result
    }
    static newInstanceFromDynamoObject(data: any): User {
        const result = new User()
        result.userID = data.userID.S
        result.name = data.name.S
        result.username = data.username.S
        result.password = data.password.S
        result.email = data.email.S
        result.role = data.role.S
        result.createAt = new Date(Number(data.createAt.N))
        if (data.updatedAt) {
            result.updateAt = new Date(Number(data.updateAt.N))
        }
        return result
    }
}
