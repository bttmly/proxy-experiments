var EventEmitter = require("events").EventEmitter;

function getAllMethodsOn (obj) {
  return Object.getOwnPropertyNames(obj).map(function (name) {
    return obj[name];
  });
}

function Person () {
  return composedOf(this, Arms, Legs);
}

function Arms () {}

Arms.prototype.wave = function (distance) {
  this.isWaving = true;
}

Arms.prototype.punch = function (target) {
  target.wasPunched = true;
}

function Legs () {}

Legs.prototype.walk = function (distance) {
  if (!this.position) this.position = 0;
  this.position += distance;
}

Legs.prototype.kick = function (target) {
  target.wasKicked = true;
}

function composedOf (target) {
  var pieces = [].slice.call(arguments, 1);
  var protoMethods = pieces.reduce(function (methods, Ctor) {
    return getAllMethodsOn(Ctor.prototype);
  }, []);
}