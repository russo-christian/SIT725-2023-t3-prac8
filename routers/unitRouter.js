let express = require('express');
let router = express.Router();
let controller = require('../controllers/unitController');

router.post('/', function(req,res){
    controller.postUnit(req,res);
});

router.get('/', (req,res)=>{
    controller.getAllUnits(req,res);
});

router.get('/title/:title', (req, res) => {
    controller.getUnitByTitle(req, res);
});

module.exports = router;