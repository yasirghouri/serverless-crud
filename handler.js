"use strict";
const AWS = require("aws-sdk");

module.exports = {
  create: async (event, context) => {
    let bodyObj = {};
    try {
      bodyObj = JSON.parse(event.body);
    } catch (jsonError) {
      console.log("There was an error parsing the body.", jsonError);
      return {
        statusCode: 400,
      };
    }

    if (
      typeof bodyObj.name === "undefined" ||
      typeof bodyObj.age === "undefined"
    ) {
      console.log("Missing Parameters");
      return {
        statusCode: 400,
      };
    }

    let putParams = {
      TableName: process.env.DYNAMODB_KITTEN_TABLE,
      Item: {
        name: bodyObj.name,
        age: bodyObj.age,
      },
    };
    let putResult = {};
    try {
      let dynamodb = new AWS.DynamoDB.DocumentClient();
      putResult = await dynamodb.put(putParams).promise();
    } catch (putError) {
      console.log("There was a problem putting the kitten");
      console.log("putParams", putParams);
      return {
        statusCode: 500,
      };
    }

    return {
      statusCode: 201,
    };
  },
  list: async (event, context) => {
    let scanParmas = {
      TableName: process.env.DYNAMODB_KITTEN_TABLE,
    };

    let scanResults = {};
    try {
      let dynamodb = new AWS.DynamoDB.DocumentClient();
      scanResults = await dynamodb.scan(scanParmas).promise();
    } catch (scanError) {
      console.log("There was a problem scanning the kitten");
      console.log("scanError", scanError);
      return {
        statusCode: 500,
      };
    }

    if (
      scanResults.Items === null ||
      !Array.isArray(scanResults.Items) ||
      scanResults.Items.length === 0
    ) {
      return {
        statusCode: 404,
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(
        scanResults.Items.map((kitten) => {
          return {
            name: kitten.name,
            age: kitten.age,
          };
        })
      ),
    };
  },
  get: async (event, context) => {
    let getParams = {
      TableName: process.env.DYNAMODB_KITTEN_TABLE,
      Key: {
        name: event.pathParameters.name,
      },
    };
    let getResults = {};
    try {
      let dynamodb = new AWS.DynamoDB.DocumentClient();
      getResults = await dynamodb.get(getParams).promise();
    } catch (getError) {
      console.log("There was a problem getting the kitten");
      console.log("getError", getError);
      return {
        statusCode: 500,
      };
    }

    if (getResults.Item === null) {
      return { statusCode: 404 };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        name: getResults.Item.name,
        age: getResults.Item.age,
      }),
    };
  },
  update: async (event, context) => {
    let bodyObj = {};
    try {
      bodyObj = JSON.parse(event.body);
    } catch (jsonError) {
      console.log("There was an error parsing the body.", jsonError);
      return {
        statusCode: 400,
      };
    }

    if (typeof bodyObj.age === "undefined") {
      console.log("Missing Parameters");
      return {
        statusCode: 400,
      };
    }
    let updateParams = {
      TableName: process.env.DYNAMODB_KITTEN_TABLE,
      Key: {
        name: event.pathParameters.name,
      },
      UpdateExpression: "set #age = :age",
      ExpressionAttributeName: {
        "#age": "age",
      },
      ExpressionAttributeValues: {
        ":age": bodyObj.age,
      },
    };
    try {
      let dynamodb = new AWS.DynamoDB.DocumentClient();
      dynamodb.update(updateParams).promise();
    } catch (updateError) {
      console.log("There was a problem updating the kitten");
      console.log("updateError", updateError);
      return {
        statusCode: 500,
      };
    }

    return {
      statusCode: 200,
    };
  },
  delete: async (event, context) => {
    let deleteParams = {
      TableName: process.env.DYNAMODB_KITTEN_TABLE,
      Key: {
        name: event.pathParameters.name,
      },
    };
    let deleteResults = {};
    try {
      let dynamodb = new AWS.DynamoDB.DocumentClient();
      deleteResults = await dynamodb.delete(deleteParams).promise();
    } catch (deleteError) {
      console.log("There was a problem deleting the kitten");
      console.log("deleteError", deleteError);
      return {
        statusCode: 500,
      };
    }

    return {
      statusCode: 200,
    };
  },
};
