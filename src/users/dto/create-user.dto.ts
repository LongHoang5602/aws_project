import { IsEmail, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    userID: string

    @IsString()
    name: string

    @IsString()
    username: string

    @IsString()
    password: string

    @IsString()
    @IsEmail()
    email: string

    @IsString()
    role: string

    @IsNumber()
    createAt: string


    updateAt: string

}
