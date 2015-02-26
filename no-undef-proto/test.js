var assert = require("assert");

var Subclass = require("./");

var instance = new Subclass();

// can access own properties
assert.doesNotThrow(function () {
  instance.prop;
});

// can access inherited properties from object
assert.doesNotThrow(function () {
  instance.hasOwnProperty;
});

// can access stuff from it's actual prototype
assert.doesNotThrow(function () {
  instance.subclassMethod();
});

assert.throws(function () {
  instance.noSuchProp
}, (/Attempted to access undefined property noSuchProp/))

assert.throws(function () {
  instance.noSuchMethod()
}, (/Attempted to access undefined property noSuchMethod/))

console.log("all good!");