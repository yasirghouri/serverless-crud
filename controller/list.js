const AWS = require("aws-sdk");

const listKitten = async (event, context, callback) => {
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
};

exports.listKitten = listKitten;
