import { DynamoDBClient, ScanCommand, GetItemCommand, AttributeValue, PutItemCommand, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { Injectable } from "@nestjs/common";
import { Receipt } from "./entities/receipt.entity";

@Injectable()
export class ReceiptRepository {
    private readonly tableName = "receipts"
    private readonly client: DynamoDBClient
    constructor() {
        this.client = new DynamoDBClient({
            region: "ap-southeast-1",
        })
    }

    async findAll() {
        const result: Receipt[] = []
        const command = new ScanCommand({
            TableName: this.tableName
        })
        const response = await this.client.send(command)

        if (response.Items) {
            response.Items.forEach((item) => {
                result.push(Receipt.newInstanceFromDynamoObject(item))
            })
        }
        return result
    }

    async findReceiptByID(receiptID: string) {
        const command = new GetItemCommand({
            TableName: this.tableName,
            Key: {
                receiptID: {
                    S: receiptID
                }
            }
        })
        const response = await this.client.send(command)
        if (response.Item) {
            return Receipt.newInstanceFromDynamoObject(response.Item)
        }
        return undefined
    }

    async upsertOne(data: Receipt) {
        const itemObj: Record<string, AttributeValue> = {
            receiptID: {
                S: data.receiptID
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
            createAt: {
                N: String(data.createAt.getTime())
            },
            money: {
                S: data.money
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

    async deleteReceiptByID(receiptID: string) {
        const command = new DeleteItemCommand({
            TableName: this.tableName,
            Key: {
                receiptID: {
                    S: receiptID
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