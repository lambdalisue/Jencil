(function() {
  /*
  Jencil
  
  Cross browser Markup and WYSIWYG editor
  
  :Author: Alisue (lambdalisue@hashnote.net)
  :License: MIT License
  :Url: http://github.com/lambdalisue/Jencil
  */
  var $;
  var __slice = Array.prototype.slice, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.namespace = function(target, name, block) {
    var item, top, _i, _len, _ref, _ref2;
    if (arguments.length < 3) {
      _ref = [(typeof exports !== 'undefined' ? exports : window)].concat(__slice.call(arguments)), target = _ref[0], name = _ref[1], block = _ref[2];
    }
    top = target;
    _ref2 = name.split('.');
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      item = _ref2[_i];
      target = target[item] || (target[item] = {});
    }
    return block(target, top);
  };
  namespace('Jencil.utils', function(exports) {
    var load;
    return exports.load = load = function(sets, callback) {
      var cursor, _import, _load, _next;
      if (callback == null) {
        callback = void 0;
      }
      _import = function(url) {
        var script;
        script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        return document.head.appendChild(script);
      };
      _load = function(url, check, callback) {
        var _check;
        console.log("Loading " + url + " ...");
        _check = new Function("return !!(" + check + ")");
        if (!_check()) {
          _import(url);
          return setTimeout(function() {
            if (!_check()) {
              return setTimeout(arguments.callee, 100);
            } else if (callback != null) {
              return callback();
            }
          }, 100);
        } else if (callback != null) {
          return callback();
        }
      };
      cursor = -1;
      _next = function() {
        var check, url;
        cursor += 1;
        if (cursor === sets.length) {
          if (callback != null) {
            return callback();
          }
        } else {
          url = sets[cursor][0];
          check = sets[cursor][1];
          return _load(url, check, _next);
        }
      };
      _next();
      return null;
    };
  });
  $ = jQuery;
  $.fn.jencil = function(options) {
    var requires;
    options = $.extend(true, {
      root: void 0,
      profileSetPath: '~/profiles',
      previewTemplatePath: '~/templates/preview.html',
      previewParserSets: {
        http: void 0,
        markdown: void 0
      },
      previewPosition: 'right',
      defaultProfileName: 'html',
      defaultInsertText: '*',
      documentTypeElement: void 0
    }, options);
    requires = [['js/textarea.min.js', 'window.Textarea'], ['js/jencil/jencil.core.js', 'window.Jencil.core'], ['js/jencil/jencil.widgets.js', 'window.Jencil.widgets'], ['js/jencil/jencil.buttons.js', 'window.Jencil.widgets.Button'], ['js/jencil/jencil.wysiwym.js', 'window.Jencil.widgets.Wysiwym'], ['js/jencil/jencil.wysiwyg.js', 'window.Jencil.widgets.Wysiwyg']];
    return Jencil.utils.load(requires, __bind(function() {
      options = Jencil.core.parse(options);
      return this.each(function() {
        return new Jencil.core.Jencil($(this), options);
      });
    }, this));
  };
}).call(this);
