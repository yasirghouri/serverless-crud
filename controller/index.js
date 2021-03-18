const { createKitten } = require("./create");
const { deleteKitten } = require("./delete");
const { listKitten } = require("./list");
const { updateKitten } = require("./update");
const { getKitten } = require("./get");

module.exports = {
  createKitten,
  deleteKitten,
  listKitten,
  updateKitten,
  getKitten,
};
