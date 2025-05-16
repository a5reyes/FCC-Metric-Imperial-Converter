'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.get("/api/convert", (req, res) => {
    let input = req.query.input;
    let num = convertHandler.getNum(input);
    let unit = convertHandler.getUnit(input);
    if(!num && !unit){
      res.send("invalid number and unit");
    } else if (!num){
      res.send("invalid number");
    } else if (!unit){
      res.send("invalid unit");
    }
    let unit_res = convertHandler.getReturnUnit(unit);
    let num_res = convertHandler.convert(num, unit);
    let res_str = convertHandler.getString(num, unit, num_res, unit_res);
    res.json({ initNum: num, initUnit: unit, returnNum: parseFloat(num_res), returnUnit: unit_res, string: res_str });
     
  });
  
};
