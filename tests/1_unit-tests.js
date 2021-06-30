const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  suite('Accurate conversion metric to imperial', function () {
    test('#equal, #notEqual', function () {
      assert.equal(convertHandler.convert(1, 'L'), 0.26417, 'convertHandler should correctly convert 1 L to 0.26417 gal');
      assert.equal(convertHandler.convert(1, 'km'), 0.62137, 'convertHandler should correctly convert 1 km to 0.62137 mi');
      assert.equal(convertHandler.convert(1, 'kg'), 2.20462, 'convertHandler should correctly convert 1 kg to 2.20462 lbs');
    });  
  });
  suite('Accurate conversion imperial to metric', function () {
    test('#equal, #notEqual', function () {
      assert.equal(convertHandler.convert(1, 'gal'), 3.78541, 'convertHandler should correctly convert 1 gal to 3.78541 L');
      assert.equal(convertHandler.convert(1, 'mi'), 1.60934, 'convertHandler should correctly convert 1 mi to 1.60934 km');
      assert.equal(convertHandler.convert(1, 'lbs'), 0.45359, 'convertHandler should correctly convert 1 lbs to 0.45359 kg');
    });  
  });
  suite('Whole numbers input', function () {
    test('#exists, #notExists', function () {
      assert.exists(convertHandler.getNum('20mi'), 'convertHandler should correctly read a whole number input.');
      assert.exists(convertHandler.getNum('30kg'), 'convertHandler should correctly read a whole number input.');
      assert.notExists(convertHandler.getNum('-1m'), 'convertHandler should return error on a negative number input.');
    });
  });
  suite('Fractions input', function () {
    test('#exists, #notExists', function () {
      assert.exists(convertHandler.getNum('1/2lbs'), 'convertHandler should correctly read a fractional input.');
      assert.exists(convertHandler.getNum('1/2kg'), 'convertHandler should correctly read a fractional input.');
      assert.notExists(convertHandler.getNum('3/2/3lbs'), 'convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).');
    });
  });
  suite('Decimals input', function () {
    test('#exists, #notExists', function () {
      assert.exists(convertHandler.getNum('2.5kg'), 'convertHandler should correctly read a decimal number input.');
      assert.exists(convertHandler.getNum('0.5mi'), 'convertHandler should correctly read a decimal number input.');
      assert.notExists(convertHandler.getNum('2.5.5L'), 'convertHandler should return an error on an invalid decimal number input.');
    });
  });
  suite('Decimals and fractions input', function () {
    test('#exists, #notExists', function () {
      assert.exists(convertHandler.getNum('2.5/5kg'), 'convertHandler should correctly read a fractional input with a decimal.');
      assert.exists(convertHandler.getNum('2/5.5km'), 'convertHandler should correctly read a fractional input with a decimal.');
      assert.notExists(convertHandler.getNum('2.5/5.3/4l'), 'convertHandler should should return an error on an invalid a fractional input with a decimal.');
    });
  });
  suite('Correct unit conversion metric to imperial', function () {
    test('#equal, #notEqual', function () {
      assert.equal(convertHandler.getReturnUnit('L'), 'gal', 'convertHandler should return gal unit for L input unit');
      assert.equal(convertHandler.getReturnUnit('km'), 'mi', 'convertHandler should return mi unit for km input unit');
      assert.equal(convertHandler.getReturnUnit('kg'), 'lbs', 'convertHandler should return lbs unit for kg input unit');
    });  
  });
  suite('Correct unit conversion imperial to metric', function () {
    test('#equal, #notEqual', function () {
      assert.equal(convertHandler.getReturnUnit('gal'), 'L', 'convertHandler should return L unit for gal input unit');
      assert.equal(convertHandler.getReturnUnit('mi'), 'km', 'convertHandler should return km unit for mi input unit');
      assert.equal(convertHandler.getReturnUnit('lbs'), 'kg', 'convertHandler should return kg unit for lbs input unit');
    });  
  });
  suite('Correct unit spell-out metric to imperial', function () {
    test('#equal, #notEqual', function () {
      assert.equal(convertHandler.spellOutUnit('L'), 'liters', 'convertHandler should spell out L as liters');
      assert.equal(convertHandler.spellOutUnit('km'), 'kilometers', 'convertHandler should spell out km as kilometers');
      assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms', 'convertHandler should spell out kg as kilograms');
    });  
  });
  suite('Correct unit spell-out imperial to metric', function () {
    test('#equal, #notEqual', function () {
      assert.equal(convertHandler.spellOutUnit('gal'), 'gallons', 'convertHandler should spell out gal as gallons');
      assert.equal(convertHandler.spellOutUnit('mi'), 'miles', 'convertHandler should spell out mi as miles');
      assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds', 'convertHandler should spell out lbs as pounds');
    });  
  });
  suite('Valid and invalid implicit single number inputs', function () {
    test('#equal, #notEqual', function () {
      assert.equal(convertHandler.getNum('gal'), 1, 'convertHandler should correctly read gal as 1');
      assert.equal(convertHandler.getNum('L'), 1, 'convertHandler should correctly read L as 1l');
      assert.equal(convertHandler.getNum('mi'), 1, 'convertHandler should correctly read mi 1');
      assert.notEqual(convertHandler.getNum('m'), 1, 'convertHandler should return error on m unit');
    });  
  });
  suite('Valid and invalid unit inputs', function () {
    test('#exists, #notExists', function () {
      assert.exists(convertHandler.getUnit('km'), 'km is a valid unit');
      assert.notExists(convertHandler.getUnit('lb'), 'lb is not a valid unit');
      assert.notExists(convertHandler.getUnit('kgs'), 'kgs is not a valid unit');
    });  
  });
  suite('Valid and invalid unit RegExp matches', function () {
    test('#match, #notMatch', function () {
      assert.match(convertHandler.getUnit('km'), /^(gal|l|mi|km|lbs|kg)$/i, 'km is a valid unit');
      assert.notMatch(convertHandler.getUnit('lb'), /^(gal|l|mi|km|lbs|kg)$/i, 'lb is not a valid unit');
      assert.notMatch(convertHandler.getUnit('kgs'), /^(gal|l|mi|km|lbs|kg)$/i, 'kgs is not a valid unit');
    });  
  });
  suite('Valid and invalid decimals input RegExp matches', function () {
    test('#match, #notMatch', function () {
      assert.match(convertHandler.getNum('2.5mi'), /^[0-9]+([.][0-9]+)?$/, 'Should match RegExp')
      assert.match(convertHandler.getNum('0.5kg'), /^[0-9]+([.][0-9]+)?$/, 'Should match RegExp')
      assert.notMatch(convertHandler.getNum('0.5.5lbs'), /^[0-9]+([.][0-9]+)?$/, 'Should not match RegExp')
      assert.notMatch(convertHandler.getNum('1.5.5L'), /^[0-9]+([.][0-9]+)?$/, 'Should not match RegExp')
    })
  })
  suite('Valid and invalid fractions input RegExp matches', function () {
    test('#match, #notMatch', function () {
      assert.match(convertHandler.getNum('1/2kg'), /^[0-9]+([.][0-9]+)?$/, 'Should match RegExp')
      assert.match(convertHandler.getNum('3/4mi'), /^[0-9]+([.][0-9]+)?$/, 'Should match RegExp')
      assert.notMatch(convertHandler.getNum('/3gal'), /^[0-9]+([.][0-9]+)?$/, 'Should not match RegExp')
      assert.notMatch(convertHandler.getNum('/4/2L'), /^[0-9]+([.][0-9]+)?$/, 'Should not match RegExp')
    })
  })
  suite('Valid and invalid fractions and decimals input RegExp matches', function () {
    test('#match, #notMatch', function () {
      assert.match(convertHandler.getNum('2.5/5gal'), /^[0-9]+([.][0-9]+)?$/, 'Should match RegExp')
      assert.match(convertHandler.getNum('3.3/1.1km'), /^[0-9]+([.][0-9]+)?$/, 'Should match RegExp')
      assert.notMatch(convertHandler.getNum('-3/4mi'), /^[0-9]+([.][0-9]+)?$/, 'Should not match RegExp')
      assert.notMatch(convertHandler.getNum('1+1/4L'), /^[0-9]+([.][0-9]+)?$/, 'Should not match RegExp')
    })
  })
});