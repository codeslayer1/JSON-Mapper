/**
 * Created by codeslayer on 3/13/16.
 */

module.exports = {

  /**
   * This function checks for empty/null variable/object
   *
   * @param obj
   * @return boolean
   */
  isEmpty:function (obj) {
    // Speed up calls to hasOwnProperty
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length && obj.length > 0) return false;
    if (obj.length === 0)  return true;

    if(obj.toString())
    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
      for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
      }
    if (!isNaN(obj)) {
      if (obj.toString().length > 0)  return false;
    }

    return true;
  },

  /**
   * Function to check if the variable is an array
   *
   * @param a
   * @return boolean
   */
  isArray: function(a) {
    return (!!a) && (a.constructor === Array);
  },

  /**
   * Function to check if the variable is an object
   *
   * @param a
   * @return boolean
   */
  isObject: function(a) {
    return (!!a) && (a.constructor === Object);
  }

};
