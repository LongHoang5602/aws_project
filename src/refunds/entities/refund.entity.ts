import { v4 as uuidv4 } from 'uuid';
import { CreateRefundDto } from '../dto/create-refund.dto';

export class Refund {
    refundID: string
    reqRefundID: string
    message: string
    money: string
    receiptID: string
    status: string
    fromUserId1: string
    toUserId2: string
    createAt: Date
    updateAt?: Date

    static newInstanceFromDTO(data: CreateRefundDto): Refund {
        const result = new Refund()
        result.refundID = uuidv4()
        result.reqRefundID = data.reqRefundID
        result.fromUserId1 = data.fromUserId1
        result.toUserId2 = data.toUserId2
        result.message = data.message
        result.receiptID = data.receiptID
        result.status = data.status
        result.money = data.money
        result.createAt = new Date()
        return result
    }
    static newInstanceFromDynamoObject(data: any): Refund {
        const result = new Refund()
        result.refundID = data.refundID.S
        result.reqRefundID = data.reqRefundID.S
        result.fromUserId1 = data.fromUserId1.S
        result.toUserId2 = data.toUserId2.S
        result.receiptID = data.receiptID.S
        result.message = data.message.S
        result.status = data.status.S
        result.money = data.money.S
        result.createAt = new Date(Number(data.createAt.N))
        if (data.updatedAt) {
            result.updateAt = new Date(Number(data.updateAt.N))
        }
        return result
    }
}
