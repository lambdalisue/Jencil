/*
partial

CoffeeScript partial class utils. it is useful when you create a large class
and want split the class to several files.

Author: Alisue (lambdalisue@hashnote.net)
License: MIT License

Copyright 2011 hashnote.net, Alisue allright reserved

Example:
  # person.core.coffee
  class Person
    constructor: (@name) -> @
    say: -> "My name is #{@name}"
  # person.hobby.coffee
  Person = partial Person,
    chess: -> 'Yes I like'
  # person.food.coffee
  Person = partial Person,
    apple: -> 'No i don't like it'
*/
var partial;
partial = function(cls, prototypes) {
  var callback, name;
  for (name in prototypes) {
    callback = prototypes[name];
    cls.prototype[name] = callback;
  }
  return cls;
};
if (typeof exports !== "undefined" && exports !== null) {
  exports.partial = partial;
}