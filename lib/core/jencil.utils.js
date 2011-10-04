/*
Jencil utils

Author: Alisue (lambdalisue@hashnote.net)
License: MIT License

Copyright 2011 hashnote.net, Alisue allright reserved

Required:
- namespace (namespace.js)
- Detector (detector.js)
- dynamicloader (dynamicloader.js)
*/
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
namespace('Jencil.utils', function(exports) {
  return exports.detector = new Detector;
});
namespace('Jencil.utils.path', function(exports) {
  var Path;
  exports.init = function(options) {
    var _ref, _ref2;
    return exports.path = new Path((_ref = (_ref2 = options.root) != null ? _ref2 : options.rootPattern) != null ? _ref : /(.*)jencil(\.min)?\.js/);
  };
  exports.abspath = function(path, root, prefix) {
    if (prefix == null) {
      prefix = '~/';
    }
    return exports.path.abspath(path, root, prefix);
  };
  return exports.Path = Path = (function() {
    function Path(pattern) {
      if (pattern instanceof RegExp) {
        $('script').each(__bind(function(a, tag) {
          var match;
          match = tag.src.match(pattern);
          if (match != null) {
            this.root = match[1];
            return this.root = this.root.slice(0, (this.root.length - 2 + 1) || 9e9);
          }
        }, this));
      } else {
        this.root = pattern;
      }
    }
    Path.prototype.abspath = function(path, root, prefix) {
      if (prefix == null) {
        prefix = '~/';
      }
      if (root == null) {
        root = this.root;
      }
      if (path != null ? path.startsWith(prefix) : void 0) {
        path = "" + root + "/" + path.slice(2, (path.length + 1) || 9e9);
      }
      return path;
    };
    return Path;
  })();
});
namespace('Jencil.utils.script', function(exports) {
  exports.load = function(url, check, callback) {
    return dynamicloader.script.load(Jencil.utils.path.abspath(url), check, callback);
  };
  return exports.loadall = function(sets, callback) {
    var cursor, process;
    cursor = 0;
    process = function() {
      var check, url;
      url = sets[cursor][0];
      check = sets[cursor][1];
      cursor++;
      if (cursor > sets.length) {
        return typeof callback === "function" ? callback() : void 0;
      } else {
        return Jencil.utils.module.load(url, check, next);
      }
    };
    return process();
  };
});
namespace('Jencil.utils.css', function(exports) {
  exports.include = function(url, media) {
    if (media == null) {
      media = 'all';
    }
    return dynamicloader.css.include(url);
  };
  return exports.remove = function(pattern) {
    return dynamicloader.css.remove(pattern);
  };
});
namespace('Jencil.utils.string', function(exports) {
  var format;
  return exports.format = format = function(formatstr, kwargs) {
    var key, value;
    for (key in kwargs) {
      value = kwargs[key];
      formatstr = formatstr.replace("{{" + key + "}}", value);
    }
    return formatstr;
  };
});