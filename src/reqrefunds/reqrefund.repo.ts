import { DynamoDBClient, ScanCommand, GetItemCommand, AttributeValue, PutItemCommand, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { Injectable } from "@nestjs/common";
import { Reqrefund } from "./entities/reqrefund.entity";

@Injectable()
export class ReqrefundRepository {
    private readonly tableName = "reqRefunds"
    private readonly client: DynamoDBClient
    constructor() {
        this.client = new DynamoDBClient({
            region: "ap-southeast-1"
        })
    }

    async findAll() {
        const result: Reqrefund[] = []
        const command = new ScanCommand({
            TableName: this.tableName
        })
        const response = await this.client.send(command)

        if (response.Items) {
            response.Items.forEach((item) => {
                result.push(Reqrefund.newInstanceFromDynamoObject(item))
            })
        }
        return result
    }

    async findReqrefundByID(reqRefundID: string) {
        const command = new GetItemCommand({
            TableName: this.tableName,
            Key: {
                reqRefundID: {
                    S: reqRefundID
                }
            }
        })
        const response = await this.client.send(command)
        if (response.Item) {
            return Reqrefund.newInstanceFromDynamoObject(response.Item)
        }
        return undefined
    }

    async upsertOne(data: Reqrefund) {
        const itemObj: Record<string, AttributeValue> = {
            reqRefundID: {
                S: data.reqRefundID
            },
            receiptID: {
                S: data.receiptID
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

        return itemObj

    }

    async deleteReqrefundByID(reqRefundID: string) {
        const command = new DeleteItemCommand({
            TableName: this.tableName,
            Key: {
                reqRefundID: {
                    S: reqRefundID
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