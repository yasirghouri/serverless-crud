const AWS = require("aws-sdk");

const deleteKitten = async (event, context, callback) => {
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
};

exports.deleteKitten = deleteKitten;
