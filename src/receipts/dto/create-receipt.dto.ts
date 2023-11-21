import { IsString, IsNumber } from "class-validator"

export class CreateReceiptDto {
    @IsString()
    receiptID: string

    @IsString()
    message: string

    @IsString()
    fromUserId1: string

    @IsString()
    toUserId2: string

    @IsString()
    money: string

    @IsNumber()
    createAt: string

    updateAt: string
}
