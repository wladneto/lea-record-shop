module.exports = {
    tables: [
        {
            "TableName": "users-table-dev",
            "KeySchema": [
              {
                "KeyType": "HASH",
                "AttributeName": "userId"
              }
            ],
            "AttributeDefinitions": [
              {
                "AttributeName": "userId",
                "AttributeType": "S"
              }
            ],
            "BillingMode": "PAY_PER_REQUEST"
        },
        {
            "TableName": "disks-table-dev",
            "KeySchema": [
              {
                "KeyType": "HASH",
                "AttributeName": "diskId"
              }
            ],
            "AttributeDefinitions": [
              {
                "AttributeName": "diskId",
                "AttributeType": "S"
              }
            ],
            "BillingMode": "PAY_PER_REQUEST"
        },
        {
            "TableName": "orders-table-dev",
            "KeySchema": [
              {
                "KeyType": "HASH",
                "AttributeName": "orderId"
              }
            ],
            "AttributeDefinitions": [
              {
                "AttributeName": "orderId",
                "AttributeType": "S"
              }
            ],
            "BillingMode": "PAY_PER_REQUEST"
        }
    ]
}