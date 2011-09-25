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
  namespace('net.hashnote.module', function(exports) {
    var include, load, loadall;
    exports.include = include = function(url) {
      /*
          Include outer javascript dynamically
      
          Args:
              url - an outer javascript url
          */
      var script;
      script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      return document.head.appendChild(script);
    };
    exports.load = load = function(url, check, callback, timeout) {
      var _check, _ref;
      if (timeout == null) {
        timeout = 5000;
      }
      /*
          Load outer javascript and execute callback after loaded
      
          Args:
              url - an outer javascript url
              check - checking expression written in string.
              callback - a callback function
      
          Example:
              # --- foobar.js
              Foobar = (function(message){
                  this.message = message;
              });
              Foobar.prototype.say = function(){
                  alert(this.message);
              };
              # --- main.js
              net.hashnote.module.load('foobar.js', 'window.Foobar', function(){
                  var foobar = new Foobar("Hello");
                  foobar.say();
              });
          */
      if (((_ref = window.console) != null ? _ref.info : void 0) != null) {
        console.info("Loading '" + url + "'...");
      }
      _check = new Function("return !!(" + check + ")");
      if (!_check()) {
        include(url);
        setTimeout(function() {
          return timeout = void 0;
        }, timeout);
        return setTimeout(function() {
          var _ref2, _ref3;
          if (!(timeout != null)) {
            if (((_ref2 = window.console) != null ? _ref2.error : void 0) != null) {
              return console.error("Loading '" + url + "' has timed out!");
            }
          } else if (!_check()) {
            return setTimeout(arguments.callee, 100);
          } else {
            if (((_ref3 = window.console) != null ? _ref3.info : void 0) != null) {
              console.info("ok");
            }
            return typeof callback === "function" ? callback() : void 0;
          }
        }, 10);
      } else {
        return typeof callback === "function" ? callback() : void 0;
      }
    };
    return exports.loadall = loadall = function(sets, callback, timeout) {
      var cursor, next, _ref;
      if (timeout == null) {
        timeout = 5000;
      }
      /*
          Load all modules and execute callback after loaded
      
          Args:
              sets - a sets of url and check
              callback a callback function
              timeout - timeout in second (ambiguous)
      
          Example:
              net.hashnote.module.loadall([['foobar.js', 'window.Foobar'], ['hogehoge.js', 'window.Hogehoge']], function(){
                  alert("Everything has loaded.");
              });
          */
      cursor = -1;
      next = function() {
        cursor += 1;
        if (cursor === sets.length) {
          return typeof callback === "function" ? callback() : void 0;
        } else {
          return load(sets[cursor][0], sets[cursor][1], next, timeout);
        }
      };
      if (((_ref = window.console) != null ? _ref.info : void 0) != null) {
        console.info("Load " + sets.length + " outer javascripts dynamically...");
      }
      return next();
    };
  });
  namespace('net.hashnote.path', function(exports) {
    var abspath, root;
    exports.root = root = function(pattern) {
      /*
          Get root path of script
      
          Args:
            pattern - a pattern of script name written in <script> src tag
      
          Example:
            alert(net.hashnote.path.root('jquery(\.min)?\.js'));
          */      pattern = new RegExp("(.*)" + pattern + "$");
      root = void 0;
      $('script').each(function(a, tag) {
        var match;
        match = $(tag).get(0).src.match(pattern);
        if (match != null) {
          root = match[1];
          return root.slice(0, (root.length - 1 + 1) || 9e9);
        }
      });
      return root;
    };
    return exports.abspath = abspath = function(path, root, prefix) {
      if (prefix == null) {
        prefix = '~/';
      }
      /*
          Convert relativepath to absolutepath
      
          Args:
            path - a relativepath
            root - script root path, use ``net.hashnote.path.root`` for find it
            prefix - a prefix string. default is '~/'
          */
      if (path.lastIndexOf('~/', 0) === 0) {
        path = "" + root + "/" + path.slice(2, (path.length + 1) || 9e9);
      }
      return path;
    };
  });
  $ = jQuery;
  $.fn.jencil = function(options) {
    var i, requires, _ref, _ref2, _ref3;
    options = $.extend(true, {
      root: void 0,
      profileSetPath: '~/profiles',
      previewTemplatePath: '~/templates/preview.html',
      previewPosition: 'right',
      defaultProfileName: 'html',
      defaultInsertText: '*',
      documentTypeElement: void 0,
      requires: [['~/textarea.min.js', 'window.Textarea'], ['~/jencil.core.min.js', 'window.Jencil'], ['~/jencil.widgets.min.js', 'window.Jencil.widgets'], ['~/jencil.buttons.min.js', 'window.Jencil.widgets.Button'], ['~/jencil.texteditor.min.js', 'window.Jencil.editors.TextEditor'], ['~/jencil.richeditor.min.js', 'window.Jencil.editors.RichEditor']],
      extras: []
    }, options);
    if ((_ref = options.root) == null) {
      options.root = net.hashnote.path.root('jencil(\.min)?\.js');
    }
    options.profileSetPath = net.hashnote.path.abspath(options.profileSetPath, options.root);
    options.previewTemplatePath = net.hashnote.path.abspath(options.previewTemplatePath, options.root);
    for (i = 0, _ref2 = options.requires.length; 0 <= _ref2 ? i < _ref2 : i > _ref2; 0 <= _ref2 ? i++ : i--) {
      options.requires[i][0] = net.hashnote.path.abspath(options.requires[i][0], options.root);
    }
    for (i = 0, _ref3 = options.extras.length; 0 <= _ref3 ? i < _ref3 : i > _ref3; 0 <= _ref3 ? i++ : i--) {
      options.extras[i][0] = net.hashnote.path.abspath(options.extras[i][0], options.root);
    }
    requires = options.requires.concat(options.extras);
    return net.hashnote.module.loadall(requires, __bind(function() {
      return this.each(function() {
        return new Jencil.core.Jencil($(this), options);
      });
    }, this));
  };
}).call(this);
