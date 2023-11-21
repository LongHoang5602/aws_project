import { IsNumber, IsString } from "class-validator"

export class CreateRefundDto {
    @IsString()
    refundID: string

    @IsString()
    reqRefundID: string

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

    @IsString()
    status: string

    @IsNumber()
    createAt: string

    updateAt: string
}
