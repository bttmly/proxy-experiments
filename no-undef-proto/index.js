var Reflect = require("harmony-reflect");
var inherits = require("util").inherits;

var handler = {
  get: function (target, key) {
    if (Reflect.get(target, key) === undefined) {
      throw new Error("Attempted to access undefined property " + key);
    }
  }
}

var proto = new Proxy({}, handler);

function Base () {}

Base.prototype = Object.create(proto);


function Subclass () {
  this.prop = "value";
}

inherits(Subclass, Base);

Subclass.prototype.subclassMethod = function () {};

module.exports = Subclass;