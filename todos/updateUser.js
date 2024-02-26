'use strict';
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.updateItemInDynamoDB = async (event) => {
    try {
        const item = JSON.parse(event.body);
        if (!item.userID || !item.firstName || !item.lastName) {
            return {
                statusCode: 400,
                body: 'Invalid item data'
            };
        }

        const params = {
            TableName: 'ticket-dev-myTable',
            Key: { userID: item.userID },
            UpdateExpression: 'set #fn = :firstName, #ln = :lastName',
            ExpressionAttributeNames: { '#fn': 'firstName', '#ln': 'lastName' },
            ExpressionAttributeValues: { ':firstName': item.firstName, ':lastName': item.lastName },
            ReturnValues: 'ALL_NEW'
        };

        const data = await dynamoDB.update(params).promise();
        return {
            statusCode: 200,
            body: 'Item updated in DynamoDB: ' + JSON.stringify(data.Attributes)
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: 'Error updating item in DynamoDB: ' + err.message
        };
    }
};
