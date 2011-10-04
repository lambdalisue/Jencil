/*
dynamicloader

CoffeeScript dynamic javascript load utils.

Author: Alisue (lambdalisue@hashnote.net)
License: MIT License

Copyright 2011 hashnote.net, Alisue allright reserved

*/namespace(this, 'dynamicloader.script', function(exports) {
  var include, load;
  exports.include = include = function(url) {
    var script;
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.head = document.head || document.getElementsByTagName('head')[0];
    return document.head.appendChild(script);
  };
  exports.load = load = function(url, check, callback, timeout) {
    var _check;
    if (timeout == null) {
      timeout = 5000;
    }
    _check = new Function("return !!(" + check + ")");
    if (!_check()) {
      include(url);
      setTimeout(function() {
        return timeout = true;
      }, timeout);
      return setTimeout(function() {
        if (timeout !== true && !_check()) {
          return setTimeout(arguments.callee, 100);
        } else {
          return typeof callback === "function" ? callback() : void 0;
        }
      }, 100);
    } else {
      return typeof callback === "function" ? callback() : void 0;
    }
  };
  return exports.loadall = function(sets, callback, timeout) {
    var cursor, process;
    if (timeout == null) {
      timeout = 5000;
    }
    cursor = 0;
    process = function() {
      var check, url;
      url = sets[cursor][0];
      check = sets[cursor][1];
      cursor++;
      if (cursor > sets.length) {
        return typeof callback === "function" ? callback() : void 0;
      } else {
        return load(url, check, next);
      }
    };
    return next();
  };
});
namespace('dynamicloader.css', function(exports) {
  exports.include = function(url, media) {
    var link;
    if (media == null) {
      media = 'all';
    }
    link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.media = media;
    link.href = url;
    document.head = document.head || document.getElementsByTagName('head')[0];
    return document.head.appendChild(link);
  };
  return exports.remove = function(pattern) {
    return $('link').each(function(a, tag) {
      var match;
      match = tag.href.match(pattern);
      if (match != null) {
        return $(tag).remove();
      }
    });
  };
});