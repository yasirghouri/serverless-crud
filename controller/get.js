const AWS = require("aws-sdk");

const getKitten = async (event, context, callback) => {
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
};

exports.getKitten = getKitten;
