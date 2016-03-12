/**
 * Created by codeslayer on 3/13/16.
 */

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
          transformedObject[desiredKeyName] = JSONTransform.mapObject(input[actualKey],desiredDatatemplate);
        }
        else if(Utils.isArray(desiredDatatemplate)){
          transformedObject[desiredKeyName] = JSONTransform.mapArray(input[actualKey],desiredDatatemplate[0]);
        }
      }
      else{
        var desiredKeyName = template[actualKey];
        transformedObject[desiredKeyName] = input[actualKey];
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
    for(var index in input){
      var inputObject = input[index];
      var transformedObject = JSONTransform.mapObject(inputObject,template);
      transformedArray.push(transformedObject);
    }

    return transformedArray;
  }

};

module.exports = JSONTransform;
