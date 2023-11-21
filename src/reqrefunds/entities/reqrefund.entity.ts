import { v4 as uuidv4 } from 'uuid';
import { CreateReqrefundDto } from '../dto/create-reqrefund.dto';

export class Reqrefund {
    reqRefundID: string
    message: string
    money: string
    receiptID: string
    status: string
    createAt: Date
    updateAt?: Date

    static newInstanceFromDTO(data: CreateReqrefundDto): Reqrefund {
        const result = new Reqrefund()
        result.reqRefundID = uuidv4()
        result.message = data.message
        result.receiptID = data.receiptID
        result.status = data.status
        result.money = data.money
        result.createAt = new Date()
        return result
    }
    static newInstanceFromDynamoObject(data: any): Reqrefund {
        const result = new Reqrefund()
        result.reqRefundID = data.reqRefundID.S
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
