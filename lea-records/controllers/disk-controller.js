const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} = require("@aws-sdk/lib-dynamodb");
const { uuid } = require('uuidv4');

const DISKS_TABLE = process.env.DISKS_TABLE || 'disks-table-dev';

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

class GetDiskController {
    async get (diskId){
        const params = {
            TableName: DISKS_TABLE,
            Key: {
            diskId: diskId,
            },
        };
        try {
            const { Item } = await dynamoDb.send(new GetCommand(params));
            if (Item) {
                const { diskId, name, artist, year, genre, amount, release_date, createdAt, updatedAt } = Item;
                return({ 
                    message: "disk retreived",
                    status: 200,
                    item : { diskId, name, artist, year, genre, amount, release_date, createdAt, updatedAt },
                });
            } else {
                return({ 
                    "message": 'could not find disk with provided diskId',
                    "status": 404
                });
            }
        } catch (error) {
            console.log(error); //TODO: error class(error)
            return({ 
                "message": 'could not retreive disk',
                "status": 500
            });
        }
    }
}

class PostDiskController {
    async post (name, artist, year, genre, amount, release_date ){
        const params = {
            TableName: DISKS_TABLE,
            Item: {
              diskId: uuid(),
              name: name,
              artist: artist,
              year: year,
              genre: genre,
              amount: amount,
              release_date: release_date,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          };
        try {
            await dynamoDb.send(new PutCommand(params));
            return({ 
                message: "disk created",
                status: 201,
                item : params.Item,
            });
        } catch (error) {
            console.log(error); //TODO: error class(error)
            return({ 
                "message": 'could not create  disk',
                "status": 500
            });
          }
    }
}

module.exports = { GetDiskController, PostDiskController }