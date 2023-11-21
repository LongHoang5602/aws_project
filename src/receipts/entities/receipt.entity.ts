import { CreateReceiptDto } from "../dto/create-receipt.dto"
import { v4 as uuidv4 } from 'uuid';

export class Receipt {
    receiptID: string
    message: string
    fromUserId1: string
    toUserId2: string
    money: string
    createAt: Date
    updateAt?: Date

    static newInstanceFromDTO(data: CreateReceiptDto): Receipt {
        const result = new Receipt()
        result.receiptID = uuidv4()
        result.message = data.message
        result.fromUserId1 = data.fromUserId1
        result.toUserId2 = data.toUserId2
        result.money = data.money
        result.createAt = new Date()
        return result
    }
    static newInstanceFromDynamoObject(data: any): Receipt {
        const result = new Receipt()
        result.receiptID = data.receiptID.S
        result.message = data.message.S
        result.fromUserId1 = data.fromUserId1.S
        result.toUserId2 = data.toUserId2.S
        result.money = data.money.S
        result.createAt = new Date(Number(data.createAt.N))
        if (data.updatedAt) {
            result.updateAt = new Date(Number(data.updateAt.N))
        }
        return result
    }
}
