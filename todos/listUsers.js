'use strict';
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.listAllItemsFromDynamoDB = async (event) => { 
    try {
    const params = {
      TableName: 'ticket-dev-myTable'
    };

    const data = await dynamoDb.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(data.Items)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error listing items from DynamoDB: ' + err.message })
    };
  }
};
