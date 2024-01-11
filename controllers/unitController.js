let collection = require('../models/unitModel');
const { ObjectId } = require('mongodb');

const postUnit = (req,res) => {
    let unit = req.body;
    collection.postUnit(unit, (err,result) => {
        if (!err) {
            res.status(201).json({statusCode:201,data:result,message:'success'});
        }
    });
}

const getAllUnits = (req,res) => {
    collection.getAllUnits((error,result)=>{
        if (!error) {
            res.json({statusCode:200,data:result,message:'success'});
        }
    });
}

const getUnitByTitle = (req, res) => {
    const title = req.params.title;

    collection.getUnitByTitle(title, (error, result) => {
        if (error) {
            res.status(500).json({ message: "Error fetching data" });
        } else if (result) {
            res.status(200).json({ statusCode: 200, data: result, message: 'success' });
        } else {
            res.status(404).json({ message: "Unit not found" });
        }
    });
};

module.exports = {postUnit,getAllUnits, getUnitByTitle}