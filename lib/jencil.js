(function() {
  /*
  Jencil
  
  Javascript cross-browser WYSIWYM and WYSIWYG editor written in CoffeeScript
  
  :Author: Alisue (lambdalisue@hashnote.net)
  :Version: 0.0.1
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
  namespace('net.hashnote.css', function(exports) {
    var include, remove;
    exports.include = include = function(url, media) {
      var link;
      if (media == null) {
        media = 'all';
      }
      /*
          Include outer stylesheet dynamically
      
          Args:
              url - an outer stylesheet url
          */
      link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.media = media;
      link.href = url;
      document.head = document.head || document.getElementsByTagName('head')[0];
      return document.head.appendChild(link);
    };
    return exports.remove = remove = function(pattern) {
      pattern = new RegExp("(.*)" + pattern + "$");
      return $('link').each(function(a, tag) {
        var match;
        match = $(tag).get(0).href.match(pattern);
        if (match != null) {
          return $(tag).remove();
        }
      });
    };
  });
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
      document.head = document.head || document.getElementsByTagName('head')[0];
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
      var cursor, next;
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
          root = root.slice(0, (root.length - 2 + 1) || 9e9);
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
      if ((path != null ? path.lastIndexOf(prefix, 0) : void 0) === 0) {
        path = "" + root + "/" + path.slice(2, (path.length + 1) || 9e9);
      }
      return path;
    };
  });
  namespace('Jencil.theme', function(exports) {
    var abspath, load, loadall;
    exports.root = void 0;
    exports.init = function(options) {
      exports.root = options.themeSetPath;
      return load(options.defaultThemeName);
    };
    exports.abspath = abspath = function(path) {
      return net.hashnote.path.abspath(path, Jencil.theme.current);
    };
    exports.load = load = function(name) {
      var editorClass, initializer, jencil, media, url, _i, _len, _ref, _results;
      if (Jencil.theme.current != null) {
        net.hashnote.css.remove("" + Jencil.theme.current + "/.*\.css");
      }
      Jencil.theme.current = "" + Jencil.theme.root + "/" + name;
      url = "" + Jencil.theme.current + "/style.css";
      media = 'screen, projection';
      net.hashnote.css.include(url, media);
      if (Jencil.jencils != null) {
        _ref = Jencil.jencils;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          jencil = _ref[_i];
          editorClass = jencil.editor().constructor;
          initializer = new editorClass.Initializer(jencil);
          _results.push(loadall(initializer.stylesheets));
        }
        return _results;
      }
    };
    return exports.loadall = loadall = function(sets) {
      var media, set, url, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = sets.length; _i < _len; _i++) {
        set = sets[_i];
        url = set[0], media = set[1];
        if (media == null) {
          media = 'screen, projection';
        }
        _results.push(net.hashnote.css.include(abspath(url), media));
      }
      return _results;
    };
  });
  namespace('Jencil.loader', function(exports) {
    var Loader;
    return exports.Loader = Loader = (function() {
      /*
          Jencil loader. This loader is for inform user to Jencil is currently loading outer scripts.
          */      function Loader(textarea, options) {
        var _ref;
        this.options = options;
        this.$element = $('<div>').addClass('jencil');
        this.$element.addClass('jencil-loader');
        this.$textarea = $(textarea);
        this.$textarea.after(this.$element);
        this.$textarea.hide();
        if ((_ref = this.options.documentTypeElement) != null) {
          _ref.hide();
        }
        this.$element.show();
      }
      Loader.prototype.dispose = function() {
        var _ref;
        this.$element.remove();
        return (_ref = this.options.documentTypeElement) != null ? _ref.show() : void 0;
      };
      return Loader;
    })();
  });
  String.prototype.startsWith = function(prefix) {
    return this.lastIndexOf(prefix, 0) === 0;
  };
  String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
  };
  $ = jQuery;
  $.fn.jencil = function(options) {
    var i, loaders, requires, _ref, _ref2, _ref3, _ref4;
    options = $.extend(true, {
      root: void 0,
      editorSetPath: '~/editors',
      profileSetPath: '~/profiles',
      themeSetPath: '~/themes',
      defaultProfileName: 'wysiwyg',
      defaultThemeName: 'default',
      defaultInsertText: '<< any text >>',
      documentTypeElement: void 0,
      extras: {},
      requires: [['~/jencil.core.min.js', 'window.Jencil.core'], ['~/jencil.widgets.min.js', 'window.Jencil.widgets'], ['~/jencil.buttons.min.js', 'window.Jencil.buttons'], ['~/jencil.editors.min.js', 'window.Jencil.editors'], ['~/jencil.profile.min.js', 'window.Jencil.profile']],
      editors: [['~/editors/jencil.texteditor.min.js', 'window.Jencil.editors.TextEditor'], ['~/editors/jencil.richeditor.min.js', 'window.Jencil.editors.RichEditor']]
    }, options);
    if (this.length > 1 && (options.documentTypeElement != null)) {
      if (((_ref = window.console) != null ? _ref.warn : void 0) != null) {
        console.warn("documentTypeElement is not avaialble on multiple textarea");
        options.documentTypeElement = void 0;
      }
    }
    if ((_ref2 = options.root) == null) {
      options.root = net.hashnote.path.root('jencil(\.min)?\.js');
    }
    options.profileSetPath = net.hashnote.path.abspath(options.profileSetPath, options.root);
    options.themeSetPath = net.hashnote.path.abspath(options.themeSetPath, options.root);
    for (i = 0, _ref3 = options.requires.length; 0 <= _ref3 ? i < _ref3 : i > _ref3; 0 <= _ref3 ? i++ : i--) {
      options.requires[i][0] = net.hashnote.path.abspath(options.requires[i][0], options.root);
    }
    for (i = 0, _ref4 = options.editors.length; 0 <= _ref4 ? i < _ref4 : i > _ref4; 0 <= _ref4 ? i++ : i--) {
      options.editors[i][0] = net.hashnote.path.abspath(options.editors[i][0], options.root);
    }
    Jencil.theme.init(options);
    loaders = [];
    this.each(function() {
      return loaders.push(new Jencil.loader.Loader(this, options));
    });
    requires = options.requires;
    requires = requires.concat(options.editors);
    return net.hashnote.module.loadall(requires, __bind(function() {
      var loader, _i, _len;
      for (_i = 0, _len = loaders.length; _i < _len; _i++) {
        loader = loaders[_i];
        loader.dispose();
      }
      if (!(Jencil.jencils != null)) {
        Jencil.jencils = [];
      }
      return this.each(function() {
        return Jencil.jencils.push(new Jencil.core.JencilCore($(this), options));
      });
    }, this));
  };
}).call(this);
