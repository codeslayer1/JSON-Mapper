/**
 * Created by codeslayer on 3/13/16.
 */

var Utils = require("./Utils");
var JSONTransform = {

  /**
   * Routes request to transformObject function after sanitation checks in input/template
   *
   * @param {JSON} input, {JSON} template
   * @return {JSON}
   */
  transform: function(input, template){
    if(Utils.isEmpty(input) || Utils.isEmpty(template)){
      return null
    }

    return JSONTransform.transformObject(input,template);
  },

  /**
   * This function iterates the specified template and populates the desired keys from the input
   *
   * @param {JSON} input, {JSON} template
   * @return {JSON}
   */
  transformObject: function(input, template){
    var transformedObject = {};

    if(Utils.isEmpty(input) || Utils.isEmpty(template))
      return null;

    for(var actualKey in template){
      /*
       -> if an object or array needs to be transformed, we take the desired key name and data to be transformed inside an object,
        and parse all the keys in data one by one and set the transformed output against the desired key name
       -> if a single variable needs to be transformed, we set the desired value against the desired key
       */
      if(Utils.isObject(template[actualKey])){
        var desiredKeyName = template[actualKey]['desiredKey'];
        var desiredDatatemplate = template[actualKey]['desiredData'];

        if(Utils.isObject(desiredDatatemplate)){
          transformedObject[desiredKeyName] = JSONTransform.transformObject(input[actualKey],desiredDatatemplate);
        }
        else if(Utils.isArray(desiredDatatemplate)){
          transformedObject[desiredKeyName] = JSONTransform.transformArray(input[actualKey],desiredDatatemplate[0]);
        }
      }
      else if(actualKey == 'includeTheseKeys' && Utils.isArray(template[actualKey])){
        for(var index = 0; index < template[actualKey].length; index++){
          var key = template[actualKey][index];
          transformedObject[key] = input[key];
        }
      }
      else{
        var desiredKeyName = template[actualKey];
        //check if deep nesting is required(actual key name contains .) and set desiredKey value to deep nested value fetched recursively
        var actualKeysArray = actualKey.split('.');

        if(actualKeysArray.length > 1){
          var lastDeepNestedKeyValue = input[actualKeysArray[0]];

          for(var i=1 ; i<actualKeysArray.length; i++){
            //check if required deep nested key is an array and fetch and set array value against desiredKey
            var indexOfArrayStart = actualKeysArray[i].indexOf('[');
            var indexOfArrayEnd = actualKeysArray[i].indexOf(']');
            var keyName = actualKeysArray[i];

            if(indexOfArrayStart > -1) {
              keyName = actualKeysArray[i].substring(0, indexOfArrayStart);
              var keyIndex = actualKeysArray[i].substring(indexOfArrayStart+1, indexOfArrayEnd);

              if(lastDeepNestedKeyValue == null || !lastDeepNestedKeyValue.hasOwnProperty(keyName)) {
                lastDeepNestedKeyValue = null;
              }
              else{
                lastDeepNestedKeyValue = lastDeepNestedKeyValue[keyName][keyIndex];
              }
            }
            else{
              if(lastDeepNestedKeyValue == null || !lastDeepNestedKeyValue.hasOwnProperty(keyName)) {
                lastDeepNestedKeyValue = null;
              }
              else {
                lastDeepNestedKeyValue = lastDeepNestedKeyValue[actualKeysArray[i]];
              }
            }
          }

          transformedObject[desiredKeyName] = lastDeepNestedKeyValue;
        }
        else {
          transformedObject[desiredKeyName] = input[actualKey];
        }
      }
    }

    return transformedObject;
  },

  /**
   * This function iterates an array and transforms each object of the array one by one
   *
   * @param {JSON} input, {JSON} template
   * @return {JSON Array}
   */
  transformArray: function(input, template){
    var transformedArray = [];
    for(var index = 0; index < input.length; index++){
      var inputObject = input[index];
      var transformedObject = JSONTransform.transformObject(inputObject,template);
      transformedArray.push(transformedObject);
    }

    return transformedArray;
  }

};

module.exports = JSONTransform;
