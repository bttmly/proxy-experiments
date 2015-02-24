var Reflect = require("harmony-reflect");
var assign = require("object-assign");

var NOT_ARRAY_ERR_MSG = "ListEnum takes an array as its only argument";
var NOT_OBJ_ERR_MSG = "Enum takes an object as its only argument";
var IMMUTABLE_ERR_MSG = "Enums are immutable.";
var NOT_PRIMITIVE_ERR_MSG = "Property values for MapEnum must be primitve";
var NOT_STRING_ERR_MSG = "Values must be strings";
var KEY_NOT_FOUND_ERR_MSG = "Key %s does not exist in target enum";

function print (str) {
  var args = [].slice.call(arguments, 1);
  var i = -1;
  return str.replace(/\%s/g, function () {
    i++;
    return args[i];
  });
}

function isObjectLike (obj) {
  return typeof obj === "object" || typeof obj === "function";
}

function isPrimitive (value) {
  return Object(value) !== value;
}

var handler = {
  defineProperty: function () {
    throw new Error(IMMUTABLE_ERR_MSG);
  },
  set: function () {
    throw new Error(IMMUTABLE_ERR_MSG);
  },
  get: function (target, key) {
    if (!Reflect.has(target, key)) throw new TypeError(print(KEY_NOT_FOUND_ERR_MSG, key));
    return key;
  }
};

function ListEnum (arr) {
  if (!Array.isArray(arr)) throw new TypeError(NOT_ARRAY_ERR_MSG);

  var values = Object.freeze(Object.create(null));
  
  arr.forEach(function (v) {
    if (typeof v !== "string") throw new TypeError(NOT_STRING_ERR_MSG);
    values[v] = true;
  });

  return new Proxy(values, handler);
}

function MapEnum (obj) {
  if (!isObjectLike(obj)) throw new TypeError(NOT_OBJ_ERR_MSG);

  var map = Object.freeze(Object.create(null));
  
  Object.keys(obj).forEach(function (k) {
    if (isPrimitive(obj[k])) throw new TypeError(NOT_PRIMITIVE_ERR_MSG);
    map[k] = obj[k];
  });

  return new Proxy(values, handler);
}

function Enum (x) {
  if (Array.isArray(x)) return ListEnum(x);
  if (isObjectLike(x)) return MapEnum(x);
  throw new TypeError(NOT_OBJ_ERR_MSG);
}

assign(Enum, {
  List: ListEnum,
  Map: MapEnum
});

module.exports = Enum;