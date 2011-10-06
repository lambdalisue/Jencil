/*!
 * Jencil - A JavaScript Cross-browser WYSIWYM and WYSIWYG editor v0.0.2rc2
 * http://lambdalisue.github.com/Jencil
 * 
 * Copyright 2011 (c) hashnote.net, Alisue allright reserved.
 * Licensed under the MIT license.
 * 
 * Dependencies:
 * - jQuery v1.4.2
 *   http://jquery.com/
 * - Tabby jQuery plugin v0.12
 *   http://teddevito.com/demos/textarea.html
 * - Textarea v0.1.0 (included)
 *   http://demos.textarea.hashnote.net/
 * - Richarea v0.1.1 (included)
 *   http://demos.richarea.hashnote.net/
 * 
 * Includes Tabby jQuery plugin v0.12
 *   http://teddevito.com/demos/textarea.html
 *   Copyright (c) 2009 Ted Devito
 * 
 * Includes Textarea v0.1.0
 *   http://demos.textarea.hashnote.net/
 *   Copyright (c) 2011 hashnote.net, Alisue allright reserved
 * 
 * Includes Richarea v0.1.1 (included)
 *   http://demos.richarea.hashnote.net/
 *   Copyright (c) 2011 hashnote.net, Alisue allright reserved
 * 
 * Last-Modified: Thu, 06 Oct 2011 15:13:29 GMT
 */
(function() {
  /*
  Detect browser name, version and OS
  
  @ref: http://www.quirksmode.org/js/detect.html
  */
  var $, Detector;
  var __slice = Array.prototype.slice, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Detector = (function() {
    function Detector() {
      this.browser = this.searchString(Detector.dataBrowser) || "An unknown browser";
      this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "An unknown browser";
      this.OS = this.searchString(Detector.dataOS) || "An unknown OS";
    }
    Detector.prototype.searchString = function(data) {
      var row, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        row = data[_i];
        this.versionSearchString = row.versionSearch || row.identify;
        if (row.string != null) {
          if (row.string.indexOf(row.subString) !== -1) {
            return row.identify;
          } else if (row.prop) {
            return row.identify;
          }
        }
      }
      return _results;
    };
    Detector.prototype.searchVersion = function(dataString) {
      var index;
      index = dataString.indexOf(this.versionSearchString);
      if (index === -1) {
        return;
      }
      return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    };
    Detector.dataBrowser = [
      {
        string: navigator.userAgent,
        subString: 'Chrome',
        identify: 'Chrome'
      }, {
        string: navigator.userAgent,
        subString: 'OmniWeb',
        versionSearch: 'OmniWeb/',
        identify: 'OmniWeb'
      }, {
        string: navigator.vendor,
        subString: 'Apple',
        identify: 'Safari',
        versionSearch: 'Version'
      }, {
        prop: window.opera,
        identify: 'Opera',
        versionSearch: 'Version'
      }, {
        string: navigator.vendor,
        subString: 'iCab',
        identify: 'iCab'
      }, {
        string: navigator.vendor,
        subString: 'KDE',
        identify: 'Konqueror'
      }, {
        string: navigator.userAgent,
        subString: 'Firefox',
        identify: 'Firefox'
      }, {
        string: navigator.vendor,
        subString: 'Camino',
        identify: 'Camino'
      }, {
        string: navigator.userAgent,
        subString: 'Netscape',
        identify: 'Netscape'
      }, {
        string: navigator.userAgent,
        subString: 'MSIE',
        identify: 'Explorer',
        versionSearch: 'MSIE'
      }, {
        string: navigator.userAgent,
        subString: 'Gecko',
        identify: 'Mozilla',
        versionSearch: 'rv'
      }, {
        string: navigator.userAgent,
        subString: 'Mozilla',
        identify: 'Netscape',
        versionSearch: 'Mozilla'
      }
    ];
    Detector.dataOS = [
      {
        string: navigator.platform,
        subString: 'Win',
        identify: 'Windows'
      }, {
        string: navigator.platform,
        subString: 'Mac',
        identify: 'Mac'
      }, {
        string: navigator.userAgent,
        subString: 'iPhone',
        identify: 'iPhone/iPad'
      }, {
        string: navigator.platform,
        subString: 'Linux',
        identify: 'Linux'
      }
    ];
    return Detector;
  })();
  if (typeof exports !== "undefined" && exports !== null) {
    exports.Detector = Detector;
  }
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
  if (typeof exports !== "undefined" && exports !== null) {
    exports.namespace = namespace;
  }
  /*
  dynamicloader
  
  CoffeeScript dynamic javascript load utils.
  
  Author: Alisue (lambdalisue@hashnote.net)
  License: MIT License
  
  Copyright 2011 hashnote.net, Alisue allright reserved
  
  */
  namespace(this, 'dynamicloader.script', function(exports) {
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
  /*
  Jencil core
  
  Author: Alisue (lambdalisue@hashnote.net)
  License: MIT License
  
  Copyright 2011 hashnote.net, Alisue allright reserved
  
  Dependencies:
  - Jencil.options (jencil.options.js)
  - Jencil.utils.path (jencil.utils.js)
  - Jencil.theme (jencil.theme.js)
  */
  if (!(String.prototype.startsWith != null)) {
    String.prototype.startsWith = function(str) {
      return this.lastIndexOf(str, 0) === 0;
    };
  }
  if (!(String.prototype.endsWith != null)) {
    String.prototype.endsWith = function(suffix) {
      var offset;
      offset = this.length - suffix.length;
      return offset >= 0 && this.lastIndexOf(suffix, offset) === offset;
    };
  }
  if (!(String.prototype.replaceAll != null)) {
    String.prototype.replaceAll = function(search, replace) {
      return this.split(search).join(replace);
    };
  }
  if (!(String.prototype.trim != null)) {
    String.prototype.trim = function() {
      return this.replace(/^\s+|\s+$/g, '');
    };
  }
  $ = jQuery;
  $.fn.jencil = function(options) {
    options = $.extend(true, Jencil.options["default"], options);
    if (this.length > 1 && (options.documentTypeElement != null)) {
      logger.warn('documentTypeElement is not avaialble on multiple textarea');
      options.documentTypeElement = void 0;
    }
    Jencil.utils.path.init(options);
    Jencil.theme.init(options);
    if (!(Jencil.jencils != null)) {
      Jencil.jencils = [];
    }
    return this.each(function() {
      return Jencil.jencils.push(new Jencil.core.JencilCore($(this), options));
    });
  };
  namespace('Jencil.core', function(exports) {
    var JencilCore;
    return exports.JencilCore = JencilCore = (function() {
      function JencilCore($textarea, options) {
        this.$textarea = $textarea;
        this.options = options;
        this.profile = void 0;
        this.wrapper = new Jencil.widget.Wrapper(this);
        this.buttonHolder = new Jencil.widget.ButtonHolder(this);
        this.documentType = new Jencil.widget.DocumentType(this);
        this.toolbar = new Jencil.widget.Toolbar(this);
        this.toolbar.append(this.buttonHolder);
        this.toolbar.append(this.documentType);
        this.wrapper.append(this.toolbar);
        this.workspace = new Jencil.widget.Workspace(this);
        this.wrapper.append(this.workspace);
        this.$textarea.after(this.wrapper.$element);
        this.$textarea.hide();
        Jencil.profile.load(this, this.getProfileName());
      }
      JencilCore.prototype.update = function() {
        return this.workspace.use(this.profile.editor, __bind(function() {
          this.buttonHolder.update();
          return this.workspace.editor.update();
        }, this));
      };
      JencilCore.prototype.getProfileName = function() {
        return this.documentType.getProfileName();
      };
      JencilCore.prototype.getSourceValue = function() {
        return this.$textarea.val();
      };
      JencilCore.prototype.setSourceValue = function(value) {
        return this.$textarea.val(value);
      };
      return JencilCore;
    })();
  });
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
  /*
  Jencil options
  
  Author: Alisue (lambdalisue@hashnote.net)
  License: MIT License
  
  Copyright 2011 hashnote.net, Alisue allright reserved
  
  */
  namespace('Jencil.options', function(exports) {
    return exports["default"] = {
      debug: true,
      root: null,
      rootPattern: null,
      theme: {
        root: '~/extras/themes',
        "default": 'default'
      },
      profile: {
        root: '~/extras/profiles',
        "default": 'default'
      }
    };
  });
  /*
  Jencil profile
  
  Author: Alisue (lambdalisue@hashnote.net)
  License: MIT License
  
  Copyright 2011 hashnote.net, Alisue allright reserved
  
  Dependencies:
  - Jencil.utils.path (jencil.utils.js)
  - Jencil.utils.script (jencil.utils.js)
  */
  namespace('Jencil.profile', function(exports) {
    exports.abspath = function(path, jencil) {
      if (!path.endsWith('.js')) {
        path = "" + jencil.options.profile.root + "/" + path + ".js";
      }
      return Jencil.utils.path.abspath(path);
    };
    return exports.load = function(jencil, path) {
      var check, url;
      url = Jencil.profile.abspath(path, jencil);
      check = 'Jencil.profile.Profile';
      delete Jencil.profile.Profile;
      delete jencil.profile;
      return Jencil.utils.script.load(url, check, function() {
        jencil.profile = new Jencil.profile.Profile(jencil);
        return jencil.update();
      });
    };
  });
  /*
  Jencil theme
  
  Author: Alisue (lambdalisue@hashnote.net)
  License: MIT License
  
  Copyright 2011 hashnote.net, Alisue allright reserved
  
  Dependencies:
  - Jencil.utils.path (jencil.utils.js)
  - Jencil.utils.css (jencil.utils.js)
  */
  namespace('Jencil.theme', function(exports) {
    var load;
    exports.root = void 0;
    exports.init = function(options) {
      exports.root = Jencil.utils.path.abspath(options.theme.root);
      return Jencil.theme.load(options.theme["default"]);
    };
    exports.load = load = function(name) {
      var editorClass, jencil, media, url, _i, _len, _ref, _ref2, _results;
      if (Jencil.theme.current != null) {
        Jencil.utils.css.remove(new RegExp("" + Jencil.theme.current + "/.*\.css"));
      }
      Jencil.theme.current = Jencil.utils.path.abspath("" + Jencil.theme.root + "/" + name);
      url = "" + Jencil.theme.current + "/style.css";
      media = 'screen, projection';
      Jencil.theme.include(url, media);
      if (Jencil.jencils != null) {
        _ref = Jencil.jencils;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          jencil = _ref[_i];
          editorClass = jencil.workspace.editor.constructor;
          _results.push(((_ref2 = editorClass.extras) != null ? _ref2.stylesheets : void 0) != null ? Jencil.theme.includeall(editorClass.extras.stylesheets) : void 0);
        }
        return _results;
      }
    };
    exports.abspath = function(path) {
      return Jencil.utils.path.abspath(path, Jencil.theme.current);
    };
    exports.include = function(url, media) {
      url = Jencil.theme.abspath(url);
      return Jencil.utils.css.include(url, media);
    };
    return exports.includeall = function(stylesheets) {
      var url, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = stylesheets.length; _i < _len; _i++) {
        url = stylesheets[_i];
        _results.push(Jencil.theme.include(url, 'screen, projection'));
      }
      return _results;
    };
  });
  /*
  Jencil widget
  
  Author: Alisue (lambdalisue@hashnote.net)
  License: MIT License
  
  Copyright 2011 hashnote.net, Alisue allright reserved
  
  Dependencies:
  - Jencil.profile (jencil.profile.js)
  - Jencil.button (jencil.button.js)
  - Jencil.editor (jencil.editor.js)
  */
  namespace('Jencil.widget', function(exports) {
    var ButtonHolder, DocumentType, Toolbar, Widget, Workspace, Wrapper;
    exports.Widget = Widget = (function() {
      function Widget(jencil, cls, type) {
        this.jencil = jencil;
        this.cls = cls;
        if (type == null) {
          type = 'div';
        }
        this.$element = $("<" + type + ">").addClass(cls);
      }
      Widget.prototype.after = function(widget) {
        return this.$element.after(widget.$element);
      };
      Widget.prototype.append = function(widget) {
        return this.$element.append(widget.$element);
      };
      Widget.prototype.appendTo = function(widget) {
        return this.$element.appendTo(widget.$element);
      };
      Widget.prototype.before = function(widget) {
        return this.$element.before(widget.$element);
      };
      Widget.prototype.prepend = function(widget) {
        return this.$element.prepend(widget.$element);
      };
      Widget.prototype.prependTo = function(widget) {
        return this.$element.prependTo(widget.$element);
      };
      return Widget;
    })();
    exports.Wrapper = Wrapper = (function() {
      __extends(Wrapper, Widget);
      function Wrapper(jencil) {
        Wrapper.__super__.constructor.call(this, jencil, 'jencil');
      }
      return Wrapper;
    })();
    exports.DocumentType = DocumentType = (function() {
      __extends(DocumentType, Widget);
      function DocumentType(jencil) {
        DocumentType.__super__.constructor.call(this, jencil, 'jencil-document-type');
        this.$documentTypeElement = this.jencil.options.documentTypeElement;
        if (this.$documentTypeElement != null) {
          if (!(this.$documentTypeElement instanceof jQuery)) {
            this.$documentTypeElement = $(this.$documentTypeElement);
          }
          this.$element.append(this.$documentTypeElement);
          this.$documentTypeElement.change(__bind(function() {
            return Jencil.profile.load(this.jencil, this.getProfileName());
          }, this));
        }
      }
      DocumentType.prototype.getProfileName = function() {
        if (this.$documentTypeElement != null) {
          return this.$documentTypeElement.val();
        }
        return this.jencil.options.profile["default"];
      };
      return DocumentType;
    })();
    exports.ButtonHolder = ButtonHolder = (function() {
      __extends(ButtonHolder, Widget);
      function ButtonHolder(jencil) {
        ButtonHolder.__super__.constructor.call(this, jencil, 'jencil-button-holder');
      }
      ButtonHolder.prototype.update = function() {
        var args, button, buttonset, type, _i, _len, _ref, _results;
        this.$element.children().remove();
        _ref = this.jencil.profile.buttonsets;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          buttonset = _ref[_i];
          type = buttonset[0];
          args = buttonset.slice(1, (buttonset.length + 1) || 9e9);
          button = Jencil.button.createButton(this.jencil, type, args);
          _results.push(this.append(button));
        }
        return _results;
      };
      return ButtonHolder;
    })();
    exports.Toolbar = Toolbar = (function() {
      __extends(Toolbar, Widget);
      function Toolbar(jencil) {
        Toolbar.__super__.constructor.call(this, jencil, 'jencil-toolbar');
      }
      return Toolbar;
    })();
    return exports.Workspace = Workspace = (function() {
      __extends(Workspace, Widget);
      function Workspace(jencil) {
        Workspace.__super__.constructor.call(this, jencil, 'jencil-workspace');
        this.editor = null;
      }
      Workspace.prototype.use = function(name, callback) {
        return Jencil.editor.use(this.jencil, name, __bind(function() {
          return callback();
        }, this));
      };
      return Workspace;
    })();
  });
  /*
  Jencil button
  
  Author: Alisue (lambdalisue@hashnote.net)
  License: MIT License
  
  Copyright 2011 hashnote.net, Alisue allright reserved
  
  Required:
  - Jencil.widget (jencil.widget.js)
  
  Dependencies:
  - Jencil.utils.detector (jencil.utils.js)
  */
  namespace('Jencil.button', function(exports) {
    var ButtonBase, ExecButton, MarkupButtonBase, PreviewButton, Separator, Widget;
    Widget = Jencil.widget.Widget;
    exports.createButton = function(jencil, type, args) {
      var cls;
      cls = void 0;
      switch (type) {
        case '-':
        case 'separator':
          cls = Jencil.button.Separator;
          break;
        case '+':
        case 'exec':
          cls = Jencil.button.ExecButton;
          break;
        case 'preview':
          cls = Jencil.button.PreviewButton;
          break;
        default:
          cls = Jencil.button[type];
          if (!(cls != null)) {
            throw new Error("Unknown button type is passed (type: " + type + ")");
          }
      }
      return new cls(jencil, args);
    };
    exports.ButtonBase = ButtonBase = (function() {
      __extends(ButtonBase, Widget);
      function ButtonBase(jencil, cls, name) {
        ButtonBase.__super__.constructor.call(this, jencil, 'button', 'a');
        this.$element.addClass(cls);
        this.$element.attr('title', name);
        this.$element.css('cursor', 'pointer');
        if (Jencil.utils.detector.browser === 'Explorer' && Jencil.utils.detector.version < 8) {
          this.$element.attr('href', 'javascript:void(0);');
        }
        this.$element.append($("<span>" + name + "</span>"));
        this.$element.click(__bind(function() {
          this.clickBefore();
          this.click();
          return this.clickAfter();
        }, this));
      }
      ButtonBase.prototype.editor = function() {
        return this.jencil.workspace.editor;
      };
      ButtonBase.prototype.clickBefore = function() {};
      ButtonBase.prototype.click = function() {};
      ButtonBase.prototype.clickAfter = function() {};
      return ButtonBase;
    })();
    exports.MarkupButtonBase = MarkupButtonBase = (function() {
      __extends(MarkupButtonBase, ButtonBase);
      function MarkupButtonBase() {
        MarkupButtonBase.__super__.constructor.apply(this, arguments);
      }
      MarkupButtonBase.prototype.clickAfter = function() {
        this.editor().update();
        return this.editor().focus();
      };
      return MarkupButtonBase;
    })();
    exports.Separator = Separator = (function() {
      __extends(Separator, Widget);
      function Separator(jencil, args) {
        Separator.__super__.constructor.call(this, jencil, 'separator', 'span');
        this.$element.append($('<span>|</span>'));
      }
      return Separator;
    })();
    exports.ExecButton = ExecButton = (function() {
      __extends(ExecButton, ButtonBase);
      function ExecButton(jencil, args) {
        var cls, name;
        cls = args[0], name = args[1], this._click = args[2], this._clickBefore = args[3], this._clickAfter = args[4];
        ExecButton.__super__.constructor.call(this, jencil, cls, name);
      }
      ExecButton.prototype.clickBefore = function() {
        return this._clickBefore(this.editor());
      };
      ExecButton.prototype.click = function() {
        return this._click(this.editor());
      };
      ExecButton.prototype.clickAfter = function() {
        return this._clickAfter(this.editor());
      };
      return ExecButton;
    })();
    return exports.PreviewButton = PreviewButton = (function() {
      __extends(PreviewButton, ButtonBase);
      function PreviewButton(jencil, args) {
        PreviewButton.__super__.constructor.call(this, jencil, 'preview', 'Preview');
      }
      PreviewButton.prototype.click = function() {
        var editor, _ref;
        editor = this.editor();
        if ((_ref = editor.preview) != null) {
          _ref.toggle();
        }
        return editor.relocate();
      };
      return PreviewButton;
    })();
  });
  /*
  Jencil editor
  
  Author: Alisue (lambdalisue@hashnote.net)
  License: MIT License
  
  Copyright 2011 hashnote.net, Alisue allright reserved
  
  Required:
  - Jencil.widget (jencil.widget.js)
  
  Dependencies
  - Jencil.utils.script (jencil.utils.js)
  - Jencil.theme (jencil.theme.js)
  */
  namespace('Jencil.editor', function(exports) {
    var DualPaneEditorBase, EditorBase, SinglePaneEditorBase, Widget, getOffsetX, getOffsetY, use;
    Widget = Jencil.widget.Widget;
    getOffsetX = function($$) {
      return $$.outerWidth(true) - $$.width();
    };
    getOffsetY = function($$) {
      return $$.outerHeight(true) - $$.height();
    };
    exports.use = use = function(jencil, name, callback) {
      var check, prepare, process, url, _ref;
      if (callback == null) {
        callback = void 0;
      }
      prepare = function() {
        var extras, _ref;
        extras = Jencil.editor[name].extras;
        if ((extras != null ? extras.options : void 0) != null) {
          jencil.options.extras = $.extend(true, extras.options, (_ref = jencil.options.extras) != null ? _ref : {});
        }
        if ((extras != null ? extras.stylesheets : void 0) != null) {
          Jencil.theme.includeall(extras.stylesheets);
        }
        if ((extras != null ? extras.requires : void 0) != null) {
          return Jencil.utils.script.loadall(extras.requires, function() {
            return process();
          });
        } else {
          return process();
        }
      };
      process = function() {
        var editor, editorClass;
        editorClass = Jencil.editor[name];
        if (jencil.workspace.editor != null) {
          jencil.workspace.editor.$element.remove();
          jencil.workspace.editor = null;
        }
        editor = new editorClass(jencil);
        jencil.workspace.append(editor);
        jencil.workspace.editor = editor;
        editor.init();
        if (callback != null) {
          return callback();
        }
      };
      if (name instanceof Array) {
        _ref = name, name = _ref[0], url = _ref[1], check = _ref[2];
        return Jencil.utils.script.load(url, check, function() {
          return prepare();
        });
      } else {
        return prepare();
      }
    };
    exports.EditorBase = EditorBase = (function() {
      __extends(EditorBase, Widget);
      function EditorBase(jencil, cls) {
        EditorBase.__super__.constructor.call(this, jencil, cls);
        this.workspace = this.jencil.workspace;
        this.$element.addClass('jencil-editor');
        this.$element.hide();
      }
      EditorBase.prototype.init = function() {
        this.$element.show();
        return this.relocate();
      };
      EditorBase.prototype.update = function() {
        return this.relocate();
      };
      EditorBase.prototype.relocate = function() {
        var height, offsetX, offsetY, width;
        offsetX = getOffsetX(this.$element);
        offsetY = getOffsetY(this.$element);
        width = this.workspace.$element.width();
        height = this.workspace.$element.height();
        this.$element.width(width - offsetX);
        return this.$element.height(height - offsetY);
      };
      EditorBase.prototype.focus = function() {
        throw new Error('subclass must override this method to focus editor main panel');
      };
      return EditorBase;
    })();
    exports.SinglePaneEditorBase = SinglePaneEditorBase = (function() {
      __extends(SinglePaneEditorBase, EditorBase);
      function SinglePaneEditorBase(jencil, cls, pane) {
        this.pane = pane;
        SinglePaneEditorBase.__super__.constructor.call(this, jencil, cls);
        this.pane.$element.appendTo(this.$element);
        this.pane.$element.addClass('jencil-pane');
        this.$element.addClass("jencil-siglepane-editor");
      }
      SinglePaneEditorBase.prototype.init = function() {
        this.pane.init();
        return SinglePaneEditorBase.__super__.init.call(this);
      };
      SinglePaneEditorBase.prototype.update = function() {
        this.pane.update();
        return SinglePaneEditorBase.__super__.update.call(this);
      };
      SinglePaneEditorBase.prototype.relocate = function() {
        var height, offsetX, offsetY, width;
        SinglePaneEditorBase.__super__.relocate.call(this);
        offsetX = getOffsetX(this.pane.$element);
        offsetY = getOffsetY(this.pane.$element);
        width = this.$element.width();
        height = this.$element.height();
        this.pane.$element.width(width - offsetX);
        return this.pane.$element.height(height - offsetY);
      };
      SinglePaneEditorBase.prototype.focus = function() {
        return this.pane.focus();
      };
      return SinglePaneEditorBase;
    })();
    return exports.DualPaneEditorBase = DualPaneEditorBase = (function() {
      __extends(DualPaneEditorBase, EditorBase);
      function DualPaneEditorBase(jencil, cls, lhspane, rhspane, panedir) {
        this.lhspane = lhspane;
        this.rhspane = rhspane;
        this.panedir = panedir != null ? panedir : 'horizontal';
        DualPaneEditorBase.__super__.constructor.call(this, jencil, cls);
        this.lhspane.$element.appendTo(this.$element);
        this.rhspane.$element.appendTo(this.$element);
        this.lhspane.$element.addClass('jencil-lhspane');
        this.rhspane.$element.addClass('jencil-rhspane');
        this.$element.addClass("jencil-panedir-" + this.panedir);
      }
      DualPaneEditorBase.prototype.init = function() {
        this.lhspane.init();
        this.rhspane.init();
        return DualPaneEditorBase.__super__.init.call(this);
      };
      DualPaneEditorBase.prototype.update = function() {
        this.lhspane.update();
        this.rhspane.update();
        return DualPaneEditorBase.__super__.update.call(this);
      };
      DualPaneEditorBase.prototype.relocate = function() {
        var height, lhsOffsetX, lhsOffsetY, rhsOffsetX, rhsOffsetY, width;
        DualPaneEditorBase.__super__.relocate.call(this);
        if (this.lhspane.isVisible() && this.rhspane.isVisible()) {
          this.$element.removeClass('jencil-singlepane-editor');
          this.$element.addClass("jencil-dualpane-editor");
        } else {
          this.$element.addClass('jencil-singlepane-editor');
          this.$element.removeClass("jencil-dualpane-editor");
        }
        lhsOffsetX = getOffsetX(this.lhspane.$element);
        rhsOffsetX = getOffsetX(this.rhspane.$element);
        lhsOffsetY = getOffsetY(this.lhspane.$element);
        rhsOffsetY = getOffsetY(this.rhspane.$element);
        width = this.$element.width();
        height = this.$element.height();
        if (this.lhspane.isVisible() && this.rhspane.isVisible()) {
          if (this.panedir === 'horizontal') {
            this.lhspane.$element.css({
              'float': 'left'
            });
            this.rhspane.$element.css({
              'float': 'right'
            });
            this.lhspane.$element.width(width / 2 - lhsOffsetX);
            this.rhspane.$element.width(width / 2 - rhsOffsetX);
            this.lhspane.$element.height(height - lhsOffsetY);
            this.rhspane.$element.height(height - rhsOffsetY);
          } else {
            this.lhspane.$element.css({
              'float': 'none'
            });
            this.rhspane.$element.css({
              'float': 'none'
            });
            this.lhspane.$element.width(width - lhsOffsetX);
            this.rhspane.$element.width(width - rhsOffsetX);
            this.lhspane.$element.height(height / 2 - lhsOffsetY);
            this.rhspane.$element.height(height / 2 - rhsOffsetY);
          }
        } else if (this.lhspane.isVisible()) {
          this.lhspane.$element.css({
            'float': 'none'
          });
          this.lhspane.$element.width(width - lhsOffsetX);
          this.lhspane.$element.height(height - lhsOffsetY);
        } else {
          this.rhspane.$element.css({
            'float': 'none'
          });
          this.rhspane.$element.width(width - rhsOffsetX);
          this.rhspane.$element.height(height - rhsOffsetY);
        }
        this.lhspane.relocate();
        return this.rhspane.relocate();
      };
      return DualPaneEditorBase;
    })();
  });
  /*
  Jencil editor pane
  
  Author: Alisue (lambdalisue@hashnote.net)
  License: MIT License
  
  Copyright 2011 hashnote.net, Alisue allright reserved
  
  Required:
  - Jencil.widget (jencil.widget.js)
  - Jencil.editor (jencil.editor.js)
  
  Dependencies:
  - Jencil.utils.detector (jencil.utils.js)
  - Jencil.utils.path (jencil.utils.js)
  */
  namespace('Jencil.editor.pane', function(exports) {
    var EditorPane, PreviewPane, Widget;
    Widget = Jencil.widget.Widget;
    exports.EditorPane = EditorPane = (function() {
      __extends(EditorPane, Widget);
      function EditorPane(jencil, cls, editor) {
        this.editor = editor;
        EditorPane.__super__.constructor.call(this, jencil, cls);
        this._updateCallbacks = [];
      }
      EditorPane.prototype.init = function() {
        return this;
      };
      EditorPane.prototype.update = function(callback) {
        var _i, _len, _ref, _results;
        if (callback != null) {
          return this._updateCallbacks.push(callback);
        } else {
          _ref = this._updateCallbacks;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            callback = _ref[_i];
            _results.push(callback());
          }
          return _results;
        }
      };
      EditorPane.prototype.isVisible = function() {
        return this.$element.is(':visible');
      };
      EditorPane.prototype.show = function() {
        this.update();
        this.editor.$element.removeClass("" + this.cls + "-invisible");
        return this.$element.show();
      };
      EditorPane.prototype.hide = function() {
        this.editor.$element.addClass("" + this.cls + "-invisible");
        return this.$element.hide();
      };
      EditorPane.prototype.toggle = function() {
        if (this.isVisible()) {
          return this.hide();
        } else {
          return this.show();
        }
      };
      EditorPane.prototype.relocate = function() {};
      EditorPane.prototype.focus = function() {
        return this.$element.focus();
      };
      return EditorPane;
    })();
    return exports.PreviewPane = PreviewPane = (function() {
      __extends(PreviewPane, EditorPane);
      function PreviewPane(jencil, editor) {
        PreviewPane.__super__.constructor.call(this, jencil, 'jencil-preview-pane', editor);
        this.$element.css({
          position: 'relative'
        });
        this.$surface = $('<div>').addClass('surface');
        this.$surface.appendTo(this.$element);
        this.$surface.css({
          width: '100%',
          height: '100%',
          border: '',
          margin: 0,
          padding: 0,
          overflow: 'auto'
        });
      }
      PreviewPane.prototype._writeContent = function(content) {
        var process, templatePath;
        process = __bind(function(template) {
          return this.$surface.html(template.replace('{{content}}', content));
        }, this);
        if (!(this._previewTemplate != null)) {
          templatePath = Jencil.utils.path.abspath(this.jencil.options.extras.previewTemplatePath);
          return this.$surface.load(templatePath, __bind(function(response, status, xhr) {
            this._previewTemplate = response;
            return process(response);
          }, this));
        } else {
          return process(this._previewTemplate);
        }
      };
      PreviewPane.prototype.update = function() {
        var process, process2;
        process = __bind(function(content) {
          this._writeContent(content);
          return process.__super__.constructor.call(this);
        }, this);
        process.__super__ = PreviewPane.__super__.update.apply(this, arguments);
        process2 = __bind(function() {
          var content, _ref;
          content = this.editor.getValue();
          if (((_ref = this.jencil.profile.extras) != null ? _ref.previewParserPath : void 0) != null) {
            content = encodeURIComponent(content);
            return $.ajax({
              url: Jencil.utils.path.abspath(this.jencil.profile.extras.previewParserPath),
              type: this.jencil.profile.extras.previewParserMethod || 'GET',
              dataType: this.jencil.profile.extras.previewParserType || 'text',
              data: "" + (this.jencil.profile.extras.previewParserVal || 'data') + "=" + content,
              success: __bind(function(content) {
                return process(content);
              }, this)
            });
          } else {
            return process(content);
          }
        }, this);
        if (this.jencil.profile != null) {
          return process2();
        } else {
          return setTimeout(__bind(function() {
            if (this.jencil.profile != null) {
              return process2();
            } else {
              return setTimeout(arguments.callee, 100);
            }
          }, this), 100);
        }
      };
      PreviewPane.prototype.relocate = function() {
        PreviewPane.__super__.relocate.call(this);
        if (Jencil.utils.detector.browser === 'Explorer' && Jencil.utils.detector.version < 8) {
          return this.$surface.height(this.$element.height());
        }
      };
      return PreviewPane;
    })();
  });
  /*
  Jencil TextEditor
  
  A simple Dualpane Markup Editor with PreviewPane
  
  Author: Alisue (lambdalisue@hashnote.net)
  License: MIT License
  
  Copyright 2011 hashnote.net, Alisue allright reserved
  
  Required:
  - Jencil.widget (jencil.widget.js)
  - Jencil.editor (jencil.editor.js)
  - Jencil.editor.pane (jencil.editor.pane.js)
  - Jencil.button (jencil.button.js)
  
  Dependencies:
  - Jencil.utils.detector (jencil.utils.js)
  - Textarea (textarea.js)
  */
  namespace('Jencil.editor.pane', function(exports) {
    var EditorPane, TextareaPane;
    EditorPane = Jencil.editor.pane.EditorPane;
    return exports.TextareaPane = TextareaPane = (function() {
      __extends(TextareaPane, EditorPane);
      function TextareaPane(jencil, editor) {
        TextareaPane.__super__.constructor.call(this, jencil, 'jencil-textarea-pane', editor);
        this.$element.css({
          position: 'relative'
        });
        this.$surface = $('<textarea>').addClass('surface');
        this.$surface.appendTo(this.$element);
        this.$surface.css({
          width: '100%',
          height: '100%',
          border: 'none',
          margin: 0,
          padding: 0,
          resize: 'none',
          outline: 'none'
        });
        this.$surface.bind('keyup keypress click change blur enter', __bind(function() {
          return this.update();
        }, this));
        this.controller = new Textarea(this.$surface);
      }
      TextareaPane.prototype.init = function() {
        if ($.fn.tabby != null) {
          this.$element.tabby();
        }
        return TextareaPane.__super__.init.call(this);
      };
      TextareaPane.prototype.relocate = function() {
        TextareaPane.__super__.relocate.call(this);
        if (Jencil.utils.detector.browser === 'Explorer' && Jencil.utils.detector.version < 8) {
          return this.$surface.height(this.$element.height());
        }
      };
      TextareaPane.prototype.getValue = function() {
        return this.controller.getValue();
      };
      TextareaPane.prototype.setValue = function(value) {
        return this.controller.setValue(value);
      };
      TextareaPane.prototype.focus = function() {
        return this.$surface.focus();
      };
      return TextareaPane;
    })();
  });
  namespace('Jencil.editor', function(exports) {
    var DualPaneEditorBase, PreviewPane, TextEditor, TextareaPane;
    DualPaneEditorBase = Jencil.editor.DualPaneEditorBase;
    PreviewPane = Jencil.editor.pane.PreviewPane;
    TextareaPane = Jencil.editor.pane.TextareaPane;
    return exports.TextEditor = TextEditor = (function() {
      __extends(TextEditor, DualPaneEditorBase);
      TextEditor.extras = {
        options: {
          previewPosition: 'right',
          previewTemplatePath: '~/extras/templates/preview.html',
          defaultPreviewState: 'open'
        }
      };
      function TextEditor(jencil) {
        var lhspane, rhspane, _ref;
        if ((_ref = jencil.options.extras.previewPosition) === 'top' || _ref === 'left') {
          lhspane = this.preview = new PreviewPane(jencil, this);
          rhspane = this.textarea = new TextareaPane(jencil, this);
        } else {
          lhspane = this.textarea = new TextareaPane(jencil, this);
          rhspane = this.preview = new PreviewPane(jencil, this);
        }
        TextEditor.__super__.constructor.call(this, jencil, 'jencil-text-editor', lhspane, rhspane);
        this.$element.addClass("jencil-preview-position-" + this.jencil.options.extras.previewPosition);
        this.setValue(this.jencil.getSourceValue());
        if (this.jencil.options.extras.defaultPreviewState === 'close') {
          this.preview.hide();
        }
        this.textarea.update(__bind(function() {
          this.jencil.setSourceValue(this.getValue());
          return this.preview.update();
        }, this));
      }
      TextEditor.prototype.relocate = function() {
        TextEditor.__super__.relocate.call(this);
        if (Jencil.utils.detector.browser === 'Explorer' && Jencil.utils.detector.version === 8) {
          return document.selection.createRange().select();
        }
      };
      TextEditor.prototype.getValue = function() {
        return this.textarea.getValue();
      };
      TextEditor.prototype.setValue = function(value) {
        return this.textarea.setValue(value);
      };
      TextEditor.prototype.focus = function() {
        return this.textarea.focus();
      };
      TextEditor.prototype.getSelection = function() {
        return this.textarea.controller.getSelection();
      };
      TextEditor.prototype.setSelection = function(start, end) {
        return this.textarea.controller.setSelection(start, end);
      };
      TextEditor.prototype.getSelected = function() {
        return this.textarea.controller.getSelected();
      };
      TextEditor.prototype.replaceSelected = function(str, select) {
        if (select == null) {
          select = false;
        }
        return this.textarea.controller.replaceSelected(str, select);
      };
      TextEditor.prototype.insertBeforeSelected = function(str, select) {
        if (select == null) {
          select = false;
        }
        return this.textarea.controller.insertBeforeSelected(str, select);
      };
      TextEditor.prototype.insertAfterSelected = function(str, select) {
        if (select == null) {
          select = false;
        }
        return this.textarea.controller.insertAfterSelected(str, select);
      };
      TextEditor.prototype.wrapSelected = function(before, after, select, additional) {
        if (select == null) {
          select = false;
        }
        if (additional == null) {
          additional = void 0;
        }
        return this.textarea.controller.wrapSelected(before, after, select, additional);
      };
      return TextEditor;
    })();
  });
  namespace('Jencil.button', function(exports) {
    var ButtonBase, ImageMarkupButton, LinkMarkupButton, MarkupButtonBase, MultilineMarkupButton, SimpleMarkupButton, Widget;
    Widget = Jencil.widget.Widget;
    ButtonBase = Jencil.button.ButtonBase;
    exports.MarkupButtonBase = MarkupButtonBase = (function() {
      __extends(MarkupButtonBase, ButtonBase);
      function MarkupButtonBase() {
        MarkupButtonBase.__super__.constructor.apply(this, arguments);
      }
      MarkupButtonBase.prototype.clickAfter = function() {
        return this.editor().update();
      };
      return MarkupButtonBase;
    })();
    exports.SimpleMarkupButton = SimpleMarkupButton = (function() {
      __extends(SimpleMarkupButton, MarkupButtonBase);
      function SimpleMarkupButton(jencil, args) {
        var cls, name;
        cls = args[0], name = args[1], this.before = args[2], this.after = args[3], this.insert = args[4];
        SimpleMarkupButton.__super__.constructor.call(this, jencil, cls, name);
      }
      SimpleMarkupButton.prototype.click = function() {
        return this.editor().wrapSelected(this.before, this.after, true, this.insert || this.jencil.options.defaultInsertText);
      };
      return SimpleMarkupButton;
    })();
    exports.MultilineMarkupButton = MultilineMarkupButton = (function() {
      __extends(MultilineMarkupButton, MarkupButtonBase);
      function MultilineMarkupButton(jencil, args) {
        var cls, name;
        cls = args[0], name = args[1], this.before = args[2], this.after = args[3], this.blockBefore = args[4], this.blockAfter = args[5];
        MultilineMarkupButton.__super__.constructor.call(this, jencil, cls, name);
      }
      MultilineMarkupButton.prototype.click = function() {
        var i, line, offset, replace, selectedLines, _after, _before, _ref;
        selectedLines = this.editor().getSelected().split('\n');
        offset = selectedLines[0] === this.blockBefore ? 1 : 0;
        for (i = 0, _ref = selectedLines.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
          _before = Jencil.utils.string.format(this.before, {
            i: i + 1 - offset
          });
          _after = Jencil.utils.string.format(this.after, {
            i: i + 1 - offset
          });
          line = selectedLines[i];
          if (line === this.blockBefore || line === this.blockAfter) {
            continue;
          }
          if (line.startsWith(_before) && line.endsWith(_after)) {
            selectedLines[i] = line.substring(_before.length, line.length - _after.length);
          } else {
            selectedLines[i] = "" + _before + line + _after;
          }
        }
        if (this.blockBefore !== void 0) {
          if (selectedLines[0] === this.blockBefore) {
            selectedLines.shift();
          } else {
            selectedLines.unshift(this.blockBefore);
          }
        }
        if (this.blockAfter !== void 0) {
          if (selectedLines[selectedLines.length - 1] === this.blockAfter) {
            selectedLines.pop();
          } else {
            selectedLines.push(this.blockAfter);
          }
        }
        replace = selectedLines.join('\n');
        return this.editor().replaceSelected(replace, true);
      };
      return MultilineMarkupButton;
    })();
    exports.LinkMarkupButton = LinkMarkupButton = (function() {
      __extends(LinkMarkupButton, MarkupButtonBase);
      function LinkMarkupButton(jencil, args) {
        this.formatstr = args[0];
        LinkMarkupButton.__super__.constructor.call(this, jencil, 'link', 'Link');
      }
      LinkMarkupButton.prototype.click = function() {
        var href, insert, label, title;
        href = prompt("Please input link url");
        if (href === null) {
          return;
        }
        label = prompt("Please input link label", this.editor().getSelected());
        if (label === null) {
          return;
        }
        title = prompt("(Optional) Please input link title");
        if (title === null) {
          return;
        }
        insert = Jencil.utils.string.format(this.formatstr, {
          href: href,
          label: label,
          title: title
        });
        return this.editor().replaceSelected(insert);
      };
      return LinkMarkupButton;
    })();
    return exports.ImageMarkupButton = ImageMarkupButton = (function() {
      __extends(ImageMarkupButton, MarkupButtonBase);
      function ImageMarkupButton(jencil, args) {
        this.formatstr = args[0];
        ImageMarkupButton.__super__.constructor.call(this, jencil, 'image', 'Image');
      }
      ImageMarkupButton.prototype.click = function() {
        var alt, insert, src, title;
        src = prompt("Please input image src url");
        if (src === null) {
          return;
        }
        alt = prompt("(Optional) Please input image alt label", this.editor().getSelected());
        if (alt === null) {
          return;
        }
        title = prompt("(Optional) Please input image title");
        if (title === null) {
          return;
        }
        insert = Jencil.utils.string.format(this.formatstr, {
          src: src,
          alt: alt,
          title: title
        });
        return this.editor().replaceSelected(insert);
      };
      return ImageMarkupButton;
    })();
  });
  /*
  Jencil RichEditor
  
  A Dualpane WYSIWYG Editor with TextareaPane
  
  Author: Alisue (lambdalisue@hashnote.net)
  License: MIT License
  
  Copyright 2011 hashnote.net, Alisue allright reserved
  
  Required:
  - Jencil.widget (jencil.widget.js)
  - Jencil.editor (jencil.editor.js)
  - Jencil.editor.pane (jencil.editor.pane.js)
  - Jencil.editor.pane.TextareaPane (jencil.texteditor.js)
  - Jencil.button (jencil.button.js)
  
  Dependencies:
  - Jencil.utils.detector (jencil.utils.js)
  - Textarea (textarea.js)
  */
  namespace('Jencil.editor.pane', function(exports) {
    var EditorPane, RichareaPane;
    EditorPane = Jencil.editor.pane.EditorPane;
    return exports.RichareaPane = RichareaPane = (function() {
      __extends(RichareaPane, EditorPane);
      function RichareaPane(jencil, editor) {
        var src;
        RichareaPane.__super__.constructor.call(this, jencil, 'jencil-richarea-pane', editor);
        this.$element.css({
          position: 'relative'
        });
        this.$surface = $('<iframe>').addClass('surface');
        this.$surface.appendTo(this.$element);
        this.$surface.css({
          width: '100%',
          height: '100%',
          border: 'none',
          margin: 0,
          padding: 0
        });
        if (this.jencil.options.extras.richareaTemplatePath != null) {
          src = this.jencil.options.extras.richareaTemplatePath;
          this.$surface.attr('src', Jencil.utils.path.abspath(src));
        }
        if (Jencil.utils.detector.browser === 'Explorer') {
          this.$surface.attr('frameborder', 0);
        }
        this.controller = null;
      }
      RichareaPane.prototype.init = function() {
        this.controller = new Richarea(this.$surface);
        return this.controller.ready(__bind(function() {
          this.relocate();
          this.$body = $(this.controller.raw.body);
          this.$body.css({
            margin: 0,
            padding: 0
          });
          this.$body.bind('keyup keypress change click blur enter', __bind(function() {
            this.update();
            if (Jencil.utils.detector.browser === 'Firefox') {
              return setTimeout(__bind(function() {
                return this.update();
              }, this), 100);
            }
          }, this));
          return RichareaPane.__super__.init.call(this);
        }, this));
      };
      RichareaPane.prototype.relocate = function() {
        RichareaPane.__super__.relocate.call(this);
        if (Jencil.utils.detector.browser === 'Explorer' && Jencil.utils.detector.version < 8) {
          this.$surface.height(this.$element.height());
        }
        if (Jencil.utils.detector.browser === 'Explorer' && Jencil.utils.detector.version < 9) {
          return this.$body.height(this.$surface.height());
        }
      };
      RichareaPane.prototype.getValue = function() {
        var _ref;
        if ((_ref = this.controller) != null ? _ref.ready() : void 0) {
          return this.controller.getValue();
        }
      };
      RichareaPane.prototype.setValue = function(value) {
        var _ref;
        if ((_ref = this.controller) != null ? _ref.ready() : void 0) {
          return this.controller.setValue(value);
        }
      };
      RichareaPane.prototype.focus = function() {
        return this.$surface.focus();
      };
      return RichareaPane;
    })();
  });
  namespace('Jencil.editor', function(exports) {
    var DualPaneEditorBase, RichEditor, RichareaPane, TextareaPane;
    DualPaneEditorBase = Jencil.editor.DualPaneEditorBase;
    TextareaPane = Jencil.editor.pane.TextareaPane;
    RichareaPane = Jencil.editor.pane.RichareaPane;
    return exports.RichEditor = RichEditor = (function() {
      __extends(RichEditor, DualPaneEditorBase);
      RichEditor.extras = {
        options: {
          richareaTemplatePath: '~/extras/templates/richarea.html'
        }
      };
      function RichEditor(jencil) {
        var lhspane, rhspane, _ref;
        if ((_ref = jencil.options.extras.previewPosition) === 'top' || _ref === 'left') {
          lhspane = this.preview = new TextareaPane(jencil, this);
          rhspane = this.richarea = new RichareaPane(jencil, this);
        } else {
          lhspane = this.richarea = new RichareaPane(jencil, this);
          rhspane = this.preview = new TextareaPane(jencil, this);
        }
        RichEditor.__super__.constructor.call(this, jencil, 'jencil-rich-editor', lhspane, rhspane);
        this.$element.addClass("jencil-preview-position-" + this.jencil.options.extras.previewPosition);
        if (this.jencil.options.extras.defaultPreviewState === 'close') {
          this.preview.hide();
        }
      }
      RichEditor.prototype.init = function() {
        RichEditor.__super__.init.call(this);
        return this.richarea.controller.ready(__bind(function() {
          this.setValue(this.jencil.getSourceValue());
          this.preview.setValue(this.getValue());
          this.richarea.update(__bind(function() {
            this.jencil.setSourceValue(this.getValue());
            return this.preview.setValue(this.getValue());
          }, this));
          this.preview.update(__bind(function() {
            this.jencil.setSourceValue(this.preview.getValue());
            return this.richarea.setValue(this.preview.getValue());
          }, this));
          return this.update();
        }, this));
      };
      RichEditor.prototype.getValue = function() {
        return this.richarea.getValue();
      };
      RichEditor.prototype.setValue = function(value) {
        return this.richarea.setValue(value);
      };
      RichEditor.prototype.focus = function() {
        return this.richarea.focus();
      };
      return RichEditor;
    })();
  });
  namespace('Jencil.button', function(exports) {
    var ButtonBase, CommandButton, MarkupButtonBase, PromptCommandButton;
    ButtonBase = Jencil.button.ButtonBase;
    MarkupButtonBase = Jencil.button.MarkupButtonBase;
    exports.CommandButton = CommandButton = (function() {
      __extends(CommandButton, MarkupButtonBase);
      function CommandButton(jencil, args) {
        var cls, name;
        name = args[0], cls = args[1], this.command = args[2], this.args = args[3];
        CommandButton.__super__.constructor.call(this, jencil, name, cls);
      }
      CommandButton.prototype.click = function() {
        return this.exec(this.command, this.args);
      };
      CommandButton.prototype.clickAfter = function() {
        return this.editor().focus();
      };
      CommandButton.prototype.exec = function(command, args) {
        if (this.editor().richarea.controller != null) {
          return this.editor().richarea.controller.execCommand(command, args);
        }
      };
      return CommandButton;
    })();
    return exports.PromptCommandButton = PromptCommandButton = (function() {
      __extends(PromptCommandButton, CommandButton);
      function PromptCommandButton(jencil, args) {
        var cls, command, name;
        name = args[0], cls = args[1], command = args[2], this.message = args[3], this.defaultValue = args[4];
        PromptCommandButton.__super__.constructor.call(this, jencil, [name, cls, command, void 0]);
      }
      PromptCommandButton.prototype.click = function() {
        var value;
        value = prompt(this.message, this.defaultValue || '');
        if (value === null) {
          return;
        }
        return this.exec(this.command, value);
      };
      return PromptCommandButton;
    })();
  });
}).call(this);
