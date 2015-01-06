var Reflect = require("harmony-reflect");

var _find = require("lodash.find");
var _where = require("lodash.where");

var BY = "by";
var WHERE = "where";

function downcaseFirst (str) {
  return str[0].toLowerCase() + str.slice(1);
}

function getPropNames (str) {
  return str.split(/and/i).map(downcaseFirst);
}

var handler = {
  get: function (_, value) {
    if (value.slice(0, BY.length) === BY) {
      return createSearcher(BY, value);
    }

    if (value.slice(0, WHERE.length) === WHERE) {
      return createSearcher(WHERE, value);
    }
  }
};

function createSearcher (findOrWhere, methodName) {
  var method, propNames;

  if (findOrWhere === BY) {
    method = _find;
    propNames = getPropNames(methodName.slice(BY.length));
  } else {
    method = _where;
    propNames = getPropNames(methodName.slice(WHERE.length));
  }

  return function (collection) {
    var args = [].slice.call(arguments, 1);
    var referenceObj = propNames.reduce(function (acc, prop, idx) {
      acc[prop] = args[idx];
      return acc;
    }, {});
    return method(collection, referenceObj);
  };

}

module.exports = {
  find: new Proxy({}, handler),
  handler: handler
};
