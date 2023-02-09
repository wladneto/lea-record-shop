const { DynamoDBClient} = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");
const { uuid } = require('uuidv4');

const ORDERS_TABLE = process.env.ORDERS_TABLE || 'orders-table-dev';

let options = {};
if (process.env.JEST_WORKER_ID) {
    options = {
        endpoint: 'http://localhost:8000',
        region: 'local-env',
        sslEnabled: false,
    };
}

const client = new DynamoDBClient();
const dynamoDb = DynamoDBDocumentClient.from(client);

class GetOrderController {
    async get (orderId){
        const params = {
            TableName: ORDERS_TABLE,
            Key: {
            orderId: orderId,
            },
        };

        try {
            const { Item } = await dynamoDb.send(new GetCommand(params));
            if (Item) {
                const { orderId, userId, order, createdAt } = Item;
                return({ 
                    message: "order retreived",
                    status: 200,
                    item : { orderId, userId, order, createdAt },
                });
            } else {
                return({ 
                    "message": 'could not find order with provided orderId',
                    "status": 404
                });
            }
        } catch (error) {
            console.log(error); //TODO: error class(error)
            return({ 
                "message": 'could not retreive order',
                "status": 500
            });
        }
    }

    async getbyClient(userId){

        try {
            const params = {
                TableName: ORDERS_TABLE,
                FilterExpression: "userId = :u",
                ExpressionAttributeValues: {
                  ":u": userId,
                },
            };

            const { Items } = await dynamoDb.send(new ScanCommand(params));
            if (Items) {
                return({ 
                    message: "orders retreived",
                    status: 200,
                    orders: Items,
                });
            } else {
                return({ 
                    "message": 'could not find orders with provided userId',
                    "status": 404
                });
            }
           
        } catch (error) {
            console.error(error);
            return({ 
                "message": 'could not retreive order',
                "status": 500
            });
        }
    }
}

class PostOrderController {
    async post (userId, order){
        const params = {
            TableName: ORDERS_TABLE,
            Item: {
              orderId: uuid(),
              userId: userId,
              order: order,
              createdAt: new Date().toISOString()
            },
          };
        try {
            await dynamoDb.send(new PutCommand(params));
            return({ 
                message: "order created",
                status: 201,
                item : params.Item,
            });
        } catch (error) {
            console.log(error); //TODO: error class(error)
            return({ 
                "message": 'could not create order',
                "status": 500
            });
          }
    }
}



module.exports = { GetOrderController, PostOrderController }



