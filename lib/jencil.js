(function() {
  /*
  Jencil
  
  Cross browser Markup and WYSIWYG editor
  
  :Author: Alisue (lambdalisue@hashnote.net)
  :License: MIT License
  :Url: http://github.com/lambdalisue/Jencil
  */
  var $;
  var __slice = Array.prototype.slice, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
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
  $ = jQuery;
  $.fn.jencil = function(options) {
    var path, requires;
    options = $.extend(true, {
      root: void 0,
      profilesetPath: '~/profiles',
      defaultProfileName: 'html',
      defaultInsertText: '*',
      documentTypeElement: void 0
    }, options);
    if (!(options.root != null)) {
      $('script').each(function(a, tag) {
        var match;
        match = $(tag).get(0).src.match(/(.*)jencil(\.min)?\.js$/);
        if (match != null) {
          options.root = match[1];
          return options.root = options.root.slice(0, options.root.length - 1);
        }
      });
    }
    if (options.profilesetPath.lastIndexOf('~/', 0) === 0) {
      path = options.profilesetPath.slice(2, options.profilesetPath.length);
      options.profilesetPath = "" + options.root + "/" + path;
    }
    requires = [["" + options.root + "/textarea.js", 'window.Textarea'], ["" + options.root + "/jencil.widgets.js", 'window.Jencil.widgets'], ["" + options.root + "/jencil.buttons.js", 'window.Jencil.widgets.Button']];
    return this.each(function() {
      return Jencil.utils.load(requires, __bind(function() {
        var JencilEditor;
        JencilEditor = (function() {
          __extends(JencilEditor, Textarea);
          function JencilEditor(textarea, options) {
            var $textarea;
            JencilEditor.__super__.constructor.call(this, textarea);
            this.options = options;
            $textarea = $(this.textarea);
            $textarea.addClass('jencil-textarea');
            $textarea.wrap($('<div>').addClass('jencil'));
            this.buttonHolder = new Jencil.widgets.ButtonHolder(this);
            this.documentType = new Jencil.widgets.DocumentType(this);
            this.toolbar = new Jencil.widgets.Toolbar(this);
            this.toolbar.append(this.buttonHolder);
            this.toolbar.append(this.documentType);
            $textarea.before(this.toolbar.$element);
          }
          return JencilEditor;
        })();
        return new JencilEditor(this, options);
      }, this));
    });
  };
  String.prototype.startsWith = function(prefix) {
    return this.lastIndexOf(prefix, 0) === 0;
  };
  String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
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
}).call(this);
