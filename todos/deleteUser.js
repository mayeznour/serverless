'use strict';
const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.deleteItemFromDynamoDB = async (event) => {
    try {
        const { userID } = event.queryStringParameters || {};
        if (!userID) {
            return {
                statusCode: 400,
                body: 'Missing userID'
            };
        }

        const params = {
            TableName: 'ticket-dev-myTable',
            Key: { userID }
        };

        await dynamoDB.delete(params).promise();
        return {
            statusCode: 200,
            body: 'Item deleted from DynamoDB: ' + userID
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: 'Error deleting item from DynamoDB: ' + err.message
        };
    }
};
