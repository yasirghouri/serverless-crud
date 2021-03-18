"use strict";
const AWS = require("aws-sdk");
const {
  getKitten,
  updateKitten,
  listKitten,
  deleteKitten,
  createKitten,
} = require("./controller");

module.exports.createKitten = async (event, context, callback) => {
  return createKitten(event, context, callback);
};
module.exports.getKitten = async (event, context, callback) => {
  return getKitten(event, context, callback);
};
module.exports.updateKitten = async (event, context, callback) => {
  return updateKitten(event, context, callback);
};
module.exports.deleteKitten = async (event, context, callback) => {
  return deleteKitten(event, context, callback);
};
module.exports.listKitten = async (event, context, callback) => {
  return listKitten(event, context, callback);
};
