const AWS = require("aws-sdk");

const updateKitten = async (event, context, callback) => {
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
    UpdateExpression: "set age = :age",
    ExpressionAttributeName: {
      age: "age",
    },
    ExpressionAttributeValues: {
      ":age": bodyObj.age,
    },
  };
  try {
    let dynamodb = new AWS.DynamoDB.DocumentClient();
    await dynamodb.update(updateParams).promise();
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
};

exports.updateKitten = updateKitten;
