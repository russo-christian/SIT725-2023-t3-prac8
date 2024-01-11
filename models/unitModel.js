let client = require('../dbConnection');
let collection = client.db().collection('Unit');

function postUnit(unit, callback) {
    collection.insertOne(unit, callback);
}

function getAllUnits(callback) {
    collection.find({}).toArray(callback);
}

function getUnitByTitle(title, callback) {
    collection.findOne({ title: title }, callback);
}

module.exports = { postUnit, getAllUnits, getUnitByTitle };
