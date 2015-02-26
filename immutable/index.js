require("harmony-reflect");

var I = require("immutable");

function maybeDeep (obj, key, methodName) {
  var keys = key.split(".");
  if (keys.length > 1) methodName += "In"
  return obj[methodName].apply(obj, keys);
}

var handler = {
  get: function (obj, key) {
    if (obj[key]) return obj[key];
    return maybeDeep(obj, key, "get");
  },
  set: function (obj, key, value) {
    return maybeDeep(obj, key, "set");
  },
  has: function (obj, key) {
    return maybeDeep(obj, key, "has");
  },
  deleteProperty: function (obj, key) {
    return maybeDeep(obj, key, "delete");
  }
}

function Immut (obj) {
  if (typeof obj !== "object") throw new TypeError();
  if (!I.Iterable.isIterable(obj)) obj = I.fromJS(obj);
  console.log(Object.keys(obj));
  return new Proxy(handler, obj);
}

module.exports = Immut;