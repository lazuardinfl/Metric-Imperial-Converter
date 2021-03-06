'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input)
    const initUnit = convertHandler.getUnit(input)
    const returnNum = convertHandler.convert(initNum, initUnit)
    const returnUnit = convertHandler.getReturnUnit(initUnit)
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
    const output = {
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string
    }
    if (!initUnit && !initNum) {
      res.send('invalid number and unit')
    } else if (!initUnit) {
      res.send("invalid unit")
    } else if (!initNum) {
      res.send('invalid number')
    } else {
      res.send(output);
    }
  })
};