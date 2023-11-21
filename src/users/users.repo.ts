import { DynamoDBClient, ScanCommand, GetItemCommand, AttributeValue, PutItemCommand, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";

@Injectable()
export class UserRepository {
    private readonly tableName = "user"
    private readonly client: DynamoDBClient
    constructor() {
        this.client = new DynamoDBClient({
            region: "ap-southeast-1"
        })
    }

    async findAll() {
        const result: User[] = []
        const command = new ScanCommand({
            TableName: this.tableName
        })
        const response = await this.client.send(command)

        if (response.Items) {
            response.Items.forEach((item) => {
                result.push(User.newInstanceFromDynamoObject(item))
            })
        }
        return result
    }

    async findUserByID(userID: string) {
        const command = new GetItemCommand({
            TableName: this.tableName,
            Key: {
                userID: {
                    S: userID
                }
            }
        })
        const response = await this.client.send(command)
        if (response.Item) {
            return User.newInstanceFromDynamoObject(response.Item)
        }
        return undefined
    }

    async upsertOne(data: User) {
        const itemObj: Record<string, AttributeValue> = {
            userID: {
                S: data.userID
            },
            name: {
                S: data.name
            },
            username: {
                S: data.username
            },
            password: {
                S: data.password
            },
            email: {
                S: data.email
            },
            role: {
                S: data.role
            },
            createAt: {
                N: String(data.createAt.getTime())
            },


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

    async deleteUserByID(userID: string) {
        const command = new DeleteItemCommand({
            TableName: this.tableName,
            Key: {
                userID: {
                    S: userID
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