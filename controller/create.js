const AWS = require("aws-sdk");

const createKitten = async (event, context, callback) => {
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
};

exports.createKitten = createKitten;
