import { IsNumber, IsString } from "class-validator"

export class CreateReqrefundDto {
    @IsString()
    reqRefundID: string

    @IsString()
    receiptID: string

    @IsString()
    message: string

    @IsString()
    money: string

    @IsString()
    status: string

    @IsNumber()
    createAt: string

    updateAt: string
}
