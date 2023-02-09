const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} = require("@aws-sdk/lib-dynamodb");
const { uuid } = require('uuidv4');
const { v4: uuidv4 } = require('uuid')

const USERS_TABLE = process.env.USERS_TABLE || 'users-table-dev';

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

class GetUserController {
    async get (userId){
        const params = {
            TableName: USERS_TABLE,
            Key: {
            userId: userId,
            },
        };

        try {
            const { Item } = await dynamoDb.send(new GetCommand(params));
            if (Item) {
                const { userId, name, doc, birthDate, email, phone, active, createdAt, updatedAt } = Item;
                return({ 
                    message: "user retreived",
                    status: 200,
                    item : { userId, name, doc, birthDate, email, phone, active, createdAt, updatedAt },
                });
            } else {
                return({ 
                    "message": 'could not find user with provided userId',
                    "status": 404
                });
            }
        } catch (error) {
            console.log(error); //TODO: error class(error)
            return({ 
                "message": 'could not retreive user',
                "status": 500
            });
        }
    }
}

class PostUserController {
    async post (name, doc, birthDate, email, phone){
        const params = {
            TableName: USERS_TABLE,
            Item: {
              userId: uuid(),
              name: name,
              doc: doc,
              birthDate: birthDate,
              email: email,
              phone: phone,
              active: true,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          };
        try {
            await dynamoDb.send(new PutCommand(params));
            return({ 
                message: "user created",
                status: 201,
                item : params.Item,
            });
        } catch (error) {
            console.log(error); //TODO: error class(error)
            return({ 
                "message": 'could not create user',
                "status": 500
            });
          }
    }
}

class PutUserController {
    async put (userId, name, doc, birthDate, email, phone, active) {
        const getUserController = new GetUserController();
        const oldItem = await getUserController.get(userId);
        const params = {
            TableName: USERS_TABLE,
            Item: {
              userId: userId,
              name: name || oldItem.item.name,
              doc: doc || oldItem.item.doc,
              birthDate: birthDate || oldItem.item.birthDate,
              email: email || oldItem.item.email,
              phone: phone || oldItem.item.phone,
              active: active || oldItem.item.active,
              createdAt: oldItem.item.createdAt || new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          };
        try {
            await dynamoDb.send(new PutCommand(params));
            
            return({ 
                message: "user updated",
                status: 200,
                item : params.Item,
            });
        } catch (error) {
            console.log(error); //TODO: error class(error)
            return({ 
                "message": 'could not update user',
                "status": 500
            });
          }
    }
}

module.exports = { GetUserController, PostUserController, PutUserController }