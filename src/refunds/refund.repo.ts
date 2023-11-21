import { DynamoDBClient, ScanCommand, GetItemCommand, AttributeValue, PutItemCommand, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { Injectable } from "@nestjs/common";
import { Refund } from "./entities/refund.entity";

@Injectable()
export class RefundRepository {
    private readonly tableName = "refunds"
    private readonly client: DynamoDBClient
    constructor() {
        this.client = new DynamoDBClient({
            region: "ap-southeast-1"
        })
    }

    async findAll() {
        const result: Refund[] = []
        const command = new ScanCommand({
            TableName: this.tableName
        })
        const response = await this.client.send(command)

        if (response.Items) {
            response.Items.forEach((item) => {
                result.push(Refund.newInstanceFromDynamoObject(item))
            })
        }
        return result
    }

    async findRefundByID(refundID: string) {
        const command = new GetItemCommand({
            TableName: this.tableName,
            Key: {
                refundID: {
                    S: refundID
                }
            }
        })
        const response = await this.client.send(command)
        if (response.Item) {
            return Refund.newInstanceFromDynamoObject(response.Item)
        }
        return undefined
    }

    async upsertOne(data: Refund) {
        const itemObj: Record<string, AttributeValue> = {
            refundID: {
                S: data.refundID
            },
            fromUserId1: {
                S: data.fromUserId1
            },
            toUserId2: {
                S: data.toUserId2
            },
            message: {
                S: data.message
            },
            receiptID: {
                S: data.receiptID
            },
            reqRefundID: {
                S: data.reqRefundID
            },

            createAt: {
                N: String(data.createAt.getTime())
            },
            money: {
                S: data.money
            }

        }
        if (data.status === undefined) {
            itemObj.status = {
                S: "Pending"
            }
        } else {
            itemObj.status = {
                S: data.status
            }
        }
        if (data.updateAt) {
            itemObj.updateAt = {
                N: String(data.updateAt.getTime())
            }
        }
        const command = new PutItemCommand({
            TableName: this.tableName,
            Item: itemObj,
        })
        await this.client.send(command)

        return data

    }

    async deleteRefundByID(refundID: string) {
        const command = new DeleteItemCommand({
            TableName: this.tableName,
            Key: {
                refundID: {
                    S: refundID
                }
            },
            ReturnConsumedCapacity: 'TOTAL',
            ReturnValues: 'ALL_OLD'
        })
        const response = await this.client.send(command)
        if (response.Attributes) {
            return "Xoá thành công"
        }
        return "Xóa không thành công"
    }
}