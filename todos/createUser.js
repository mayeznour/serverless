'use strict';
const AWS = require('aws-sdk');


const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.putItemIntoDynamoDB = async (event) => {
    try {
        if (!event.body) {
            return {
                statusCode: 400,
                body: 'Missing item data'
            };
        }
        const item = JSON.parse(event.body);
        if (!item.firstName || !item.lastName) {
            return {
                statusCode: 400,
                body: 'Invalid item data'
            };
        }

        const params = {
            TableName: 'ticket-dev-myTable',
           }
        
        await dynamoDB.put(params).promise();
        return {
            statusCode: 200,
            body: 'Item added to DynamoDB: ' + JSON.stringify(item)
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: 'Error putting item into DynamoDB: ' + err.message
        };
    }
};
