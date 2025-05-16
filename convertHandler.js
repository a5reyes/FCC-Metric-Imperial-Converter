function ConvertHandler() {
  
  this.getNum = function(input) {
    const units = ["gal", "L", "mi", "km", "lbs", "kg"];
    let num = "";
    if(units.includes(input)){
      return 1;
    }
    for(let i=0; i < input.length; i++){
      if (input.charCodeAt(i) < 65){
        num += input[i]
      }
    }
    if ((num.match(/\//g) || []).length > 1 || (num.match(/\./g) || []).length > 1) {
      return;
    }
    try{
      const final_num = eval(num);
      if (!isFinite(final_num)){
        return;
      } 
      return final_num;
    } catch(e){
      return;
    }
  };
  
  this.getUnit = function(input) {
    let input_unit = "";
    const units = ["gal", "l", "mi", "km", "lbs", "kg"];
    for(let i=0; i < input.length; i++){
      if (input.charCodeAt(i) > 65){
        input_unit += input[i]
      }
    }
    let new_unit = input_unit.toLowerCase();
    if (units.includes(new_unit)){
      return new_unit === "l" ? "L" : new_unit;
    } else {
      return;
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    let get_returnUnit;
    let toUnit = initUnit.toLowerCase();
    switch(toUnit){
      case "gal":
        get_returnUnit = "L";
        break;
      case "l":
        get_returnUnit = "gal";
        break;
      case "lbs":
        get_returnUnit = "kg";
        break;
      case "kg":
        get_returnUnit = "lbs";
        break;
      case "mi":
        get_returnUnit = "km";
        break;
      case "km":
        get_returnUnit = "mi";
        break;
    }
    return get_returnUnit
  };

  this.spellOutUnit = function(unit) {
    let return_unit;
    let init_unit = unit.toLowerCase();
    switch(init_unit){
      case "gal":
        return_unit = "gallons";
        break;
      case "l":
        return_unit = "liters";
        break;
      case "lbs":
        return_unit = "pounds";
        break;
      case "kg":
        return_unit = "kilograms";
        break;
      case "mi":
        return_unit = "miles";
        break;
      case "km":
        return_unit = "kilometers";
        break;
    }
    return return_unit
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let res_num;
    let res_unit = initUnit.toLowerCase();
    switch(res_unit){
      case "gal":
        res_num = initNum * galToL;
        break;
      case "l":
        res_num = initNum / galToL;
        break;
      case "lbs":
        res_num = initNum * lbsToKg;
        break;
      case "kg":
        res_num = initNum / lbsToKg;
        break;
      case "mi":
        res_num = initNum * miToKm;
        break;
      case "km":
        res_num = initNum / miToKm;
        break;
    }
    return parseFloat(res_num).toFixed(5)
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
