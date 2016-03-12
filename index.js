/**
 * Created by codeslayer on 3/13/16.
 */

var JSONMapper = {

  /**
   * Routes request to mapObject function after sanitation checks in input/mapping
   *
   * @param {JSON} input, {JSON} mapping
   * @return {JSON}
   */
  map: function(input, mapping){
    if(Utils.isEmpty(input) || Utils.isEmpty(mapping)){
      return null
    }

    return JSONMapper.mapObject(input,mapping);
  },

  /**
   * This function iterates the specified mapping and populates the desired keys from the input
   *
   * @param {JSON} input, {JSON} mapping
   * @return {JSON}
   */
  mapObject: function(input, mapping){
    var mappedObject = {};

    for(var actualKey in mapping){
      /*
       -> if an object or array needs to be mapped, we take the desired key name and data to be mapped inside an object,
        and parse all the keys in data one by one and set the mapped output against the desired key name
       -> if a single variable needs to be mapped, we set the desired value against the desired key
       */
      if(Utils.isObject(mapping[actualKey])){
        var desiredKeyName = mapping[actualKey]['desiredKey'];
        var desiredDataMapping = mapping[actualKey]['desiredData'];

        if(Utils.isObject(desiredDataMapping)){
          mappedObject[desiredKeyName] = JSONMapper.mapObject(input[actualKey],desiredDataMapping);
        }
        else if(Utils.isArray(desiredDataMapping)){
          mappedObject[desiredKeyName] = JSONMapper.mapArray(input[actualKey],desiredDataMapping[0]);
        }
      }
      else{
        var desiredKeyName = mapping[actualKey];
        mappedObject[desiredKeyName] = input[actualKey];
      }
    }

    return mappedObject;
  },

  /**
   * This function iterates an array and maps each object of the array one by one
   *
   * @param {JSON} input, {JSON} mapping
   * @return {JSON Array}
   */
  mapArray: function(input, mapping){
    var mappedArray = [];
    for(var index in input){
      var inputObject = input[index];
      var mappedObject = JSONMapper.mapObject(inputObject,mapping);
      mappedArray.push(mappedObject);
    }

    return mappedArray;
  }

};

module.exports = JSONMapper;
