(function() {
  var ActionButton, AjaxViewer, Bar, BaseEditor, BaseHelper, BaseViewer, Button, Caretaker, CommandButton, DimainPanel, Fullscreen, FullscreenButton, HTML_HELPER_HTML, HelperButton, HorizontalPanel, HorizontalSplitter, HtmlEditor, HtmlHelper, HtmlProfile, HtmlViewer, MonomainPanel, MultiplePanel, Originator, Panel, Profile, RedoButton, Selection, Separator, Splitter, Statusbar, TemplateHelper, TemplateViewer, TextEditor, Toolbar, TrimainPanel, UndoButton, VerticalPanel, VerticalSplitter, ViewerButton, Widget, Workspace, Wrapper, animate, autoIndentable, autoIndentableHtml, buttonFactory, curtainFactory, evolute, headerMarkup,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.namespace = function(target, name, block) {
    var item, top, _i, _len, _ref, _ref1;
    if (arguments.length < 3) {
      _ref = [(typeof exports !== 'undefined' ? exports : window)].concat(__slice.call(arguments)), target = _ref[0], name = _ref[1], block = _ref[2];
    }
    top = target;
    _ref1 = name.split('.');
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      item = _ref1[_i];
      target = target[item] || (target[item] = {});
    }
    return block(target, top);
  };

  Originator = (function() {

    function Originator() {}

    Originator.prototype.createMemento = function() {
      throw new Error("NotImplementedError");
    };

    Originator.prototype.setMemento = function(memento) {
      throw new Error("NotImplementedError");
    };

    return Originator;

  })();

  Caretaker = (function() {

    function Caretaker(originator) {
      this._originator = originator;
      this._undoStack = [];
      this._redoStack = [];
    }

    Caretaker.prototype.originator = function(originator) {
      if (originator != null) {
        this._originator = originator;
        return this;
      }
      return originator;
    };

    Caretaker.prototype.save = function(memento) {
      memento = memento || this.originator().createMemento();
      this._undoStack.push(memento);
      return this._redoStack = [];
    };

    Caretaker.prototype.undo = function() {
      var originator;
      if (!this.canUndo()) {
        return false;
      }
      originator = this.originator();
      this._redoStack.push(originator.createMemento());
      originator.setMemento(this._undoStack.pop());
      if (typeof originator.focus === "function") {
        originator.focus();
      }
      return true;
    };

    Caretaker.prototype.redo = function() {
      var originator;
      if (!this.canRedo()) {
        return false;
      }
      originator = this.originator();
      this._undoStack.push(originator.createMemento());
      originator.setMemento(this._redoStack.pop());
      if (typeof originator.focus === "function") {
        originator.focus();
      }
      return true;
    };

    Caretaker.prototype.canUndo = function() {
      return this._undoStack.length > 0;
    };

    Caretaker.prototype.canRedo = function() {
      return this._redoStack.length > 0;
    };

    return Caretaker;

  })();

  Selection = (function() {

    function Selection(document, element) {
      this.document = document;
      this.element = element;
      this;

    }

    Selection.prototype._getCaret = function() {
      var caret, clone, e, range, s;
      if (this.document.selection != null) {
        range = this.document.selection.createRange();
        clone = range.duplicate();
        clone.moveToElementText(this.element);
        clone.setEndPoint('EndToEnd', range);
        s = clone.text.length - range.text.length;
        e = s + range.text.length;
      } else if (this.element.setSelectionRange != null) {
        s = this.element.selectionStart;
        e = this.element.selectionEnd;
      }
      caret = [s, e];
      caret.isCollapse = s === e;
      return caret;
    };

    Selection.prototype._setCaret = function(start, end) {
      var range, scrollTop;
      scrollTop = this.element.scrollTop;
      if (this.element.setSelectionRange != null) {
        this.element.setSelectionRange(start, end);
      } else if (this.element.createTextRange) {
        range = this.element.createTextRange();
        range.collapse(true);
        range.moveStart('character', start);
        range.moveEnd('character', end - start);
        range.select();
      }
      this.element.focus();
      this.element.scrollTop = scrollTop;
      return this;
    };

    Selection.prototype.caret = function(start, end) {
      if ((start != null) && typeof start === 'array') {
        end = start[1];
        start = start[0];
      }
      if ((start != null) && !(end != null)) {
        end = start;
      }
      if ((start != null) && (end != null)) {
        return this._setCaret(start, end);
      }
      return this._getCaret();
    };

    Selection.prototype.caretOffset = function(offset) {
      var caret;
      caret = this.caret();
      return this.caret(caret[0] + offset);
    };

    Selection.prototype._replace = function(str, start, end) {
      var a, b, scrollTop;
      scrollTop = this.element.scrollTop;
      b = this.element.value.substring(0, start);
      a = this.element.value.substring(end);
      this.element.value = b + str + a;
      this.element.scrollTop = scrollTop;
      return this;
    };

    Selection.prototype._getText = function() {
      var e, range, s, _ref;
      if (this.document.selection != null) {
        range = this.document.selection.createRange();
        return range.text;
      } else if (this.element.setSelectionRange) {
        _ref = this.caret(), s = _ref[0], e = _ref[1];
        return this.element.value.substring(s, e);
      }
      return null;
    };

    Selection.prototype._setText = function(str, keepSelection) {
      var e, s, scrollTop, _ref;
      scrollTop = this.element.scrollTop;
      _ref = this.caret(), s = _ref[0], e = _ref[1];
      this._replace(str, s, e);
      e = s + str.length;
      if (!keepSelection) {
        s = e;
      }
      this.caret(s, e);
      this.element.focus();
      this.element.scrollTop = scrollTop;
      return this;
    };

    Selection.prototype.text = function(str, keepSelection) {
      if (str != null) {
        return this._setText(str, keepSelection);
      }
      return this._getText();
    };

    Selection.prototype.insertBefore = function(str, keepSelection) {
      var e, s, scrollTop, text, _ref;
      scrollTop = this.element.scrollTop;
      _ref = this.caret(), s = _ref[0], e = _ref[1];
      text = this.text();
      this._replace(str + text, s, e);
      e = s + str.length;
      if (!keepSelection) {
        s = e;
      }
      this.caret(s, e);
      this.element.focus();
      this.element.scrollTop = scrollTop;
      return this;
    };

    Selection.prototype.insertAfter = function(str, keepSelection) {
      var e, s, scrollTop, text, _ref;
      scrollTop = this.element.scrollTop;
      _ref = this.caret(), s = _ref[0], e = _ref[1];
      text = this.text();
      this._replace(text + str, s, e);
      s = e;
      e = e + str.length;
      if (!keepSelection) {
        s = e;
      }
      this.caret(s, e);
      this.element.focus();
      this.element.scrollTop = scrollTop;
      return this;
    };

    Selection.prototype.enclose = function(lhs, rhs, keepSelection) {
      var e, s, scrollTop, str, text, _ref;
      scrollTop = this.element.scrollTop;
      text = this.text();
      if (text.indexOf(lhs) === 0 && text.lastIndexOf(rhs) === (text.length - rhs.length)) {
        str = text.substring(lhs.length, text.length - rhs.length);
        this.text(str, keepSelection);
      } else {
        _ref = this.caret(), s = _ref[0], e = _ref[1];
        this._replace(lhs + text + rhs, s, e);
        e = s + lhs.length + text.length + rhs.length;
        if (!keepSelection) {
          s = e;
        }
        this.caret(s, e);
      }
      this.element.focus();
      this.element.scrollTop = scrollTop;
      return this;
    };

    Selection.prototype._getLineCaretOfCaret = function(caret) {
      var e, s, value;
      value = this.element.value;
      s = value.lastIndexOf("\n", caret - 1) + 1;
      e = value.indexOf("\n", caret);
      if (e === -1) {
        e = value.length;
      }
      return [s, e];
    };

    Selection.prototype._getLineCaret = function() {
      return this._getLineCaretOfCaret(this.caret()[0]);
    };

    Selection.prototype._getLine = function() {
      var e, s, _ref;
      _ref = this._getLineCaret(), s = _ref[0], e = _ref[1];
      return this.element.value.substring(s, e);
    };

    Selection.prototype._setLine = function(line, keepSelection) {
      var e, s, scrollTop, _ref;
      scrollTop = this.element.scrollTop;
      _ref = this._getLineCaret(), s = _ref[0], e = _ref[1];
      this._replace(line, s, e);
      e = s + line.length;
      if (!keepSelection) {
        s = e;
      }
      this.caret(s, e);
      this.element.focus();
      this.element.scrollTop = scrollTop;
      return this;
    };

    Selection.prototype.line = function(value, keepSelection) {
      if (value != null) {
        return this._setLine(value, keepSelection);
      }
      return this._getLine();
    };

    Selection.prototype.selectWholeLine = function(caret) {
      var e, s, _ref;
      _ref = this._getLineCaretOfCaret(caret), s = _ref[0], e = _ref[1];
      return this.caret(s, e);
    };

    Selection.prototype.selectWholeCurrentLine = function() {
      var e, s, _ref;
      _ref = this._getLineCaretOfCaret(this.caret()[0]), s = _ref[0], e = _ref[1];
      return this.caret(s, e);
    };

    return Selection;

  })();

  /*
  Evolution
  
  Extend jQueryObj
  
  Author: lambdalisue
  License: MIT License
  */


  evolute = (function() {
    var absoluteX, absoluteY, contentX, contentY, maxHeight, maxWidth, minHeight, minWidth, ncss, nonContentHeight, nonContentWidth, outerHeight, outerWidth, relativeX, relativeY;
    nonContentWidth = function(includeMargin) {
      if (includeMargin == null) {
        includeMargin = false;
      }
      return this.outerWidth(includeMargin) - this.width();
    };
    nonContentHeight = function(includeMargin) {
      if (includeMargin == null) {
        includeMargin = false;
      }
      return this.outerHeight(includeMargin) - this.height();
    };
    outerWidth = function(includeMargin, value) {
      var offset;
      if (includeMargin == null) {
        includeMargin = false;
      }
      if (typeof includeMargin === 'number') {
        value = includeMargin;
        includeMargin = false;
      }
      if (value != null) {
        offset = this.nonContentWidth(includeMargin);
        return this.width(value - offset);
      }
      return this._outerWidth(includeMargin);
    };
    outerHeight = function(includeMargin, value) {
      var offset;
      if (includeMargin == null) {
        includeMargin = false;
      }
      if (typeof includeMargin === 'number') {
        value = includeMargin;
        includeMargin = false;
      }
      if (value != null) {
        offset = this.nonContentHeight(includeMargin);
        return this.height(value - offset);
      }
      return this._outerHeight(includeMargin);
    };
    nonContentWidth = function(includeMargin) {
      if (includeMargin == null) {
        includeMargin = false;
      }
      return this.outerWidth(includeMargin) - this.width();
    };
    nonContentHeight = function(includeMargin) {
      if (includeMargin == null) {
        includeMargin = false;
      }
      return this.outerHeight(includeMargin) - this.height();
    };
    ncss = function(propertyName, defaultValue) {
      var value;
      if (defaultValue == null) {
        defaultValue = null;
      }
      value = this.css(propertyName);
      if (value === '' || value === 'none' || value === null || value === (void 0) || value === NaN) {
        return defaultValue;
      }
      value = parseInt(value, 10);
      return value;
    };
    minWidth = function() {
      return this.ncss('min-width');
    };
    minHeight = function() {
      return this.ncss('min-height');
    };
    maxWidth = function() {
      return this.ncss('max-width');
    };
    maxHeight = function() {
      return this.ncss('max-height');
    };
    contentX = function(includeMargin) {
      var borderLeft, marginLeft, paddingLeft;
      if (includeMargin == null) {
        includeMargin = false;
      }
      marginLeft = includeMargin ? this.ncss('margin-left') : 0;
      borderLeft = this.ncss('border-left-width');
      paddingLeft = this.ncss('padding-left');
      return marginLeft + borderLeft + paddingLeft;
    };
    contentY = function(includeMargin) {
      var borderTop, marginTop, paddingTop;
      if (includeMargin == null) {
        includeMargin = false;
      }
      marginTop = includeMargin ? this.ncss('margin-top') : 0;
      borderTop = this.ncss('border-top-width');
      paddingTop = this.ncss('padding-top');
      return marginTop + borderTop + paddingTop;
    };
    absoluteX = function(value) {
      var offset;
      offset = this.offset();
      if (value != null) {
        offset.left = value;
        return this.offset(offset);
      }
      return offset.left;
    };
    absoluteY = function(value) {
      var offset;
      offset = this.offset();
      if (value != null) {
        offset.top = value;
        return this.offset(offset);
      }
      return offset.top;
    };
    relativeX = function(includeMargin, value) {
      var offset, parent;
      if (includeMargin == null) {
        includeMargin = false;
      }
      if (typeof includeMargin === 'number') {
        value = includeMargin;
        includeMargin = false;
      }
      parent = evolute(this.parent());
      offset = parent.absoluteX() + parent.contentX(includeMargin);
      if (value != null) {
        return this.absoluteX(value + offset);
      }
      return this.absoluteX() - offset;
    };
    relativeY = function(includeMargin, value) {
      var offset, parent;
      if (includeMargin == null) {
        includeMargin = false;
      }
      if (typeof includeMargin === 'number') {
        value = includeMargin;
        includeMargin = false;
      }
      parent = evolute(this.parent());
      offset = parent.absoluteY() + parent.contentY(includeMargin);
      if (value != null) {
        return this.absoluteY(value + offset);
      }
      return this.absoluteY() - offset;
    };
    evolute = function(jQueryObj) {
      if (jQueryObj.__evoluted__ === true) {
        return jQueryObj;
      }
      jQueryObj._outerWidth = jQueryObj.outerWidth;
      jQueryObj._outerHeight = jQueryObj.outerHeight;
      jQueryObj.nonContentWidth = nonContentWidth;
      jQueryObj.nonContentHeight = nonContentHeight;
      jQueryObj.outerWidth = outerWidth;
      jQueryObj.outerHeight = outerHeight;
      jQueryObj.nonContentWidth = nonContentWidth;
      jQueryObj.nonContentHeight = nonContentHeight;
      jQueryObj.ncss = ncss;
      jQueryObj.minWidth = minWidth;
      jQueryObj.minHeight = minHeight;
      jQueryObj.maxWidth = maxWidth;
      jQueryObj.maxHeight = maxHeight;
      jQueryObj.contentX = contentX;
      jQueryObj.contentY = contentY;
      jQueryObj.absoluteX = absoluteX;
      jQueryObj.absoluteY = absoluteY;
      jQueryObj.relativeX = relativeX;
      jQueryObj.relativeY = relativeY;
      jQueryObj.__evoluted__ = true;
      return jQueryObj;
    };
    return evolute;
  })();

  curtainFactory = function(element) {
    var curtain;
    element.css('position', 'relative');
    curtain = $('<div>').appendTo(element).hide().css({
      'position': 'absolute',
      'top': '0',
      'left': '0',
      'overflow': 'hidden',
      'z-index': 99999
    });
    curtain.on = function() {
      curtain.refresh();
      return curtain.show();
    };
    curtain.refresh = function() {
      curtain.width(element.outerWidth(true));
      return curtain.height(element.outerHeight(true));
    };
    curtain.off = function() {
      return curtain.hide();
    };
    return curtain;
  };

  /*
  animation
  
  Animate value via easing function
  
  The following library is required to use this library
  
  - jQuery
  
  Author:   lambdalisue (lambdalisue@hashnote.net)
  License:  MIT License
  
  Copyright(C) 2012 lambdalisue, hasnote.net allright reserved
  */


  animate = (function() {
    var defaultOptions, now;
    now = function() {
      return (new Date()).getTime();
    };
    defaultOptions = {
      start: 0,
      end: 100,
      duration: 1000,
      callbackEach: null,
      callbackDone: null,
      easing: jQuery.easing.swing
    };
    return function(options) {
      var difference, startTime, step;
      options = jQuery.extend(defaultOptions, options);
      startTime = now();
      difference = options.end - options.start;
      step = function() {
        var epoch, x;
        epoch = now() - startTime;
        x = options.easing(epoch / options.duration, epoch, 0, 1, options.duration);
        x = x * difference + options.start;
        options.callbackEach(x, epoch);
        if (epoch < options.duration) {
          return setTimeout(step, 1);
        } else {
          options.callbackEach(options.end, options.duration);
          return typeof options.callbackDone === "function" ? options.callbackDone() : void 0;
        }
      };
      return step();
    };
  })();

  /*
  autoindent
  
  Enable auto indentation feature in textarea
  It is suitable with jquery.tabby.js which enable tab indentation in textarea
  
  The following library is required to use this library
  
  - jQuery
  - selection
  
  Note:
    You should use this library as CoffeeScript that's why I didn't
    add `autoIndentable` in window namespace
  
  Usage:
  
    textarea = $('textarea')
    textarea = autoIndentable(textarea)
  
    # auto indent feature is enable at default.
    # you can disable it with
    textarea.autoIndent.disable()
  
    # and enable again with
    textarea.autoIndent.enable()
  
    # and also, you can add some pre/post callback
    # which is called pre/post step of adding newline
    # and white spaces with
    textarea.autoIndent.pre = (e, line) ->
      # e = Event object of jQuery
      # line = current line of caret exists
      console.log "This function is called before newline adding"
    textarea.autoIndent.post = (e, line, indent, insert) ->
      # e = Event object of jQuery
      # line = current line of caret exists
      # indent = leading white spaces of current line
      # insert = newline and indent which is added after the caret
      console.log "This function is called after newline adding"
  
  Author:   lambdalisue (lambdalisue@hashnote.net)
  License:  MIT License
  
  Copyright(C) 2012 lambdalisue, hasnote.net allright reserved
  */


  autoIndentable = (function() {
    var autoIndent;
    autoIndent = function(e) {
      var indent, insert, line, _ref, _ref1;
      if (e.which !== 13) {
        return;
      }
      line = this.selection.line();
      if ((_ref = this.autoIndent.pre) != null) {
        _ref.call(this, e, line);
      }
      indent = line.replace(/^([\t\s]*).*$/, "$1");
      insert = "\n" + indent;
      this.selection.insertAfter(insert, false);
      if ((_ref1 = this.autoIndent.post) != null) {
        _ref1.call(this, e, line, indent, insert);
      }
      e.stopPropagation();
      e.stopImmediatePropagation();
      e.preventDefault();
      this.focus();
      return false;
    };
    return function(textarea, pre, post) {
      if (!(textarea instanceof jQuery)) {
        textarea = $(textarea);
      }
      if (!(textarea.selection != null)) {
        textarea.selection = new Selection(document, textarea.get(0));
      }
      textarea.autoIndent = function(e) {
        return autoIndent.call(textarea, e);
      };
      textarea.autoIndent.enable = function() {
        textarea.on('keydown', textarea.autoIndent);
        return textarea;
      };
      textarea.autoIndent.disable = function() {
        textarea.off('keydown', textarea.autoIndent);
        return textarea;
      };
      if (pre != null) {
        textarea.autoIndent.pre = function(e, line) {
          return pre.call(textarea, e, line);
        };
      }
      if (post != null) {
        textarea.autoIndent.post = function(e, line, indent, insert) {
          return post.call(textarea, e, line, indent, insert);
        };
      }
      return textarea.autoIndent.enable();
    };
  })();

  Profile = (function() {

    Profile.prototype.mainPanelClass = null;

    Profile.prototype.editorClass = null;

    Profile.prototype.viewerClass = null;

    Profile.prototype.helperClass = null;

    Profile.prototype.toolbarButtons = null;

    Profile.prototype.statusbarButtons = null;

    Profile.prototype.defaultVolume = null;

    Profile.prototype.defaultVolume2 = null;

    function Profile(options) {
      this.options = options;
      this;

    }

    return Profile;

  })();

  this.Jencil = (function() {

    function Jencil(textarea, options) {
      var _this = this;
      this.options = jQuery.extend({
        'profile': Jencil.profiles.HtmlProfile,
        'resizable': true,
        'enableTabIndent': true,
        'enableAutoIndent': true,
        'tabString': '    ',
        'defaultVolume': null,
        'defaultVolume2': null,
        'width': 640,
        'height': 620,
        'editorTemplatePath': null,
        'viewerTemplatePath': null,
        'helperTemplatePath': null
      }, options);
      this.element = textarea.hide();
      this.caretaker = new Caretaker();
      this.caretaker.originator = function() {
        return _this.editor();
      };
      this.wrapper = new Wrapper(this, this.options.width, this.options.height);
      this.fullscreen = new Fullscreen(this);
      this.element.after(this.wrapper.element).after(this.fullscreen.element);
      this.wrapper.init();
      this.wrapper.adjust();
      this.caretaker.save();
    }

    Jencil.prototype.editor = function() {
      return this.wrapper.workspace.mainPanel.editorPanel || null;
    };

    Jencil.prototype.viewer = function() {
      return this.wrapper.workspace.mainPanel.viewerPanel || null;
    };

    Jencil.prototype.helper = function() {
      return this.wrapper.workspace.mainPanel.helperPanel || null;
    };

    return Jencil;

  })();

  $.fn.jencil = function(options) {
    return new Jencil($(this), options);
  };

  namespace('Jencil.profiles', function(exports) {
    return exports.Profile = Profile;
  });

  namespace('Jencil.utils', function(exports) {
    return exports.namespace = namespace;
  });

  Widget = (function() {

    function Widget(core, selector, context) {
      this.core = core;
      if (selector == null) {
        selector = '<div>';
      }
      if (selector instanceof jQuery) {
        this.element = selector;
      } else {
        this.element = $(selector, context);
      }
      this.element = evolute(this.element);
    }

    Widget.prototype.init = function() {
      return this;
    };

    Widget.prototype.adjust = function() {
      return this;
    };

    return Widget;

  })();

  Panel = (function(_super) {

    __extends(Panel, _super);

    function Panel(core, selector, context) {
      if (selector == null) {
        selector = '<div>';
      }
      Panel.__super__.constructor.call(this, core, selector, context);
      this.element.addClass('panel');
    }

    return Panel;

  })(Widget);

  MultiplePanel = (function(_super) {

    __extends(MultiplePanel, _super);

    function MultiplePanel(core, fst, snd, splitter) {
      var hide, show,
        _this = this;
      this.fst = fst;
      this.snd = snd;
      this.splitter = splitter;
      MultiplePanel.__super__.constructor.call(this, core);
      this.element.addClass('multiple');
      this.element.append(this.fst.element);
      this.element.append(this.splitter.element);
      this.element.append(this.snd.element);
      show = function(callback) {
        if (!this.element.is(':visible')) {
          return this.toggle(callback, null);
        }
      };
      hide = function(callback) {
        if (this.element.is(':visible')) {
          return this.toggle(null, callback);
        }
      };
      this.fst.toggle = function(callbackOn, callbackOff) {
        return _this._togglePanel(0, callbackOn, callbackOff);
      };
      this.fst.show = show;
      this.fst.hide = hide;
      this.snd.toggle = function(callbackOn, callbackOff) {
        return _this._togglePanel(1, callbackOn, callbackOff);
      };
      this.snd.show = show;
      this.snd.hide = hide;
      this.splitter.element.dblclick(function() {
        return _this.snd.toggle();
      });
    }

    MultiplePanel.prototype.init = function() {
      this.splitter.init();
      this.fst.init();
      return this.snd.init();
    };

    MultiplePanel.prototype._togglePanel = function(to, callbackOn, callbackOff) {
      var callbackDone, end, volume, _callbackDone,
        _this = this;
      if (this._animating) {
        return;
      }
      volume = this.splitter.volume();
      callbackDone = null;
      if ((0 < volume && volume < 1)) {
        end = to;
        this.splitter._previousVolume = volume;
        _callbackDone = callbackOff;
      } else {
        end = this.splitter._previousVolume || this.splitter.defaultVolume;
        if (end === to) {
          end = 0.5;
        }
        _callbackDone = callbackOn;
      }
      this._animating = true;
      callbackDone = function() {
        _this._animating = false;
        return typeof _callbackDone === "function" ? _callbackDone() : void 0;
      };
      return animate({
        start: volume,
        end: end,
        duration: 500,
        callbackEach: function(value, epoch) {
          return _this.splitter.volume(value);
        },
        callbackDone: callbackDone
      });
    };

    return MultiplePanel;

  })(Panel);

  VerticalPanel = (function(_super) {

    __extends(VerticalPanel, _super);

    function VerticalPanel(core, fst, snd, defaultVolume) {
      var splitter;
      if (defaultVolume == null) {
        defaultVolume = 0.5;
      }
      splitter = new VerticalSplitter(core, fst, snd, defaultVolume);
      VerticalPanel.__super__.constructor.call(this, core, fst, snd, splitter);
      this.element.addClass('vertical');
    }

    VerticalPanel.prototype.adjust = function() {
      this.fst.element.outerHeight(true, this.element.height());
      this.snd.element.outerHeight(true, this.element.height());
      this.splitter.element.outerHeight(true, this.element.height());
      this.splitter.adjust();
      return this;
    };

    return VerticalPanel;

  })(MultiplePanel);

  HorizontalPanel = (function(_super) {

    __extends(HorizontalPanel, _super);

    function HorizontalPanel(core, fst, snd, defaultVolume) {
      var splitter;
      if (defaultVolume == null) {
        defaultVolume = 0.5;
      }
      splitter = new HorizontalSplitter(core, fst, snd, defaultVolume);
      HorizontalPanel.__super__.constructor.call(this, core, fst, snd, splitter);
      this.element.addClass('horizontal');
    }

    HorizontalPanel.prototype.adjust = function() {
      this.fst.element.outerWidth(true, this.element.width());
      this.snd.element.outerWidth(true, this.element.width());
      this.splitter.element.outerWidth(true, this.element.width());
      this.splitter.adjust();
      return this;
    };

    return HorizontalPanel;

  })(MultiplePanel);

  namespace('Jencil.ui.widgets', function(exports) {
    return exports.Widget = Widget;
  });

  namespace('Jencil.ui.widgets.panels', function(exports) {
    exports.Panel = Panel;
    exports.MultiplePanel = MultiplePanel;
    exports.VerticalPanel = VerticalPanel;
    return exports.HorizontalPanel = HorizontalPanel;
  });

  Splitter = (function(_super) {

    __extends(Splitter, _super);

    function Splitter(core, fst, snd, defaultVolume) {
      var mousemove, mouseup,
        _this = this;
      this.fst = fst;
      this.snd = snd;
      this.defaultVolume = defaultVolume != null ? defaultVolume : 0.5;
      Splitter.__super__.constructor.call(this, core);
      this.element.addClass('splitter');
      this._volume = this.defaultVolume;
      mousemove = function(e) {
        var _ref, _ref1;
        _this.mousemove(e);
        if ((_ref = _this.fst.curtain) != null) {
          if (typeof _ref.refresh === "function") {
            _ref.refresh();
          }
        }
        if ((_ref1 = _this.snd.curtain) != null) {
          if (typeof _ref1.refresh === "function") {
            _ref1.refresh();
          }
        }
        e.stopPropagation();
        e.stopImmediatePropagation();
        return e.preventDefault();
      };
      mouseup = function(e) {
        var $window, _ref, _ref1;
        $window = $(window);
        $window.unbind('mousemove', mousemove);
        $window.unbind('mouseup', mouseup);
        if ((_ref = _this.fst.curtain) != null) {
          if (typeof _ref.off === "function") {
            _ref.off();
          }
        }
        if ((_ref1 = _this.snd.curtain) != null) {
          if (typeof _ref1.off === "function") {
            _ref1.off();
          }
        }
        e.stopPropagation();
        e.stopImmediatePropagation();
        return e.preventDefault();
      };
      this.element.mousedown(function(e) {
        var $window, _ref, _ref1;
        $window = $(window);
        $window.mousemove(mousemove);
        $window.mouseup(mouseup);
        if ((_ref = _this.fst.curtain) != null) {
          if (typeof _ref.on === "function") {
            _ref.on();
          }
        }
        if ((_ref1 = _this.snd.curtain) != null) {
          if (typeof _ref1.on === "function") {
            _ref1.on();
          }
        }
        e.stopPropagation();
        e.stopImmediatePropagation();
        return e.preventDefault();
      });
    }

    Splitter.prototype.init = function() {
      return this.container = evolute(this.element.parent());
    };

    Splitter.prototype.volume = function(value, skip) {
      if (skip == null) {
        skip = false;
      }
      if (value != null) {
        this._volume = value;
        if (!skip) {
          this.adjust();
        }
        return this;
      }
      return this._volume;
    };

    Splitter.prototype.value = function(value, skip) {
      var valueWidth, volume;
      if (skip == null) {
        skip = false;
      }
      valueWidth = this.valueWidth();
      if (value != null) {
        volume = value / valueWidth;
        return this.volume(volume, skip);
      }
      return this.volume() * valueWidth;
    };

    Splitter.prototype.regulateValue = function(value) {
      var maxValue, minValue;
      minValue = this.minValue();
      maxValue = this.maxValue();
      if (value < minValue) {
        value = minValue;
      }
      if (value > maxValue) {
        value = maxValue;
      }
      return value;
    };

    return Splitter;

  })(Widget);

  VerticalSplitter = (function(_super) {

    __extends(VerticalSplitter, _super);

    function VerticalSplitter(core, fst, snd, defaultVolume) {
      var _ref, _ref1;
      VerticalSplitter.__super__.constructor.call(this, core, fst, snd, defaultVolume);
      this.element.addClass('vertical');
      this.fst.element.addClass('left');
      this.snd.element.addClass('right');
      this.fst.element.css({
        'float': 'left'
      });
      this.snd.element.css({
        'float': 'left'
      });
      if ((_ref = this.fst.curtain) != null) {
        _ref.css('pointer', 'col-resize');
      }
      if ((_ref1 = this.snd.curtain) != null) {
        _ref1.css('pointer', 'col-resize');
      }
    }

    VerticalSplitter.prototype.mousemove = function(e) {
      var offset, value;
      offset = this.container.absoluteX() + this.container.contentX(true);
      value = e.pageX - offset;
      value = this.regulateValue(value);
      return this.value(value);
    };

    VerticalSplitter.prototype.valueWidth = function() {
      return this.container.width();
    };

    VerticalSplitter.prototype.minValue = function() {
      var m1, m2;
      m1 = this.fst.element.minWidth() + this.fst.element.nonContentWidth();
      m2 = this.snd.element.maxWidth() + this.snd.element.nonContentWidth();
      if (m2 != null) {
        m2 = this.valueWidth() - m2;
      }
      if ((m1 != null) && (m2 != null)) {
        return Math.min(m1, m2);
      }
      return m1 || m2 || 0;
    };

    VerticalSplitter.prototype.maxValue = function() {
      var m1, m2, valueWidth;
      valueWidth = this.valueWidth();
      m1 = this.fst.element.maxWidth() + this.fst.element.nonContentWidth();
      m2 = this.snd.element.minWidth() + this.snd.element.nonContentWidth();
      if (m2 != null) {
        m2 = valueWidth - m2;
      }
      if ((m1 != null) && (m2 != null)) {
        return Math.max(m1, m2);
      }
      return m1 || m2 || valueWidth;
    };

    VerticalSplitter.prototype.adjust = function() {
      var fstValue, sndValue, value, valueWidth;
      value = this.value();
      valueWidth = this.valueWidth();
      fstValue = value - this.fst.element.nonContentWidth(true);
      sndValue = (valueWidth - value) - this.snd.element.nonContentWidth(true);
      if (fstValue <= 0) {
        if (this.fst.element.is(':visible')) {
          this.fst.element.hide();
        }
        if (!this.snd.element.is(':visible')) {
          this.snd.element.show();
        }
        this.snd.element.outerWidth(true, valueWidth);
        this._value = value = 0;
      } else if (sndValue <= 0) {
        if (!this.fst.element.is(':visible')) {
          this.fst.element.show();
        }
        if (this.snd.element.is(':visible')) {
          this.snd.element.hide();
        }
        this.fst.element.outerWidth(true, valueWidth);
        this._value = value = valueWidth;
      } else {
        if (!this.fst.element.is(':visible')) {
          this.fst.element.show();
        }
        if (!this.snd.element.is(':visible')) {
          this.snd.element.show();
        }
        this.fst.element.width(fstValue);
        this.snd.element.width(sndValue);
      }
      this.fst.adjust();
      this.snd.adjust();
      this.element.relativeX(value - this.element.outerWidth() / 2);
      return this;
    };

    return VerticalSplitter;

  })(Splitter);

  HorizontalSplitter = (function(_super) {

    __extends(HorizontalSplitter, _super);

    function HorizontalSplitter(core, fst, snd, defaultVolume) {
      var _ref, _ref1;
      HorizontalSplitter.__super__.constructor.call(this, core, fst, snd, defaultVolume);
      this.element.addClass('horizontal');
      this.fst.element.addClass('top');
      this.snd.element.addClass('bottom');
      if ((_ref = this.fst.curtain) != null) {
        _ref.css('pointer', 'raw-resize');
      }
      if ((_ref1 = this.snd.curtain) != null) {
        _ref1.css('pointer', 'raw-resize');
      }
    }

    HorizontalSplitter.prototype.mousemove = function(e) {
      var offset, value;
      offset = this.container.absoluteY() + this.container.contentY(true);
      value = e.pageY - offset;
      value = this.regulateValue(value);
      return this.value(value);
    };

    HorizontalSplitter.prototype.valueWidth = function() {
      return this.container.height();
    };

    HorizontalSplitter.prototype.minValue = function() {
      var m1, m2;
      m1 = this.fst.element.minHeight() + this.fst.element.nonContentHeight();
      m2 = this.snd.element.maxHeight() + this.snd.element.nonContentHeight();
      if (m2 != null) {
        m2 = this.valueWidth() - m2;
      }
      if ((m1 != null) && (m2 != null)) {
        return Math.min(m1, m2);
      }
      return m1 || m2 || 0;
    };

    HorizontalSplitter.prototype.maxValue = function() {
      var m1, m2, valueWidth;
      valueWidth = this.valueWidth();
      m1 = this.fst.element.maxHeight() + this.fst.element.nonContentHeight();
      m2 = this.snd.element.minHeight() + this.snd.element.nonContentHeight();
      if (m2 != null) {
        m2 = valueWidth - m2;
      }
      if ((m1 != null) && (m2 != null)) {
        return Math.max(m1, m2);
      }
      return m1 || m2 || valueWidth;
    };

    HorizontalSplitter.prototype.adjust = function() {
      var fstValue, sndValue, value, valueWidth;
      value = this.value();
      valueWidth = this.valueWidth();
      fstValue = value - this.fst.element.nonContentHeight(true);
      sndValue = (valueWidth - value) - this.snd.element.nonContentHeight(true);
      if (fstValue <= 0) {
        if (this.fst.element.is(':visible')) {
          this.fst.element.hide();
        }
        if (!this.snd.element.is(':visible')) {
          this.snd.element.show();
        }
        this.snd.element.outerHeight(true, valueWidth);
        this._value = value = 0;
      } else if (sndValue <= 0) {
        if (!this.fst.element.is(':visible')) {
          this.fst.element.show();
        }
        if (this.snd.element.is(':visible')) {
          this.snd.element.hide();
        }
        this.fst.element.outerHeight(true, valueWidth);
        this._value = value = valueWidth;
      } else {
        if (!this.fst.element.is(':visible')) {
          this.fst.element.show();
        }
        if (!this.snd.element.is(':visible')) {
          this.snd.element.show();
        }
        this.fst.element.height(fstValue);
        this.snd.element.height(sndValue);
      }
      this.fst.adjust();
      this.snd.adjust();
      this.element.relativeY(value - this.element.outerHeight() / 2);
      return this;
    };

    return HorizontalSplitter;

  })(Splitter);

  namespace('Jencil.ui.widgets.splitters', function(exports) {
    exports.Splitter = Splitter;
    exports.VerticalSplitter = VerticalSplitter;
    return exports.HorizontalSplitter = HorizontalSplitter;
  });

  BaseEditor = (function(_super) {

    __extends(BaseEditor, _super);

    function BaseEditor(core, selector, context) {
      if (selector == null) {
        selector = '<div>';
      }
      BaseEditor.__super__.constructor.call(this, core, selector, context);
      this.element.addClass('editor');
      this._changeCallbacks = [];
    }

    BaseEditor.prototype.val = function(value) {
      throw new Error("NotImplementedError");
    };

    BaseEditor.prototype.change = function(callback) {
      var _i, _len, _ref;
      if (callback != null) {
        this._changeCallbacks.push(callback);
        return this;
      }
      _ref = this._changeCallbacks;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        callback = _ref[_i];
        callback.call(this, this.val());
      }
      return this;
    };

    BaseEditor.prototype.h1 = null;

    BaseEditor.prototype.h2 = null;

    BaseEditor.prototype.h3 = null;

    BaseEditor.prototype.h4 = null;

    BaseEditor.prototype.h5 = null;

    BaseEditor.prototype.h6 = null;

    BaseEditor.prototype.bold = null;

    BaseEditor.prototype.italic = null;

    BaseEditor.prototype.underline = null;

    BaseEditor.prototype.strike = null;

    BaseEditor.prototype.superscript = null;

    BaseEditor.prototype.subscript = null;

    BaseEditor.prototype.anchor = null;

    BaseEditor.prototype.image = null;

    BaseEditor.prototype.unorderedList = null;

    BaseEditor.prototype.orderedList = null;

    return BaseEditor;

  })(Panel);

  TextEditor = (function(_super) {

    __extends(TextEditor, _super);

    function TextEditor(core, selector, context) {
      var _this = this;
      if (selector == null) {
        selector = '<div>';
      }
      TextEditor.__super__.constructor.call(this, core, selector, context);
      this.textarea = $('<textarea>').appendTo(this.element).css({
        'margin': '0',
        'padding': '0',
        'border': 'none',
        'outline': 'none',
        'resize': 'none'
      });
      this.textarea = evolute(this.textarea);
      this.textarea.on('keydown', function(e) {
        if (e.which !== 13) {
          return;
        }
        return _this.core.caretaker.save();
      });
      if (($.fn.tabby != null) && this.core.options.enableTabIndent) {
        this.textarea.tabby({
          'tabString': this.core.options.tabString
        });
      }
      this.textarea = autoIndentable(this.textarea);
      if (!this.core.options.enableAutoIndent) {
        this.textarea.autoIndent.disable();
      }
      this.textarea.on('keypress keyup click blur', function() {
        return _this.change();
      });
    }

    TextEditor.prototype.val = function(value) {
      if (value != null) {
        this.textarea.val(value);
        this.change();
        return this;
      }
      return this.textarea.val();
    };

    TextEditor.prototype.focus = function() {
      this.textarea.focus();
      return this;
    };

    TextEditor.prototype.createMemento = function() {
      return this.val();
    };

    TextEditor.prototype.setMemento = function(memento) {
      return this.val(memento);
    };

    TextEditor.prototype.adjust = function() {
      this.textarea.outerWidth(this.element.width());
      this.textarea.outerHeight(this.element.height());
      return this;
    };

    TextEditor.prototype.selection = function(str, keepSelection) {
      if (keepSelection == null) {
        keepSelection = true;
      }
      if (str != null) {
        this.textarea.selection.text(str, keepSelection);
        this.core.caretaker.save();
        return this.change();
      }
      return this.textarea.selection.text();
    };

    TextEditor.prototype.enclose = function(b, a, keepSelection) {
      var caret;
      if (keepSelection == null) {
        keepSelection = true;
      }
      caret = this.textarea.selection.caret();
      if (caret[0] === caret[1]) {
        this.textarea.selection.selectWholeCurrentLine();
      }
      this.textarea.selection.enclose(b, a, keepSelection);
      this.core.caretaker.save();
      return this.change();
    };

    TextEditor.prototype.insertBefore = function(str, keepSelection) {
      var caret;
      if (keepSelection == null) {
        keepSelection = true;
      }
      caret = this.textarea.selection.caret();
      if (caret[0] === caret[1]) {
        this.textarea.selection.selectWholeCurrentLine();
      }
      this.textarea.selection.insertBefore(str, keepSelection);
      this.core.caretaker.save();
      return this.change();
    };

    TextEditor.prototype.insertAfter = function(str, keepSelection) {
      var caret;
      if (keepSelection == null) {
        keepSelection = true;
      }
      caret = this.textarea.selection.caret();
      if (caret[0] === caret[1]) {
        this.textarea.selection.selectWholeCurrentLine();
      }
      this.textarea.selection.insertAfter(str, keepSelection);
      this.core.caretaker.save();
      return this.change();
    };

    return TextEditor;

  })(BaseEditor);

  namespace('Jencil.ui.widgets.editors', function(exports) {
    exports.BaseEditor = BaseEditor;
    return exports.TextEditor = TextEditor;
  });

  BaseViewer = (function(_super) {

    __extends(BaseViewer, _super);

    function BaseViewer(core, selector, context) {
      if (selector == null) {
        selector = '<div>';
      }
      BaseViewer.__super__.constructor.call(this, core, selector, context);
      this.element.addClass('viewer');
    }

    BaseViewer.prototype.update = function(value, force) {
      throw new Error("NotImplementedError");
    };

    return BaseViewer;

  })(Panel);

  TemplateViewer = (function(_super) {

    __extends(TemplateViewer, _super);

    function TemplateViewer(core) {
      TemplateViewer.__super__.constructor.call(this, core);
      this.templatePath = this.core.options.viewerTemplatePath;
      this.element.css({
        'position': 'relative'
      });
      this.curtain = curtainFactory(this.element);
      this.iframe = $('<iframe>').appendTo(this.element).css({
        margin: '0',
        padding: '0',
        border: 'none',
        outline: 'none',
        resize: 'none',
        width: '100%',
        height: '100%',
        overflow: 'visible'
      });
      this.iframe.attr('frameborder', 0);
      this.iframe = evolute(this.iframe);
      this.iframe.init = function() {
        var iframe;
        iframe = this.get(0);
        if (iframe.contentDocument != null) {
          this.document = iframe.contentDocument;
        } else {
          this.document = iframe.contentWindow.document;
        }
        return this.document.write('<body></body>');
      };
      this.iframe.write = function(value) {
        var scrollTop;
        if (this.document != null) {
          try {
            scrollTop = this.document.documentElement.scrollTop;
          } catch (e) {
            scrollTop = 0;
          }
          this.document.open();
          this.document.write(value);
          this.document.close();
          this.document.documentElement.scrollTop = scrollTop;
          this.width(this.document.scrollLeft);
          this.height(this.document.scrollTop);
          return true;
        }
        return false;
      };
      this.iframe.loadTemplate = function(templatePath, value) {
        var _this = this;
        return $.ajax({
          url: templatePath,
          success: function(data) {
            _this._template = data;
            return _this.write(value);
          }
        });
      };
    }

    TemplateViewer.prototype.init = function() {
      return this.iframe.init();
    };

    TemplateViewer.prototype.update = function(value, force) {
      if (this.iframe._template != null) {
        value = this.iframe._template.replace("{{content}}", value);
      } else if (this.templatePath != null) {
        this.iframe.loadTemplate(this.templatePath, value);
      }
      return this.iframe.write(value);
    };

    TemplateViewer.prototype.adjust = function() {
      this.iframe.outerWidth(this.element.width());
      this.iframe.outerHeight(this.element.height());
      return this;
    };

    return TemplateViewer;

  })(BaseViewer);

  AjaxViewer = (function(_super) {

    __extends(AjaxViewer, _super);

    function AjaxViewer(core, config) {
      this.config = config;
      AjaxViewer.__super__.constructor.call(this, core);
      this.config = jQuery.extend({
        type: 'GET',
        dataType: 'text',
        data: function(value) {
          return encodeURIComponent(value);
        },
        url: null
      }, this.config);
    }

    AjaxViewer.prototype.update = function(value, force) {
      var _this = this;
      if (this._valueCache !== value || force) {
        this._valueCache = value;
        return $.ajax({
          type: this.config.type,
          dataType: this.config.dataType,
          data: JSON.stringify(this.config.data(value)),
          url: this.config.url,
          success: function(value) {
            if (_this.iframe._template != null) {
              value = _this.iframe._template.replace("{{content}}", value);
            } else if (_this.templatePath != null) {
              _this.iframe.loadTemplate(_this.templatePath, value);
            }
            return _this.iframe.write(value);
          }
        });
      }
    };

    return AjaxViewer;

  })(TemplateViewer);

  namespace('Jencil.ui.widgets.viewers', function(exports) {
    exports.BaseViewer = BaseViewer;
    exports.TemplateViewer = TemplateViewer;
    return exports.AjaxViewer = AjaxViewer;
  });

  BaseHelper = (function(_super) {

    __extends(BaseHelper, _super);

    function BaseHelper(core, selector, context) {
      if (selector == null) {
        selector = '<div>';
      }
      BaseHelper.__super__.constructor.call(this, core, selector, context);
      this.element.addClass('helper');
    }

    return BaseHelper;

  })(Panel);

  TemplateHelper = (function(_super) {

    __extends(TemplateHelper, _super);

    function TemplateHelper(core) {
      TemplateHelper.__super__.constructor.call(this, core);
      this.templatePath = this.core.options.helperTemplatePath;
      this.element.css({
        'position': 'relative'
      });
      this.curtain = curtainFactory(this.element);
      this.iframe = $('<iframe>').appendTo(this.element).css({
        margin: '0',
        padding: '0',
        border: 'none',
        outline: 'none',
        resize: 'none',
        width: '100%',
        height: '100%',
        overflow: 'visible'
      });
      this.iframe.attr('frameborder', 0);
      this.iframe = evolute(this.iframe);
      this.iframe.init = function() {
        var iframe;
        iframe = this.get(0);
        if (iframe.contentDocument != null) {
          this.document = iframe.contentDocument;
        } else {
          this.document = iframe.contentWindow.document;
        }
        return this.document.write('<body></body>');
      };
      this.iframe.write = function(value) {
        var scrollTop;
        if (this.document != null) {
          try {
            scrollTop = this.document.documentElement.scrollTop;
          } catch (e) {
            scrollTop = 0;
          }
          this.document.open();
          this.document.write(value);
          this.document.close();
          this.document.documentElement.scrollTop = scrollTop;
          this.width(this.document.scrollLeft);
          this.height(this.document.scrollTop);
          return true;
        }
        return false;
      };
      this.iframe.loadTemplate = function(templatePath) {
        var _this = this;
        return $.ajax({
          url: templatePath,
          success: function(data) {
            return _this.write(data);
          }
        });
      };
    }

    TemplateHelper.prototype.init = function() {
      this.iframe.init();
      if (this.templatePath != null) {
        return this.iframe.loadTemplate(this.templatePath);
      }
    };

    TemplateHelper.prototype.adjust = function() {
      this.iframe.outerWidth(this.element.width());
      this.iframe.outerHeight(this.element.height());
      return this;
    };

    return TemplateHelper;

  })(BaseHelper);

  namespace('Jencil.ui.widgets.helpers', function(exports) {
    exports.BaseHelper = BaseHelper;
    return exports.TemplateHelper = TemplateHelper;
  });

  Separator = (function(_super) {

    __extends(Separator, _super);

    function Separator(core) {
      Separator.__super__.constructor.call(this, core, '<span>');
      this.element.addClass('separator');
    }

    return Separator;

  })(Widget);

  Button = (function(_super) {

    __extends(Button, _super);

    function Button(core, name, text, title) {
      this.name = name;
      this.text = text;
      this.title = title;
      Button.__super__.constructor.call(this, core, '<a>');
      this.text = this.text || this.name;
      this.title = this.title || this.text;
      this.element.addClass('button').addClass(name);
      this.element.append($("<span>" + this.text + "</span>"));
      this.element.attr('title', this.title);
    }

    Button.prototype.enable = function() {
      return this.element.removeClass('disable');
    };

    Button.prototype.disable = function() {
      return this.element.addClass('disable');
    };

    Button.prototype.validate = function() {
      return this;
    };

    return Button;

  })(Widget);

  ActionButton = (function(_super) {

    __extends(ActionButton, _super);

    function ActionButton(core, name, text, title, callback, shortcut) {
      var _this = this;
      this.shortcut = shortcut;
      ActionButton.__super__.constructor.call(this, core, name, text, title);
      this.callback = function() {
        if (!_this.element.hasClass('disable')) {
          return callback();
        }
      };
      this.callback.raw = callback;
      this.element.click(function() {
        return _this.callback();
      });
      if ((this.shortcut != null) && (window.shortcut != null)) {
        window.shortcut.add(this.shortcut, function(e) {
          return _this.callback();
        });
        this.element.attr('title', "" + this.title + " (" + this.shortcut + ")");
      }
    }

    return ActionButton;

  })(Button);

  CommandButton = (function(_super) {

    __extends(CommandButton, _super);

    function CommandButton(core, name, text, title, command, shortcut) {
      var callback;
      this.command = command;
      callback = function() {
        var editor;
        editor = core.editor();
        return editor[command].call(editor);
      };
      CommandButton.__super__.constructor.call(this, core, name, text, title, callback, shortcut);
    }

    CommandButton.prototype.init = function() {
      return this.validate();
    };

    CommandButton.prototype.validate = function() {
      var editor;
      editor = this.core.editor();
      if (!(editor[this.command] != null)) {
        this.disable();
      }
      return this;
    };

    CommandButton.factory = function(core, args) {
      var command, name, shortcut, text, title;
      name = text = title = command = shortcut = null;
      switch (args.length) {
        case 5:
          name = args[0];
          text = args[1];
          title = args[2];
          command = args[3];
          shortcut = args[4];
          break;
        case 4:
          name = args[0];
          text = title = args[1];
          command = args[2];
          shortcut = args[3];
          break;
        case 3:
          name = command = args[0];
          text = title = args[1];
          shortcut = args[2];
          break;
        case 2:
          name = command = args[0];
          text = title = args[1];
          shortcut = null;
          break;
        case 1:
          name = command = text = title = args[0];
          shortcut = null;
      }
      return new CommandButton(core, name, text, title, command, shortcut);
    };

    return CommandButton;

  })(ActionButton);

  UndoButton = (function(_super) {

    __extends(UndoButton, _super);

    function UndoButton(core) {
      var callback,
        _this = this;
      callback = function(e) {
        return _this.core.caretaker.undo();
      };
      UndoButton.__super__.constructor.call(this, core, 'undo', 'Undo', 'Undo', callback, 'Ctrl+Z');
    }

    UndoButton.prototype.init = function() {
      var check,
        _this = this;
      check = function() {
        if (!_this.core.caretaker.canUndo()) {
          _this.disable();
        } else {
          _this.enable();
        }
        return setTimeout(check, 100);
      };
      return check();
    };

    return UndoButton;

  })(ActionButton);

  RedoButton = (function(_super) {

    __extends(RedoButton, _super);

    function RedoButton(core) {
      var callback,
        _this = this;
      callback = function(e) {
        return _this.core.caretaker.redo();
      };
      RedoButton.__super__.constructor.call(this, core, 'redo', 'Redo', 'Redo', callback, 'Ctrl+Shift+Z');
    }

    RedoButton.prototype.init = function() {
      var check,
        _this = this;
      check = function() {
        if (!_this.core.caretaker.canRedo()) {
          _this.disable();
        } else {
          _this.enable();
        }
        return setTimeout(check, 100);
      };
      return check();
    };

    return RedoButton;

  })(ActionButton);

  FullscreenButton = (function(_super) {

    __extends(FullscreenButton, _super);

    function FullscreenButton(core) {
      var callback,
        _this = this;
      callback = function(e) {
        return _this.core.fullscreen.toggle();
      };
      FullscreenButton.__super__.constructor.call(this, core, 'fullscreen', 'Toggle fullscreen', 'Fullscreen', callback, 'Ctrl+F');
    }

    FullscreenButton.prototype.init = function() {
      var check,
        _this = this;
      check = function() {
        if (_this.core.fullscreen.element.is(':visible')) {
          _this.element.addClass('hide');
        } else {
          _this.element.removeClass('hide');
        }
        return setTimeout(check, 100);
      };
      return check();
    };

    return FullscreenButton;

  })(ActionButton);

  ViewerButton = (function(_super) {

    __extends(ViewerButton, _super);

    function ViewerButton(core) {
      var callback,
        _this = this;
      callback = function(e) {
        return _this.core.viewer().toggle();
      };
      ViewerButton.__super__.constructor.call(this, core, 'viewer', 'Toggle viewer', 'Viewer', callback, 'Ctrl+Q');
    }

    ViewerButton.prototype.validate = function() {
      if (!this.core.viewer()) {
        this.disable();
        return false;
      }
      return true;
    };

    ViewerButton.prototype.init = function() {
      var check,
        _this = this;
      if (!this.validate()) {
        return;
      }
      check = function() {
        if (_this.core.viewer().element.is(':visible')) {
          _this.element.addClass('hide');
        } else {
          _this.element.removeClass('hide');
        }
        return setTimeout(check, 100);
      };
      return check();
    };

    return ViewerButton;

  })(ActionButton);

  HelperButton = (function(_super) {

    __extends(HelperButton, _super);

    function HelperButton(core) {
      var callback,
        _this = this;
      callback = function(e) {
        return _this.core.helper().toggle();
      };
      HelperButton.__super__.constructor.call(this, core, 'helper', 'Toggle helper', 'Helper', callback, 'Ctrl+H');
    }

    HelperButton.prototype.validate = function() {
      if (!this.core.helper()) {
        this.disable();
        return false;
      }
      return true;
    };

    HelperButton.prototype.init = function() {
      var check,
        _this = this;
      if (!this.validate()) {
        return;
      }
      check = function() {
        if (_this.core.helper().element.is(':visible')) {
          _this.element.addClass('hide');
        } else {
          _this.element.removeClass('hide');
        }
        return setTimeout(check, 100);
      };
      return check();
    };

    return HelperButton;

  })(ActionButton);

  buttonFactory = function(core, value) {
    if (value instanceof Array) {
      return CommandButton.factory(core, value);
    }
    if (typeof value === 'string') {
      switch (value) {
        case 'Separator':
          return new Separator(core);
        case 'Undo':
          return new UndoButton(core);
        case 'Redo':
          return new RedoButton(core);
        case 'Fullscreen':
          return new FullscreenButton(core);
        case 'Viewer':
          return new ViewerButton(core);
        case 'Helper':
          return new HelperButton(core);
        default:
          throw new Exception("" + value + " is not known Button type");
      }
    }
    return new value(core);
  };

  namespace('Jencil.ui.widgets.buttons', function(exports) {
    exports.Separator = Separator;
    exports.Button = Button;
    exports.ActionButton = ActionButton;
    exports.CommandButton = CommandButton;
    exports.UndoButton = UndoButton;
    exports.RedoButton = RedoButton;
    exports.FullscreenButton = FullscreenButton;
    exports.ViewerButton = ViewerButton;
    return exports.HelperButton = HelperButton;
  });

  Wrapper = (function(_super) {

    __extends(Wrapper, _super);

    function Wrapper(core, width, height) {
      Wrapper.__super__.constructor.call(this, core);
      this.element.addClass('jencil wrapper');
      this.element.width(width);
      this.element.height(height);
      this.workspace = new Workspace(this.core);
      this.workspace.element.appendTo(this.element);
    }

    Wrapper.prototype.init = function() {
      var _this = this;
      if ((this.element.resizable != null) && this.core.options.resizable === true) {
        this.element.resizable({
          start: function() {
            var _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
            if ((_ref = _this.core.editor()) != null) {
              if ((_ref1 = _ref.curtain) != null) {
                _ref1.on();
              }
            }
            if ((_ref2 = _this.core.viewer()) != null) {
              if ((_ref3 = _ref2.curtain) != null) {
                _ref3.on();
              }
            }
            return (_ref4 = _this.core.helper()) != null ? (_ref5 = _ref4.curtain) != null ? _ref5.on() : void 0 : void 0;
          },
          resize: function() {
            var _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
            if ((_ref = _this.core.editor()) != null) {
              if ((_ref1 = _ref.curtain) != null) {
                _ref1.refresh();
              }
            }
            if ((_ref2 = _this.core.viewer()) != null) {
              if ((_ref3 = _ref2.curtain) != null) {
                _ref3.refresh();
              }
            }
            if ((_ref4 = _this.core.helper()) != null) {
              if ((_ref5 = _ref4.curtain) != null) {
                _ref5.refresh();
              }
            }
            return _this.adjust();
          },
          stop: function() {
            var _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
            if ((_ref = _this.core.editor()) != null) {
              if ((_ref1 = _ref.curtain) != null) {
                _ref1.off();
              }
            }
            if ((_ref2 = _this.core.viewer()) != null) {
              if ((_ref3 = _ref2.curtain) != null) {
                _ref3.off();
              }
            }
            if ((_ref4 = _this.core.helper()) != null) {
              if ((_ref5 = _ref4.curtain) != null) {
                _ref5.off();
              }
            }
            return _this.adjust();
          }
        });
      }
      return this.workspace.init();
    };

    Wrapper.prototype.adjust = function() {
      this.workspace.element.outerWidth(true, this.element.width());
      this.workspace.element.outerHeight(true, this.element.height());
      this.workspace.adjust();
      return this;
    };

    return Wrapper;

  })(Panel);

  Workspace = (function(_super) {

    __extends(Workspace, _super);

    function Workspace(core) {
      Workspace.__super__.constructor.call(this, core);
      this.element.addClass('workspace');
      this.profile(new core.options.profile(this.core.options));
    }

    Workspace.prototype.profile = function(profile) {
      var button, _i, _j, _len, _len1, _ref, _ref1,
        _this = this;
      if (profile != null) {
        this.element.empty();
        this.mainPanel = new profile.mainPanelClass(this.core, profile);
        this.mainPanel.editorPanel.change(function(value) {
          return _this.core.element.val(value);
        });
        this.toolbar = new Toolbar(this.core);
        _ref = profile.toolbarButtons;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          button = _ref[_i];
          button = buttonFactory(this.core, button);
          this.toolbar.addButton(button);
        }
        this.statusbar = new Statusbar(this.core);
        _ref1 = profile.statusbarButtons;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          button = _ref1[_j];
          button = buttonFactory(this.core, button);
          this.statusbar.addButton(button);
        }
        this.element.append(this.toolbar.element);
        this.element.append(this.mainPanel.element);
        this.element.append(this.statusbar.element);
        this._profile = profile;
        return this;
      }
      return this._profile;
    };

    Workspace.prototype.init = function() {
      this.toolbar.init();
      this.statusbar.init();
      return this.mainPanel.init();
    };

    Workspace.prototype.adjust = function() {
      var offset1, offset2;
      this.toolbar.element.outerWidth(true, this.element.width());
      this.statusbar.element.outerWidth(true, this.element.width());
      this.mainPanel.element.outerWidth(true, this.element.width());
      this.mainPanel.element.outerHeight(true, this.element.height());
      this.mainPanel.adjust();
      offset1 = this.toolbar.element.outerHeight(true);
      offset2 = this.statusbar.element.outerHeight(true);
      this.mainPanel.element.outerHeight(true, this.element.height() - (offset1 + offset2));
      this.toolbar.adjust();
      this.statusbar.adjust();
      this.mainPanel.adjust();
      return this;
    };

    Workspace.prototype.update = function(force) {
      if (this.mainPanel.editorPanel && this.mainPanel.viewerPanel) {
        return this.mainPanel.viewerPanel.update(this.mainPanel.editorPanel.val(), force);
      }
    };

    return Workspace;

  })(Panel);

  Bar = (function(_super) {

    __extends(Bar, _super);

    function Bar(core) {
      Bar.__super__.constructor.call(this, core);
      this._buttons = [];
    }

    Bar.prototype.init = function() {
      var button, _i, _len, _ref;
      _ref = this._buttons;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        button = _ref[_i];
        button.init();
      }
      return this;
    };

    Bar.prototype.addButton = function(button) {
      this._buttons.push(button);
      return this.element.append(button.element);
    };

    return Bar;

  })(Panel);

  Toolbar = (function(_super) {

    __extends(Toolbar, _super);

    function Toolbar(core) {
      Toolbar.__super__.constructor.call(this, core);
      this.element.addClass('toolbar');
    }

    return Toolbar;

  })(Bar);

  Statusbar = (function(_super) {

    __extends(Statusbar, _super);

    function Statusbar(core) {
      Statusbar.__super__.constructor.call(this, core);
      this.element.addClass('statusbar');
    }

    return Statusbar;

  })(Bar);

  MonomainPanel = (function() {

    function MonomainPanel(core, profile) {
      var editorPanel;
      editorPanel = new profile.editorClass(core);
      editorPanel.element.addClass('mainPanel');
      return editorPanel;
    }

    return MonomainPanel;

  })();

  DimainPanel = (function(_super) {

    __extends(DimainPanel, _super);

    function DimainPanel(core, profile) {
      var _this = this;
      this.editorPanel = new profile.editorClass(core);
      this.viewerPanel = new profile.viewerClass(core);
      DimainPanel.__super__.constructor.call(this, core, this.editorPanel, this.viewerPanel, profile.defaultVolume);
      this.element.addClass('mainPanel');
      this.editorPanel.change(function(value) {
        return _this.viewerPanel.update(value);
      });
    }

    return DimainPanel;

  })(VerticalPanel);

  TrimainPanel = (function(_super) {

    __extends(TrimainPanel, _super);

    function TrimainPanel(core, profile) {
      var _this = this;
      this.editorPanel = new profile.editorClass(core);
      this.viewerPanel = new profile.viewerClass(core);
      this.helperPanel = new profile.helperClass(core);
      this.verticalPanel = new VerticalPanel(core, this.editorPanel, this.viewerPanel, profile.defaultVolume);
      TrimainPanel.__super__.constructor.call(this, core, this.verticalPanel, this.helperPanel, profile.defaultVolume2);
      this.element.addClass('mainPanel');
      this.editorPanel.change(function(value) {
        return _this.viewerPanel.update(value);
      });
    }

    return TrimainPanel;

  })(HorizontalPanel);

  namespace('Jencil.ui.widgets.panels', function(exports) {
    exports.MonomainPanel = MonomainPanel;
    exports.DimainPanel = DimainPanel;
    return exports.TrimainPanel = TrimainPanel;
  });

  Fullscreen = (function(_super) {

    __extends(Fullscreen, _super);

    function Fullscreen(core) {
      var _this = this;
      Fullscreen.__super__.constructor.call(this, core);
      this.element.addClass('fullscreen');
      this.element.css({
        'position': 'fixed',
        'top': '0',
        'left': '0',
        'width': '100%',
        'height': '100%'
      });
      this.curtain = $('<div>').addClass('curtain');
      this.curtain.css({
        'position': 'absolute',
        'top': '0',
        'left': '0',
        'width': '100%',
        'height': '100%',
        'background': 'black',
        'opacity': '0.6',
        'cursor': 'pointer'
      });
      this.cell = $('<div>').css({
        'position': 'absolute',
        'top': '5%',
        'left': '5%',
        'width': '90%',
        'height': '90%'
      });
      if ($.browser.msie && $.browser.version < 7) {
        this.element.css('position', 'absolute');
        $(window).scroll(function() {
          return _this.element.css('top', $(document).scrollTop());
        });
      }
      this.curtain.click(function() {
        return _this.off();
      });
      this.element.append(this.curtain);
      this.element.append(this.cell);
      this.element.hide();
      this.resize = function() {
        return _this.core.wrapper.adjust();
      };
    }

    Fullscreen.prototype.on = function() {
      var ratio,
        _this = this;
      ratio = 9.0 / 10;
      this.cell.append(this.core.wrapper.element);
      this.core.wrapper.element.outerWidth(true, this.element.width() * ratio);
      this.core.wrapper.element.outerHeight(true, this.element.height() * ratio);
      this.core.wrapper.init();
      this.core.wrapper.adjust();
      this.core.wrapper.workspace.update(true);
      this.element.fadeIn('fast', function() {
        _this.core.wrapper.element.css('width', "100%");
        _this.core.wrapper.element.css('height', "100%");
        return _this.core.wrapper.adjust();
      });
      return $(window).on('resize', this.resize);
    };

    Fullscreen.prototype.off = function() {
      this.core.element.after(this.core.wrapper.element);
      this.core.wrapper.element.css('width', "");
      this.core.wrapper.element.css('height', "");
      this.core.wrapper.init();
      this.core.wrapper.adjust();
      this.core.wrapper.workspace.update(true);
      this.element.fadeOut('fast');
      return $(window).unbind('resize', this.resize);
    };

    Fullscreen.prototype.toggle = function(callbackOn, callbackOff) {
      if (this.element.is(':visible')) {
        this.off();
        return typeof callbackOff === "function" ? callbackOff() : void 0;
      } else {
        this.on();
        return typeof callbackOn === "function" ? callbackOn() : void 0;
      }
    };

    return Fullscreen;

  })(Panel);

  autoIndentableHtml = (function() {
    var PATTERNS, post, pre, x;
    PATTERNS = (function() {
      var _i, _len, _ref, _results;
      _ref = ['p', 'li'];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        x = _ref[_i];
        _results.push([x, new RegExp("^[\s\t]*<" + x + ">"), new RegExp("</" + x + ">[\s\t]*$")]);
      }
      return _results;
    })();
    pre = function(e, line) {
      var lineCaret, pattern, _i, _len;
      console.log("@", this);
      if (e.shiftKey) {
        return;
      }
      for (_i = 0, _len = PATTERNS.length; _i < _len; _i++) {
        pattern = PATTERNS[_i];
        if (pattern[1].test(line) || pattern[2].test(line)) {
          lineCaret = this.selection._getLineCaret();
          this.selection.caret(lineCaret[1]);
          return;
        }
      }
    };
    post = function(e, line, indent, insert) {
      var pattern, _i, _len;
      if (e.shiftKey) {
        return;
      }
      for (_i = 0, _len = PATTERNS.length; _i < _len; _i++) {
        pattern = PATTERNS[_i];
        if (pattern[2].test(line)) {
          x = pattern[0];
          this.selection.insertAfter("<" + x + "></" + x + ">", false);
          this.selection.caretOffset(-(3 + x.length));
          return;
        }
      }
    };
    return function(textarea) {
      if (!(textarea.autoIndent != null)) {
        textarea = autoIndentable(textarea);
      }
      textarea.autoIndent.pre = function(e, line) {
        return pre.call(textarea, e, line);
      };
      textarea.autoIndent.post = function(e, line, indent, insert) {
        return post.call(textarea, e, line, indent, insert);
      };
      return textarea;
    };
  })();

  headerMarkup = (function() {
    var PATTERN;
    PATTERN = new RegExp("^<h([1-6])>(.*)</h[1-6]>\n?$");
    return function(n) {
      var caret, replacement, text;
      caret = this.textarea.selection.caret();
      if (caret[0] === caret[1]) {
        this.textarea.selection.selectWholeCurrentLine();
      }
      text = this.selection();
      if (PATTERN.test(text)) {
        if (RegExp.$1 === n.toString()) {
          replacement = RegExp.$2;
        } else {
          replacement = "<h" + n + ">" + RegExp.$2 + "</h" + n + ">";
        }
        return this.selection(replacement);
      } else {
        return this.enclose("<h" + n + ">", "</h" + n + ">\n");
      }
    };
  })();

  HtmlEditor = (function(_super) {

    __extends(HtmlEditor, _super);

    function HtmlEditor(core) {
      HtmlEditor.__super__.constructor.call(this, core);
      this.textarea = autoIndentableHtml(this.textarea);
    }

    HtmlEditor.prototype.h1 = function() {
      return headerMarkup.call(this, 1);
    };

    HtmlEditor.prototype.h2 = function() {
      return headerMarkup.call(this, 2);
    };

    HtmlEditor.prototype.h3 = function() {
      return headerMarkup.call(this, 3);
    };

    HtmlEditor.prototype.h4 = function() {
      return headerMarkup.call(this, 4);
    };

    HtmlEditor.prototype.h5 = function() {
      return headerMarkup.call(this, 5);
    };

    HtmlEditor.prototype.h6 = function() {
      return headerMarkup.call(this, 6);
    };

    HtmlEditor.prototype.bold = function() {
      return this.enclose("<b>", "</b>");
    };

    HtmlEditor.prototype.italic = function() {
      return this.enclose("<i>", "</i>");
    };

    HtmlEditor.prototype.underline = function() {
      return this.enclose("<u>", "</u>");
    };

    HtmlEditor.prototype.strike = function() {
      return this.enclose("<s>", "</s>");
    };

    HtmlEditor.prototype.superscript = function() {
      return this.enclose("<sup>", "</sup>");
    };

    HtmlEditor.prototype.subscript = function() {
      return this.enclose("<sub>", "</sub>");
    };

    HtmlEditor.prototype.quote = function() {
      return this.enclose("<q>", "</q>");
    };

    HtmlEditor.prototype.blockquote = function() {
      return this.enclose("\n<blockquote>", "</blockquote>\n");
    };

    HtmlEditor.prototype.code = function() {
      return this.enclose("<code>", "</code>");
    };

    HtmlEditor.prototype.pre = function() {
      return this.enclose("<pre>", "</pre>");
    };

    HtmlEditor.prototype.anchorLink = function() {
      var href, text;
      text = this.selection();
      if (!text) {
        text = window.prompt("Please input a link text", "Here");
      }
      href = window.prompt("Please input a link url", "http://");
      if (!(href != null)) {
        return;
      }
      return this.selection("<a href='" + href + "'>" + text + "</a>");
    };

    HtmlEditor.prototype.image = function() {
      var alt, src;
      src = window.prompt("Please input a image url", "http://");
      alt = window.prompt("(Optional) Please input a alt message", "Image");
      if (!(src != null)) {
        return;
      }
      return this.selection("<img src='" + src + "' alt='" + alt + "'>");
    };

    HtmlEditor.prototype.unorderedList = function() {
      var text, x;
      text = this.selection();
      text = (function() {
        var _i, _len, _ref, _results;
        _ref = text.split("\n");
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          x = _ref[_i];
          _results.push("  <li>" + x + "</li>");
        }
        return _results;
      })();
      text.unshift("<ul>");
      text.push("</ul>");
      return this.selection(text.join("\n"));
    };

    HtmlEditor.prototype.orderedList = function() {
      var text, x;
      text = this.selection();
      text = (function() {
        var _i, _len, _ref, _results;
        _ref = text.split("\n");
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          x = _ref[_i];
          _results.push("  <li>" + x + "</li>");
        }
        return _results;
      })();
      text.unshift("<ol>");
      text.push("</ol>");
      return this.selection(text.join("\n"));
    };

    return HtmlEditor;

  })(Jencil.ui.widgets.editors.TextEditor);

  Jencil.utils.namespace('Jencil.ui.widgets.editors', function(exports) {
    return exports.HtmlEditor = HtmlEditor;
  });

  HtmlViewer = Jencil.ui.widgets.viewers.TemplateViewer;

  Jencil.utils.namespace('Jencil.ui.widgets.viewers', function(exports) {
    return exports.HtmlViewer = HtmlViewer;
  });

  HTML_HELPER_HTML = "<h1>Keyboard shortcut</h1>\n<p><span class=\"key\">Ctrl+Z</span>Undo<p>\n<p><span class=\"key\">Ctrl+Shift+Z</span>Redo<p>\n<p><span class=\"key\">Ctrl+B</span>Make selected text property as <b>Bold</b><p>\n<p><span class=\"key\">Ctrl+I</span>Make selected text property as <i>Italic</i><p>\n<p><span class=\"key\">Ctrl+U</span>Underline selected text like <u>Underline</u><p>\n<p><span class=\"key\">Ctrl+F</span>Toggle fullscreen mode<p>\n<p><span class=\"key\">Ctrl+Q</span>Toggle quick viewer panel<p>\n<p><span class=\"key\">Ctrl+H</span>Toggle help panel<p>";

  HtmlHelper = (function(_super) {

    __extends(HtmlHelper, _super);

    function HtmlHelper(core) {
      HtmlHelper.__super__.constructor.call(this, core);
      this.element.html(HTML_HELPER_HTML);
    }

    return HtmlHelper;

  })(Jencil.ui.widgets.helpers.BaseHelper);

  namespace('Jencil.ui.widgets.helpers', function(exports) {
    return exports.HtmlHelper = HtmlHelper;
  });

  HtmlProfile = (function(_super) {

    __extends(HtmlProfile, _super);

    function HtmlProfile(options) {
      this.mainPanelClass = Jencil.ui.widgets.panels.TrimainPanel;
      this.editorClass = HtmlEditor;
      this.viewerClass = HtmlViewer;
      this.helperClass = HtmlHelper;
      this.defaultVolume = options.defaultVolume || 1;
      this.defaultVolume2 = options.defaultVolume2 || 1;
      this.toolbarButtons = ['Undo', 'Redo', 'Separator', ['h1', 'H1'], ['h2', 'H2'], ['h3', 'H3'], ['h4', 'H4'], ['h5', 'H5'], ['h6', 'H6'], 'Separator', ['bold', 'Bold', 'Ctrl+B'], ['italic', 'Italic', 'Ctrl+I'], ['underline', 'Underline', 'Ctrl+U'], ['strike', 'Strikeout'], ['superscript', 'Superscript'], ['subscript', 'Subscript'], 'Separator', ['anchorLink', 'Anchor link'], ['image', 'Image'], ['unorderedList', 'Unordered list'], ['orderedList', 'Ordered list'], ['quote', 'Quote'], ['blockquote', 'Blockquote'], ['code', 'Code'], ['pre', 'Pre'], 'Separator', 'Fullscreen'];
      this.statusbarButtons = ['Viewer', 'Helper'];
    }

    return HtmlProfile;

  })(Jencil.profiles.Profile);

  Jencil.utils.namespace('Jencil.profiles', function(exports) {
    return exports.HtmlProfile = HtmlProfile;
  });

}).call(this);