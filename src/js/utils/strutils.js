var apply, strutils;

strutils = {
  repeat: function(str, count) {
    var pattern, result;
    if (count < 1) {
      return '';
    }
    result = '';
    pattern = str.valueOf();
    while (count > 0) {
      if (count & 1) {
        result += pattern;
      }
      count >>= 1;
      pattern += pattern;
    }
    return result;
  },
  startsWith: function(str, prefix) {
    return str.lastIndexOf(prefix, 0) === 0;
  },
  endsWith: function(str, suffix) {
    var l;
    l = str.length - suffix.length;
    return l >= 0 && str.lastIndexOf(suffix, l) === l;
  },
  trimLeft: function(str) {
    return str.replace(/^\s+/g, '');
  },
  trimRight: function(str) {
    return str.replace(/\s+$/g, '');
  },
  trim: function(str) {
    return str.replace(/^\s+|\s+$/g, '');
  }
};

apply = function(object, name, fn) {
  if (!(object.prototype[name] != null)) {
    return object.prototype[name] = function() {
      var args;
      args = [this].concat(Array.prototype.slice.call(arguments));
      return fn.apply(this, args);
    };
  }
};

apply(String, 'repeat', strutils.repeat);

apply(String, 'startsWith', strutils.startsWith);

apply(String, 'endsWith', strutils.endsWith);

apply(String, 'trimLeft', strutils.trimLeft);

apply(String, 'trimRight', strutils.trimRight);

apply(String, 'trim', strutils.trim);

if (typeof exports !== "undefined" && exports !== null) {
  exports.strutils = strutils;
}
