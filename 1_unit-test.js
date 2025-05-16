const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    // #1 - convertHandler should correctly read a whole number input.
    test('#1', function(done){
        let input1 = "1gal";
        assert.equal(convertHandler.getNum(input1), 1);
        done();
    });
    // #2 - convertHandler should correctly read a decimal number input.
    test('#2', function(done){
        let input2 = "1.2gal";
        assert.equal(convertHandler.getNum(input2), 1.2);
        done();
    });
    // #3 - convertHandler should correctly read a fractional input.
    test('#3', function(done){
        let input3 = "1/2gal";
        assert.equal(convertHandler.getNum(input3), 0.5);
        done();
    });
    // #4 - convertHandler should correctly read a fractional input with a decimal.
    test('#4', function(done){
        let input4 = "1/2.0gal";
        assert.equal(convertHandler.getNum(input4), 0.5);
        done();
    });
    // #5 - convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).
    test('#5', function(done){
        let input5 = "1/2/0mi";
        assert.equal(convertHandler.getNum(input5), undefined);
        done();
    });
    // #6 - convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.
    test('#6', function(done){
        let input6 = "mi";
        assert.equal(convertHandler.getNum(input6), 1);
        done();
    });
    // #7 - convertHandler should correctly read each valid input unit.
    test('#7', function(done){
        let input7 = "1mi";
        assert.equal(convertHandler.getNum(input7), 1);
        assert.equal(convertHandler.getUnit(input7), "mi");
        done();
    });
    // #8 - convertHandler should correctly return an error for an invalid input unit.
    test('#8', function(done){
        let input8 = "1fsda";
        assert.equal(convertHandler.getUnit(input8), undefined);
        done();
    });
    // #9 - convertHandler should return the correct return unit for each valid input unit.
    test('#9', function(done){
        let units = {"gal": "L", "L":"gal", "mi":"km", "km":"mi", "lbs":"kg", "kg":"lbs"};
        Object.keys(units).forEach(key => {
            assert.equal(convertHandler.getReturnUnit(key), units[key]);
        });
        done();
    });
    // #10 - convertHandler should correctly return the spelled-out string unit for each valid input unit.
    test('#10', function(done){
        let spelled_out_units = {"gal":"gallons", "L":"liters", "mi":"miles", "km":"kilometers", "lbs":"pounds", "kg":"kilograms"};
        Object.keys(spelled_out_units).forEach(key => {
            assert.equal(convertHandler.spellOutUnit(key), spelled_out_units[key]);
        });
        done();
    });
    // #11 - convertHandler should correctly convert gal to L
    test('#11', function(done){
        let input11 = 0.5;
        assert.equal(convertHandler.convert(input11, "gal"), 1.89271);
        done();
    });
    // #12 - convertHandler should correctly convert L to gal
    test('#12', function(done){
        let input12 = 22;
        assert.equal(convertHandler.convert(input12, "L"), 5.81179);
        done();
    });
    // #13 - convertHandler should correctly convert mi to km
    test('#13', function(done){
        let input13 = 22;
        assert.equal(convertHandler.convert(input13, "mi"), 35.40548);
        done();
    });
    // #14 - convertHandler should correctly convert km to mi
    test('#14', function(done){
        let input14 = 100;
        assert.equal(convertHandler.convert(input14, "km"), 62.13727);
        done();
    });
    // #15 - convertHandler should correctly convert lbs to kg
    test('#15', function(done){
        let input15 = 42;
        assert.equal(convertHandler.convert(input15, "lbs"), 19.05086);
        done();
    });
    // #16 - convertHandler should correctly convert kg to lbs
    test('#16', function(done){
        let input16 = 2;
        assert.equal(convertHandler.convert(input16, "kg"), 4.40925);
        done();
    });
});
