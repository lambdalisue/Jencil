
jQuery.prototype._outerWidth = jQuery.prototype.outerWidth;

jQuery.prototype.outerWidth = function(includeMargin, value) {
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

jQuery.prototype._outerHeight = jQuery.prototype.outerHeight;

jQuery.prototype.outerHeight = function(includeMargin, value) {
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

jQuery.prototype.nonContentWidth = function(includeMargin) {
  if (includeMargin == null) {
    includeMargin = false;
  }
  return this._outerWidth(includeMargin) - this.width();
};

jQuery.prototype.nonContentHeight = function(includeMargin) {
  if (includeMargin == null) {
    includeMargin = false;
  }
  return this._outerHeight(includeMargin) - this.height();
};

jQuery.prototype.ncss = function(propertyName, defaultValue) {
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

jQuery.prototype.minWidth = function() {
  return this.ncss('min-width');
};

jQuery.prototype.minHeight = function() {
  return this.ncss('min-height');
};

jQuery.prototype.maxWidth = function() {
  return this.ncss('max-width');
};

jQuery.prototype.maxHeight = function() {
  return this.ncss('max-height');
};

jQuery.prototype.contentX = function(includeMargin) {
  var borderLeft, marginLeft, paddingLeft;
  if (includeMargin == null) {
    includeMargin = false;
  }
  marginLeft = includeMargin ? this.ncss('margin-left') : 0;
  borderLeft = this.ncss('border-left-width');
  paddingLeft = this.ncss('padding-left');
  return marginLeft + borderLeft + paddingLeft;
};

jQuery.prototype.contentY = function(includeMargin) {
  var borderTop, marginTop, paddingTop;
  if (includeMargin == null) {
    includeMargin = false;
  }
  marginTop = includeMargin ? this.ncss('margin-top') : 0;
  borderTop = this.ncss('border-top-width');
  paddingTop = this.ncss('padding-top');
  return marginTop + borderTop + paddingTop;
};

jQuery.prototype.absoluteX = function(value) {
  var offset;
  offset = this.offset();
  if (value != null) {
    offset.left = value;
    return this.offset(offset);
  }
  return offset.left;
};

jQuery.prototype.absoluteY = function(value) {
  var offset;
  offset = this.offset();
  if (value != null) {
    offset.top = value;
    return this.offset(offset);
  }
  return offset.top;
};

jQuery.prototype.relativeX = function(includeMargin, value) {
  var offset, parent;
  if (includeMargin == null) {
    includeMargin = false;
  }
  if (typeof includeMargin === 'number') {
    value = includeMargin;
    includeMargin = false;
  }
  parent = this.parent();
  offset = parent.absoluteX() + parent.contentX(includeMargin);
  if (value != null) {
    return this.absoluteX(value + offset);
  }
  return this.absoluteX() - offset;
};

jQuery.prototype.relativeY = function(includeMargin, value) {
  var offset, parent;
  if (includeMargin == null) {
    includeMargin = false;
  }
  if (typeof includeMargin === 'number') {
    value = includeMargin;
    includeMargin = false;
  }
  parent = this.parent();
  offset = parent.absoluteY() + parent.contentY(includeMargin);
  if (value != null) {
    return this.absoluteY(value + offset);
  }
  return this.absoluteY() - offset;
};

var Caretaker, Command, DummyCommand, Originator,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Command = (function() {

  function Command(receiver, callback) {
    var _this = this;
    this._receiver = receiver;
    this._callback = callback || function() {
      return _this.callback();
    };
  }

  Command.prototype.callback = function() {
    throw "NotImplementedError";
  };

  Command.prototype.getReceiver = function() {
    return this._receiver;
  };

  Command.prototype.getCallback = function() {
    return this._callback;
  };

  Command.prototype.invoke = function() {
    var callback, receiver;
    receiver = this.getReceiver();
    callback = this.getCallback();
    this._prev = receiver.createMemento();
    callback.call(receiver);
    return this._next = receiver.createMemento();
  };

  Command.prototype.undo = function() {
    var receiver;
    receiver = this.getReceiver();
    return receiver.setMemento(this._prev);
  };

  Command.prototype.redo = function() {
    var receiver;
    receiver = this.getReceiver();
    return receiver.setMemento(this._next);
  };

  return Command;

})();

DummyCommand = (function(_super) {

  __extends(DummyCommand, _super);

  function DummyCommand(receiver) {
    DummyCommand.__super__.constructor.call(this, receiver, function() {
      return this;
    });
  }

  return DummyCommand;

})(Command);

Originator = (function() {

  function Originator() {}

  Originator.prototype.createMemento = function() {
    throw "NotImplementedError";
  };

  Originator.prototype.setMemento = function(memento) {
    throw "NotImplementedError";
  };

  return Originator;

})();

Caretaker = (function() {

  function Caretaker() {
    this._undoStack = [];
    this._redoStack = [];
  }

  Caretaker.prototype.invoke = function(command) {
    command.invoke();
    this._redoStack = [];
    return this._undoStack.push(command);
  };

  Caretaker.prototype.undo = function() {
    var command;
    if (!this.canUndo()) {
      return false;
    }
    command = this._undoStack.pop();
    command.undo();
    this._redoStack.push(command);
    return true;
  };

  Caretaker.prototype.redo = function() {
    var command;
    if (!this.canRedo()) {
      return false;
    }
    command = this._redoStack.pop();
    command.redo();
    this._undoStack.push(command);
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

var Selection, Textarea;

Selection = (function() {

  function Selection(document, element) {
    this.document = document;
    this.element = element;
    this;

  }

  Selection.prototype._getCaret = function() {
    var clone, e, range, s;
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
    return [s, e];
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
    if ((start != null) && (end != null)) {
      return this._setCaret(start, end);
    }
    return this._getCaret();
  };

  Selection.prototype.text = function() {
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

  Selection.prototype.replace = function(str, start, end) {
    var a, b, range, scrollTop;
    scrollTop = this.element.scrollTop;
    if (this.document.selection) {
      this.element.focus();
      range = document.selection.createRange();
      range.text = str;
      range.select();
    } else if (this.element.setSelectionRange) {
      b = this.element.value.substring(0, start);
      a = this.element.value.substring(end);
      this.element.value = b + str + a;
    }
    this.element.scrollTop = scrollTop;
    return this;
  };

  Selection.prototype.replaceSelection = function(str, keepSelection) {
    var e, s, scrollTop, _ref;
    scrollTop = this.element.scrollTop;
    _ref = this.caret(), s = _ref[0], e = _ref[1];
    this.replace(str, s, e);
    e = s + str.length;
    if (!keepSelection) {
      s = e;
    }
    this.caret(s, e);
    this.element.focus();
    this.element.scrollTop = scrollTop;
    return this;
  };

  Selection.prototype.insertBeforeSelection = function(str, keepSelection) {
    var e, s, scrollTop, text, _ref;
    scrollTop = this.element.scrollTop;
    _ref = this.caret(), s = _ref[0], e = _ref[1];
    text = this.text();
    this.replace(str + text, s, e);
    e = s + str.length;
    if (!keepSelection) {
      s = e;
    }
    this.caret(s, e);
    this.element.focus();
    this.element.scrollTop = scrollTop;
    return this;
  };

  Selection.prototype.insertAfterSelection = function(str, keepSelection) {
    var e, s, scrollTop, text, _ref;
    scrollTop = this.element.scrollTop;
    _ref = this.caret(), s = _ref[0], e = _ref[1];
    text = this.text();
    this.replace(text + str, s, e);
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

  Selection.prototype.wrapSelection = function(b, a, keepSelection) {
    var e, s, scrollTop, str, text, _ref;
    scrollTop = this.element.scrollTop;
    text = this.text();
    if (text.indexOf(b) === 0 && text.lastIndexOf(a) === (text.length - a.length)) {
      str = text.substring(b.length, text.length - a.length);
      this.replaceSelection(str, keepSelection);
    } else {
      _ref = this.caret(), s = _ref[0], e = _ref[1];
      this.replace(b + text + a, s, e);
      e = s + b.length + text.length + a.length;
      if (!keepSelection) {
        s = e;
      }
      this.caret(s, e);
    }
    this.element.focus();
    this.element.scrollTop = scrollTop;
    return this;
  };

  return Selection;

})();

Textarea = (function() {

  function Textarea(document, element) {
    this.document = document;
    this.element = element;
    this.selection = new Selection(this.document, this.element);
  }

  Textarea.prototype.val = function(value) {
    if (value != null) {
      this.element.value = value;
      return this;
    }
    return this.element.value;
  };

  return Textarea;

})();

if (typeof exports !== "undefined" && exports !== null) {
  exports.Selection = Selection;
}

if (typeof exports !== "undefined" && exports !== null) {
  exports.Textarea = Textarea;
}

var animate;

animate = function(options) {
  /*
    Animate using easing function
  */

  var difference, startTime, step;
  options = $.extend({
    start: 0,
    end: 100,
    duration: 1000,
    callback: null,
    easing: null
  }, options);
  startTime = animate.now();
  difference = options.end - options.start;
  options.easing = options.easing || animate.easings["default"];
  step = function() {
    var epoch, x;
    epoch = animate.now() - startTime;
    x = options.easing(epoch, 0, 1, options.duration);
    x = x * difference + options.start;
    options.callback(x, epoch);
    if (epoch < options.duration) {
      return setTimeout(step, 1);
    } else {
      return options.callback(options.end, options.duration);
    }
  };
  step();
  return null;
};

animate.now = function() {
  return (new Date()).getTime();
};

animate.easings = {
  "default": function(t, start, end, duration) {
    return jQuery.easing.swing(t / duration, t, start, end, duration);
  }
};

if (typeof exports !== "undefined" && exports !== null) {
  exports.animate = animate;
}

var JencilCore;

JencilCore = (function() {

  function JencilCore(textarea) {
    var _this = this;
    this.caretaker = new Caretaker();
    this.profile = new MarkdownProfile();
    this.element = textarea;
    this.element.hide();
    this.fullscreen = new Fullscreen(this);
    this.wrapper = new Wrapper(this);
    this.element.after(this.fullscreen.element);
    this.element.after(this.wrapper.element);
    this.update(function(value) {
      return _this.element.val(value);
    });
    $(window).resize(function() {
      return _this.adjust();
    });
    this.init().adjust();
  }

  JencilCore.prototype.setProfile = function(profile) {
    return this.wrapper.workspace.reconstructor(profile);
  };

  JencilCore.prototype.getEditor = function() {
    return this.wrapper.workspace.editorPanel;
  };

  JencilCore.prototype.getViewer = function() {
    return this.wrapper.workspace.viewerPanel;
  };

  JencilCore.prototype.init = function() {
    this.wrapper.init();
    return this;
  };

  JencilCore.prototype.adjust = function() {
    this.wrapper.adjust();
    return this;
  };

  JencilCore.prototype.focus = function() {
    this.getEditor().focus();
    return this;
  };

  JencilCore.prototype.update = function(callback) {
    var editor;
    editor = this.getEditor();
    if (callback != null) {
      editor.update(callback);
      return this;
    }
    this.editor.update();
    return this;
  };

  JencilCore.prototype.options = {
    defaultSplitterVolume: 1,
    previewTemplatePath: null
  };

  return JencilCore;

})();

$.fn.jencil = function(options) {
  var $this, instance;
  $this = $(this);
  instance = new JencilCore($this);
  return $this.data('jencil', instance);
};

var CommandBase, EditorCommand, EditorMarkupCommand,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

CommandBase = (function(_super) {

  __extends(CommandBase, _super);

  function CommandBase(core, receiver, callback) {
    this.core = core;
    CommandBase.__super__.constructor.call(this, receiver, callback);
  }

  return CommandBase;

})(Command);

EditorCommand = (function(_super) {

  __extends(EditorCommand, _super);

  function EditorCommand(core, callback) {
    EditorCommand.__super__.constructor.call(this, core, null, callback);
  }

  EditorCommand.prototype.getReceiver = function() {
    return this.core.getEditor();
  };

  return EditorCommand;

})(CommandBase);

EditorMarkupCommand = (function(_super) {

  __extends(EditorMarkupCommand, _super);

  function EditorMarkupCommand(core, name) {
    this.name = name;
    EditorMarkupCommand.__super__.constructor.call(this, core, null);
  }

  EditorMarkupCommand.prototype.getCallback = function() {
    var receiver;
    receiver = this.getReceiver();
    return receiver[this.name];
  };

  return EditorMarkupCommand;

})(EditorCommand);

var Widget;

Widget = (function() {

  function Widget(core, selector, context) {
    var instance;
    this.core = core;
    if (selector == null) {
      selector = '<div>';
    }
    if (selector instanceof jQuery) {
      this.element = selector;
    } else {
      this.element = jQuery(selector, context);
    }
    instance = this.element.data('widget-instance');
    if ((instance != null) && instance instanceof Widget) {
      return instance;
    }
    this.element.data('widget-instance', this);
  }

  Widget.prototype.factory = function(jQueryObj) {
    return new Widget(this.core, jQueryObj);
  };

  Widget.prototype.parent = function() {
    if (this._parentCache != null) {
      return this._parentCache;
    }
    this._parentCache = this.factory(this.element.parent());
    return this._parentCache;
  };

  Widget.prototype.children = function() {
    var c;
    if (this._childrenCache != null) {
      return this._childrenCache;
    }
    this._childrenCache = (function() {
      var _i, _len, _ref, _results;
      _ref = this.element.children();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        c = _ref[_i];
        _results.push(this.factory(jQuery(c)));
      }
      return _results;
    }).call(this);
    return this._childrenCache;
  };

  Widget.prototype.init = function() {
    var child, _i, _len, _ref;
    _ref = this.children();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      child.init();
    }
    return this.adjust();
  };

  Widget.prototype.adjust = function() {
    var child, _i, _len, _ref;
    _ref = this.children();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      child.adjust();
    }
    return this;
  };

  return Widget;

})();

var HorizontalSplitter, Splitter, VerticalSplitter,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

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
      _this.mousemove(e);
      e.stopPropagation();
      e.stopImmediatePropagation();
      return e.preventDefault();
    };
    mouseup = function(e) {
      var $window;
      $window = $(window);
      $window.unbind('mousemove', mousemove);
      $window.unbind('mouseup', mouseup);
      e.stopPropagation();
      e.stopImmediatePropagation();
      return e.preventDefault();
    };
    this.element.mousedown(function(e) {
      var $window;
      $window = $(window);
      $window.mousemove(mousemove);
      $window.mouseup(mouseup);
      e.stopPropagation();
      e.stopImmediatePropagation();
      return e.preventDefault();
    });
  }

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
  }

  VerticalSplitter.prototype.mousemove = function(e) {
    var container, value;
    container = this.fst.parent();
    value = e.pageX - (container.element.absoluteX() + container.element.contentX(true));
    value = this.regulateValue(value);
    return this.value(value);
  };

  VerticalSplitter.prototype.valueWidth = function() {
    var container;
    container = this.fst.parent();
    return container.element.width();
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
    HorizontalSplitter.__super__.constructor.call(this, core, fst, snd, defaultVolume);
    this.element.addClass('horizontal');
    this.fst.element.addClass('top');
    this.snd.element.addClass('bottom');
  }

  HorizontalSplitter.prototype.mousemove = function(e) {
    var container, value;
    container = this.fst.parent();
    value = e.pageY - (container.element.absoluteY() + container.element.contentY(true));
    value = this.regulateValue(value);
    return this.value(value);
  };

  HorizontalSplitter.prototype.valueWidth = function() {
    var container;
    container = this.fst.parent();
    return container.element.height();
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

var Fullscreen, HorizontalPanel, Panel, VerticalPanel,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

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

VerticalPanel = (function(_super) {

  __extends(VerticalPanel, _super);

  function VerticalPanel(core, fst, snd, defaultVolume) {
    this.fst = fst;
    this.snd = snd;
    this.defaultVolume = defaultVolume != null ? defaultVolume : 0.5;
    VerticalPanel.__super__.constructor.call(this, core);
    this.element.addClass('vertical');
    this.fst = this.fst || new Panel(core);
    this.snd = this.snd || new Panel(core);
    this.splitter = new VerticalSplitter(core, this.fst, this.snd, this.defaultVolume);
    this.element.append(this.fst.element);
    this.element.append(this.splitter.element);
    this.element.append(this.snd.element);
  }

  VerticalPanel.prototype.init = function() {
    this.splitter.init();
    this.fst.init();
    return this.snd.init();
  };

  VerticalPanel.prototype.adjust = function() {
    this.fst.element.outerHeight(this.element.height());
    this.snd.element.outerHeight(this.element.height());
    this.splitter.element.outerHeight(this.element.height());
    this.splitter.adjust();
    return this;
  };

  return VerticalPanel;

})(Panel);

HorizontalPanel = (function(_super) {

  __extends(HorizontalPanel, _super);

  function HorizontalPanel(core, fst, snd, defaultVolume) {
    this.fst = fst;
    this.snd = snd;
    this.defaultVolume = defaultVolume != null ? defaultVolume : 0.5;
    HorizontalPanel.__super__.constructor.call(this, core);
    this.element.addClass('horizontal');
    this.fst = this.fst || new Panel(core);
    this.snd = this.snd || new Panel(core);
    this.splitter = new HorizontalSplitter(core, this.fst, this.snd, this.defaultVolume);
    this.element.append(this.fst.element);
    this.element.append(this.splitter.element);
    this.element.append(this.snd.element);
  }

  HorizontalPanel.prototype.init = function() {
    this.splitter.init();
    this.fst.init();
    return this.snd.init();
  };

  HorizontalPanel.prototype.adjust = function() {
    this.fst.element.outerWidth(this.element.width());
    this.snd.element.outerWidth(this.element.width());
    this.splitter.element.outerWidth(this.element.width());
    this.splitter.adjust();
    return this;
  };

  return HorizontalPanel;

})(Panel);

Fullscreen = (function(_super) {

  __extends(Fullscreen, _super);

  function Fullscreen(core) {
    var _this = this;
    Fullscreen.__super__.constructor.call(this, core);
    this.element.addClass('fullscreen');
    this.element.css({
      'display': 'table',
      'position': 'fixed',
      'top': '0',
      'left': '0',
      'width': '100%',
      'height': '100%'
    });
    if ($.browser.msie && $.browser.version < 7) {
      this.element.css('position', 'absolute');
      $(window).scroll(function() {
        return _this.element.css('top', $(document).scrollTop());
      });
    }
    this.curtain = $('<div>').addClass('curtain');
    this.curtain.css({
      'position': 'absolute',
      'top': '0',
      'left': '0',
      'width': '100%',
      'height': '100%',
      'background': 'black',
      'opacity': '0.6'
    });
    this.curtain.click(function() {
      return _this.hide();
    });
    this.cell = $('<div>').css({
      'display': 'table-cell',
      'vertical-align': 'middle',
      'width': '95%',
      'height': '95%'
    });
    this.element.append(this.curtain);
    this.element.append(this.cell);
    this.element.hide();
  }

  Fullscreen.prototype.show = function() {
    var _this = this;
    this._width = this.core.wrapper.element.css('width');
    this._height = this.core.wrapper.element.css('height');
    this.core.wrapper.element.css('width', '90%');
    this.core.wrapper.element.css('height', '90%');
    this.cell.append(this.core.wrapper.element);
    return this.element.fadeIn('fast', function() {
      _this.core.init();
      return _this.core.adjust();
    });
  };

  Fullscreen.prototype.hide = function() {
    var _this = this;
    this.core.wrapper.element.css('width', this._width);
    this.core.wrapper.element.css('height', this._height);
    this.core.element.after(this.core.wrapper.element);
    return this.element.fadeOut('fast', function() {
      _this.core.init();
      return _this.core.adjust();
    });
  };

  return Fullscreen;

})(Panel);

var Toolbar,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Toolbar = (function(_super) {

  __extends(Toolbar, _super);

  function Toolbar(core) {
    Toolbar.__super__.constructor.call(this, core);
    this.element.addClass('toolbar');
  }

  return Toolbar;

})(Panel);

var ActionButton, Button, CommandButton, EditorMarkupButton, Separator,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

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

  function Button(core, name) {
    this.name = name;
    Button.__super__.constructor.call(this, core, '<a>');
    this.element.addClass('button').addClass(name);
    this.element.append($("<span>" + name + "</span>"));
    this.element.attr('title', name);
  }

  return Button;

})(Widget);

ActionButton = (function(_super) {

  __extends(ActionButton, _super);

  function ActionButton(core, name, callback, shortcut) {
    var _this = this;
    this.callback = callback;
    this.shortcut = shortcut;
    ActionButton.__super__.constructor.call(this, core, name);
    this.element.click(function() {
      return _this.callback();
    });
    if ((this.shortcut != null) && (window.shortcut != null)) {
      window.shortcut.add(this.shortcut, function() {
        return _this.callback();
      });
      this.element.attr('title', "" + name + " (" + this.shortcut + ")");
    }
  }

  return ActionButton;

})(Button);

CommandButton = (function(_super) {

  __extends(CommandButton, _super);

  function CommandButton(core, name, command, shortcut) {
    var callback,
      _this = this;
    this.command = command;
    callback = function() {
      return _this.core.caretaker.invoke(_this.command);
    };
    CommandButton.__super__.constructor.call(this, core, name, callback, shortcut);
  }

  return CommandButton;

})(ActionButton);

EditorMarkupButton = (function(_super) {

  __extends(EditorMarkupButton, _super);

  function EditorMarkupButton(core, name, shortcut) {
    var command;
    command = new EditorMarkupCommand(core, name);
    EditorMarkupButton.__super__.constructor.call(this, core, name, command, shortcut);
  }

  return EditorMarkupButton;

})(CommandButton);

var FullscreenButton, PreviewButton, RedoButton, UndoButton,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

UndoButton = (function(_super) {

  __extends(UndoButton, _super);

  function UndoButton(core) {
    var callback, check,
      _this = this;
    callback = function(e) {
      return _this.core.caretaker.undo();
    };
    check = function() {
      if (!_this.core.caretaker.canUndo()) {
        _this.element.addClass('disabled');
      } else {
        _this.element.removeClass('disabled');
      }
      return setTimeout(check, 100);
    };
    UndoButton.__super__.constructor.call(this, core, 'undo', callback, 'Ctrl+Z');
    check();
  }

  return UndoButton;

})(ActionButton);

RedoButton = (function(_super) {

  __extends(RedoButton, _super);

  function RedoButton(core) {
    var callback, check,
      _this = this;
    callback = function(e) {
      return _this.core.caretaker.redo();
    };
    check = function() {
      if (!_this.core.caretaker.canRedo()) {
        _this.element.addClass('disabled');
      } else {
        _this.element.removeClass('disabled');
      }
      return setTimeout(check, 100);
    };
    RedoButton.__super__.constructor.call(this, core, 'redo', callback, 'Ctrl+Shift+Z');
    check();
  }

  return RedoButton;

})(ActionButton);

FullscreenButton = (function(_super) {

  __extends(FullscreenButton, _super);

  function FullscreenButton(core) {
    var callback,
      _this = this;
    callback = function(e) {
      if (_this.core.fullscreen.element.is(':visible')) {
        _this.core.fullscreen.hide();
        return _this.element.removeClass('hide');
      } else {
        _this.core.fullscreen.show();
        return _this.element.addClass('hide');
      }
    };
    FullscreenButton.__super__.constructor.call(this, core, 'fullscreen', callback, 'Ctrl+F');
  }

  return FullscreenButton;

})(ActionButton);

PreviewButton = (function(_super) {

  __extends(PreviewButton, _super);

  function PreviewButton(core) {
    var callback,
      _this = this;
    callback = function(e) {
      var viewer;
      viewer = _this.core.getViewer();
      if (!viewer.element.is(':visible')) {
        _this.element.addClass('hide');
      } else {
        _this.element.removeClass('hide');
      }
      return _this.core.wrapper.workspace.toggleViewer();
    };
    PreviewButton.__super__.constructor.call(this, core, 'preview', callback, 'Ctrl+P');
  }

  PreviewButton.prototype.init = function() {
    if (this.core.wrapper.workspace.mainPanel.splitter.defaultValue === 0) {
      return this.element.addClass('hide');
    } else {
      return this.element.removeClass('hide');
    }
  };

  return PreviewButton;

})(ActionButton);

var AlignCenterButton, AlignJustifyButton, AlignLeftButton, AlignRightButton, AnchorButton, BoldButton, H1Button, H2Button, H3Button, H4Button, H5Button, H6Button, ImageButton, IndentButton, ItalicButton, OrderedListButton, OutdentButton, StrikeButton, SubscriptButton, SuperscriptButton, UnderlineButton, UnorderedListButton,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

H1Button = (function(_super) {

  __extends(H1Button, _super);

  function H1Button(core) {
    H1Button.__super__.constructor.call(this, core, 'h1');
  }

  return H1Button;

})(EditorMarkupButton);

H2Button = (function(_super) {

  __extends(H2Button, _super);

  function H2Button(core) {
    H2Button.__super__.constructor.call(this, core, 'h2');
  }

  return H2Button;

})(EditorMarkupButton);

H3Button = (function(_super) {

  __extends(H3Button, _super);

  function H3Button(core) {
    H3Button.__super__.constructor.call(this, core, 'h3');
  }

  return H3Button;

})(EditorMarkupButton);

H4Button = (function(_super) {

  __extends(H4Button, _super);

  function H4Button(core) {
    H4Button.__super__.constructor.call(this, core, 'h4');
  }

  return H4Button;

})(EditorMarkupButton);

H5Button = (function(_super) {

  __extends(H5Button, _super);

  function H5Button(core) {
    H5Button.__super__.constructor.call(this, core, 'h5');
  }

  return H5Button;

})(EditorMarkupButton);

H6Button = (function(_super) {

  __extends(H6Button, _super);

  function H6Button(core) {
    H6Button.__super__.constructor.call(this, core, 'h6');
  }

  return H6Button;

})(EditorMarkupButton);

BoldButton = (function(_super) {

  __extends(BoldButton, _super);

  function BoldButton(core) {
    BoldButton.__super__.constructor.call(this, core, 'bold', "Ctrl+B");
  }

  return BoldButton;

})(EditorMarkupButton);

ItalicButton = (function(_super) {

  __extends(ItalicButton, _super);

  function ItalicButton(core) {
    ItalicButton.__super__.constructor.call(this, core, 'italic', "Ctrl+I");
  }

  return ItalicButton;

})(EditorMarkupButton);

UnderlineButton = (function(_super) {

  __extends(UnderlineButton, _super);

  function UnderlineButton(core) {
    UnderlineButton.__super__.constructor.call(this, core, 'underline', "Ctrl+U");
  }

  return UnderlineButton;

})(EditorMarkupButton);

StrikeButton = (function(_super) {

  __extends(StrikeButton, _super);

  function StrikeButton(core) {
    StrikeButton.__super__.constructor.call(this, core, 'strike');
  }

  return StrikeButton;

})(EditorMarkupButton);

SuperscriptButton = (function(_super) {

  __extends(SuperscriptButton, _super);

  function SuperscriptButton(core) {
    SuperscriptButton.__super__.constructor.call(this, core, 'superscript');
  }

  return SuperscriptButton;

})(EditorMarkupButton);

SubscriptButton = (function(_super) {

  __extends(SubscriptButton, _super);

  function SubscriptButton(core) {
    SubscriptButton.__super__.constructor.call(this, core, 'subscript');
  }

  return SubscriptButton;

})(EditorMarkupButton);

AnchorButton = (function(_super) {

  __extends(AnchorButton, _super);

  function AnchorButton(core) {
    AnchorButton.__super__.constructor.call(this, core, 'anchor');
  }

  return AnchorButton;

})(EditorMarkupButton);

ImageButton = (function(_super) {

  __extends(ImageButton, _super);

  function ImageButton(core) {
    ImageButton.__super__.constructor.call(this, core, 'image');
  }

  return ImageButton;

})(EditorMarkupButton);

UnorderedListButton = (function(_super) {

  __extends(UnorderedListButton, _super);

  function UnorderedListButton(core) {
    UnorderedListButton.__super__.constructor.call(this, core, 'unorderedList');
  }

  return UnorderedListButton;

})(EditorMarkupButton);

OrderedListButton = (function(_super) {

  __extends(OrderedListButton, _super);

  function OrderedListButton(core) {
    OrderedListButton.__super__.constructor.call(this, core, 'orderedList');
  }

  return OrderedListButton;

})(EditorMarkupButton);

IndentButton = (function(_super) {

  __extends(IndentButton, _super);

  function IndentButton(core) {
    IndentButton.__super__.constructor.call(this, core, 'indent');
  }

  return IndentButton;

})(EditorMarkupButton);

OutdentButton = (function(_super) {

  __extends(OutdentButton, _super);

  function OutdentButton(core) {
    OutdentButton.__super__.constructor.call(this, core, 'outdent');
  }

  return OutdentButton;

})(EditorMarkupButton);

AlignLeftButton = (function(_super) {

  __extends(AlignLeftButton, _super);

  function AlignLeftButton(core) {
    AlignLeftButton.__super__.constructor.call(this, core, 'alignLeft');
  }

  return AlignLeftButton;

})(EditorMarkupButton);

AlignCenterButton = (function(_super) {

  __extends(AlignCenterButton, _super);

  function AlignCenterButton(core) {
    AlignCenterButton.__super__.constructor.call(this, core, 'alignCenter');
  }

  return AlignCenterButton;

})(EditorMarkupButton);

AlignRightButton = (function(_super) {

  __extends(AlignRightButton, _super);

  function AlignRightButton(core) {
    AlignRightButton.__super__.constructor.call(this, core, 'alignRight');
  }

  return AlignRightButton;

})(EditorMarkupButton);

AlignJustifyButton = (function(_super) {

  __extends(AlignJustifyButton, _super);

  function AlignJustifyButton(core) {
    AlignJustifyButton.__super__.constructor.call(this, core, 'alignJustify');
  }

  return AlignJustifyButton;

})(EditorMarkupButton);

var Workspace, Wrapper,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Wrapper = (function(_super) {

  __extends(Wrapper, _super);

  function Wrapper(core) {
    Wrapper.__super__.constructor.call(this, core);
    this.element.addClass('jencil wrapper');
    this.workspace = new Workspace(this.core);
    this.workspace.element.appendTo(this.element);
  }

  Wrapper.prototype.init = function() {
    var _this = this;
    if (this.element.resizable != null) {
      this.element.resizable({
        resize: function() {
          return _this.adjust();
        },
        stop: function() {
          return _this.adjust();
        }
      });
    }
    this.workspace.init();
    return this;
  };

  Wrapper.prototype.adjust = function() {
    this.workspace.element.outerWidth(this.element.width());
    this.workspace.element.outerHeight(this.element.height());
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
    this.reconstructor(core.profile);
  }

  Workspace.prototype.reconstructor = function(profile) {
    var button, buttonClass, buttonClasses, editorClass, viewerClass, _i, _len,
      _this = this;
    this.element.empty();
    editorClass = profile.getEditorClass();
    this.editorPanel = new editorClass(this.core);
    viewerClass = profile.getViewerClass();
    this.viewerPanel = new viewerClass(this.core);
    this.editorPanel.update(function(value) {
      return _this.viewerPanel.update(value);
    });
    this.mainPanel = new VerticalPanel(this.core, this.editorPanel, this.viewerPanel, this.core.options.defaultSplitterVolume);
    this.mainPanel.element.addClass('mainPanel');
    this.toolbar = new Toolbar(this.core);
    buttonClasses = profile.getButtonClasses();
    for (_i = 0, _len = buttonClasses.length; _i < _len; _i++) {
      buttonClass = buttonClasses[_i];
      button = new buttonClass(this.core);
      this.toolbar.element.append(button.element);
    }
    this.toolbar.element.appendTo(this.element);
    return this.mainPanel.element.appendTo(this.element);
  };

  Workspace.prototype.init = function() {
    this.toolbar.init();
    return this.mainPanel.init();
  };

  Workspace.prototype.adjust = function() {
    this.toolbar.element.outerWidth(this.element.width());
    this.mainPanel.element.outerWidth(this.element.width());
    this.mainPanel.element.outerHeight(this.element.height() - this.toolbar.element.outerHeight());
    this.toolbar.adjust();
    this.mainPanel.adjust();
    return this;
  };

  Workspace.prototype.toggleViewer = function(callback) {
    var end, volume,
      _this = this;
    volume = this.mainPanel.splitter.volume();
    if ((0 < volume && volume < 1)) {
      end = 1;
      this._previousSplitterVolume = volume;
    } else {
      end = this._previousSplitterVolume || this.mainPanel.splitter.defaultVolume;
      if (end === 1) {
        end = 0.5;
      }
    }
    return animate({
      start: volume,
      end: end,
      duration: 500,
      callback: function(value, epoch) {
        return _this.mainPanel.splitter.volume(value);
      }
    });
  };

  return Workspace;

})(Panel);

var Editor, TextEditor, TextPanel,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Editor = (function(_super) {

  __extends(Editor, _super);

  function Editor(core, selector, context) {
    Editor.__super__.constructor.call(this, core, selector, context);
    this.element.addClass('editor');
    this._updateCallbacks = [];
  }

  Editor.prototype.focus = function() {
    throw "NotImplementedError";
  };

  Editor.prototype.getValue = function() {
    throw "NotImplementedError";
  };

  Editor.prototype.setValue = function() {
    throw "NotImplementedError";
  };

  Editor.prototype.update = function(callback) {
    var _i, _len, _ref, _results;
    if (callback != null) {
      this._updateCallbacks.push(callback);
      return this;
    }
    _ref = this._updateCallbacks;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      callback = _ref[_i];
      _results.push(callback.call(this, this.getValue()));
    }
    return _results;
  };

  Editor.prototype.createMemento = function() {
    return this.getValue();
  };

  Editor.prototype.setMemento = function(memento) {
    return this.setValue(memento);
  };

  return Editor;

})(Panel);

TextPanel = (function(_super) {

  __extends(TextPanel, _super);

  function TextPanel(core) {
    TextPanel.__super__.constructor.call(this, core, '<textarea>');
    this.element.css({
      margin: '0',
      padding: '0',
      border: 'none',
      outline: 'none',
      resize: 'none'
    });
    if ($.fn.tabby != null) {
      this.element.tabby();
    }
    this.helper = new Textarea(window.document, this.element.get(0));
  }

  TextPanel.prototype.caret = function(start, end) {
    return this.helper.selection.caret(start, end);
  };

  TextPanel.prototype.selection = function(value) {
    if (value != null) {
      return this.helper.selection.replaceSelection(value, true);
    }
    return this.helper.selection.text();
  };

  TextPanel.prototype.insertBefore = function(str) {
    return this.helper.selection.insertBeforeSelection(str, true);
  };

  TextPanel.prototype.insertAfter = function(str) {
    return this.helper.selection.insertAfterSelection(str, true);
  };

  TextPanel.prototype.wrap = function(before, after) {
    return this.helper.selection.wrapSelection(before, after, true);
  };

  return TextPanel;

})(Panel);

TextEditor = (function(_super) {

  __extends(TextEditor, _super);

  function TextEditor(core) {
    var _this = this;
    TextEditor.__super__.constructor.call(this, core);
    this.textPanel = new TextPanel(core);
    this.element.append(this.textPanel.element);
    this.textPanel.element.on('keyup keypress click blur', function() {
      return _this.update();
    });
    this.textPanel.element.on('keyup', function(e) {
      var dummyCommand;
      if (e.which === 13) {
        dummyCommand = new DummyCommand(_this);
        return _this.core.caretaker.invoke(dummyCommand);
      }
    });
  }

  TextEditor.prototype.adjust = function() {
    this.textPanel.element.outerWidth(this.element.width());
    this.textPanel.element.outerHeight(this.element.height());
    this.textPanel.adjust();
    return this;
  };

  TextEditor.prototype.focus = function() {
    this.textPanel.element.focus();
    return this;
  };

  TextEditor.prototype.getValue = function() {
    return this.textPanel.helper.val();
  };

  TextEditor.prototype.setValue = function(value) {
    this.textPanel.helper.val(value);
    this.update();
    return this;
  };

  TextEditor.prototype.caret = function(start, end) {
    this.textPanel.focus();
    return this.textPanel.caret(start, end);
  };

  TextEditor.prototype.selection = function(value) {
    if (value != null) {
      this.textPanel.selection(value);
      this.update();
      return this;
    }
    return this.textPanel.selection(value);
  };

  TextEditor.prototype.insertBefore = function(str) {
    this.textPanel.insertBefore(str);
    return this.update();
  };

  TextEditor.prototype.insertAfter = function(str) {
    this.textPanel.insertAfter(str);
    return this.update();
  };

  TextEditor.prototype.wrap = function(before, after) {
    this.textPanel.wrap(before, after);
    return this.update();
  };

  return TextEditor;

})(Editor);

var HtmlEditor,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

HtmlEditor = (function(_super) {

  __extends(HtmlEditor, _super);

  function HtmlEditor() {
    return HtmlEditor.__super__.constructor.apply(this, arguments);
  }

  HtmlEditor.prototype.h1 = function() {
    return this.wrap("<h1>", "</h1>");
  };

  HtmlEditor.prototype.h2 = function() {
    return this.wrap("<h2>", "</h2>");
  };

  HtmlEditor.prototype.h3 = function() {
    return this.wrap("<h3>", "</h3>");
  };

  HtmlEditor.prototype.h4 = function() {
    return this.wrap("<h4>", "</h4>");
  };

  HtmlEditor.prototype.h5 = function() {
    return this.wrap("<h5>", "</h5>");
  };

  HtmlEditor.prototype.h6 = function() {
    return this.wrap("<h6>", "</h6>");
  };

  HtmlEditor.prototype.bold = function() {
    return this.wrap("<b>", "</b>");
  };

  HtmlEditor.prototype.italic = function() {
    return this.wrap("<i>", "</i>");
  };

  HtmlEditor.prototype.underline = function() {
    return this.wrap("<u>", "</u>");
  };

  HtmlEditor.prototype.strike = function() {
    return this.wrap("<s>", "</s>");
  };

  HtmlEditor.prototype.superscript = function() {
    return this.wrap("<sup>", "</sup>");
  };

  HtmlEditor.prototype.subscript = function() {
    return this.wrap("<sub>", "</sub>");
  };

  HtmlEditor.prototype.anchor = function() {
    var href, text;
    text = this.selection();
    if (!text) {
      text = window.prompt("Please input a link text", "Here");
    }
    href = window.prompt("Please input a link url", "http://");
    return this.selection("<a href='" + href + "'>" + text + "</a>");
  };

  HtmlEditor.prototype.image = function() {
    var alt, src;
    src = window.prompt("Please input a image url", "http://");
    alt = window.prompt("(Optional) Please input a alt message", "Image");
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

  HtmlEditor.prototype.indent = function() {
    var text, x;
    text = this.selection();
    text = (function() {
      var _i, _len, _ref, _results;
      _ref = text.split("\n");
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        x = _ref[_i];
        _results.push("  " + x);
      }
      return _results;
    })();
    text.unshift("<div style='margin-left: 4em'>");
    text.push("</div>");
    return this.selection(text.join("\n"));
  };

  HtmlEditor.prototype.outdent = function() {
    var text, x;
    text = this.selection();
    text = (function() {
      var _i, _len, _ref, _results;
      _ref = text.split("\n");
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        x = _ref[_i];
        _results.push("  " + x);
      }
      return _results;
    })();
    text.unshift("<div style='margin-left: -4em'>");
    text.push("</div>");
    return this.selection(text.join("\n"));
  };

  HtmlEditor.prototype.alignLeft = function() {
    var text, x;
    text = this.selection();
    text = (function() {
      var _i, _len, _ref, _results;
      _ref = text.split("\n");
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        x = _ref[_i];
        _results.push("  " + x);
      }
      return _results;
    })();
    text.unshift("<div style='text-align: left'>");
    text.push("</div>");
    return this.selection(text.join("\n"));
  };

  HtmlEditor.prototype.alignCenter = function() {
    var text, x;
    text = this.selection();
    text = (function() {
      var _i, _len, _ref, _results;
      _ref = text.split("\n");
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        x = _ref[_i];
        _results.push("  " + x);
      }
      return _results;
    })();
    text.unshift("<div style='text-align: center'>");
    text.push("</div>");
    return this.selection(text.join("\n"));
  };

  HtmlEditor.prototype.alignRight = function() {
    var text, x;
    text = this.selection();
    text = (function() {
      var _i, _len, _ref, _results;
      _ref = text.split("\n");
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        x = _ref[_i];
        _results.push("  " + x);
      }
      return _results;
    })();
    text.unshift("<div style='text-align: right'>");
    text.push("</div>");
    return this.selection(text.join("\n"));
  };

  HtmlEditor.prototype.alignJustify = function() {
    var text, x;
    text = this.selection();
    text = (function() {
      var _i, _len, _ref, _results;
      _ref = text.split("\n");
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        x = _ref[_i];
        _results.push("  " + x);
      }
      return _results;
    })();
    text.unshift("<div style='text-align: justify'>");
    text.push("</div>");
    return this.selection(text.join("\n"));
  };

  return HtmlEditor;

})(TextEditor);

var MarkdownEditor,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

MarkdownEditor = (function(_super) {

  __extends(MarkdownEditor, _super);

  function MarkdownEditor() {
    return MarkdownEditor.__super__.constructor.apply(this, arguments);
  }

  MarkdownEditor.prototype.h1 = function() {
    return this.insertBefore("# ");
  };

  MarkdownEditor.prototype.h2 = function() {
    return this.insertBefore("## ");
  };

  MarkdownEditor.prototype.h3 = function() {
    return this.insertBefore("### ");
  };

  MarkdownEditor.prototype.h4 = function() {
    return this.insertBefore("#### ");
  };

  MarkdownEditor.prototype.h5 = function() {
    return this.insertBefore("##### ");
  };

  MarkdownEditor.prototype.h6 = function() {
    return this.insertBefore("###### ");
  };

  MarkdownEditor.prototype.bold = function() {
    return this.wrap("**", "**");
  };

  MarkdownEditor.prototype.italic = function() {
    return this.wrap("*", "*");
  };

  MarkdownEditor.prototype.anchor = function() {
    var href, text;
    text = this.selection();
    if (!text) {
      text = window.prompt("Please input a link text", "Here");
    }
    href = window.prompt("Please input a link url", "http://");
    return this.selection("[" + text + "](" + href + ")");
  };

  MarkdownEditor.prototype.image = function() {
    var alt, src;
    src = window.prompt("Please input a image url", "http://");
    alt = window.prompt("(Optional) Please input a alt message", "Image");
    return this.selection("![" + alt + "](" + src + ")");
  };

  MarkdownEditor.prototype.unorderedList = function() {
    var text, x;
    text = this.selection();
    text = (function() {
      var _i, _len, _ref, _results;
      _ref = text.split("\n");
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        x = _ref[_i];
        _results.push("-   " + x);
      }
      return _results;
    })();
    text.unshift("");
    text.push("");
    return this.selection(text.join("\n"));
  };

  MarkdownEditor.prototype.orderedList = function() {
    var i, text, x;
    text = this.selection();
    text = (function() {
      var _i, _len, _ref, _results;
      _ref = text.split("\n");
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        x = _ref[i];
        _results.push("" + i + ". " + x);
      }
      return _results;
    })();
    text.unshift("");
    text.push("");
    return this.selection(text.join("\n"));
  };

  MarkdownEditor.prototype.indent = function() {
    var text, x;
    text = this.selection();
    text = (function() {
      var _i, _len, _ref, _results;
      _ref = text.split("\n");
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        x = _ref[_i];
        _results.push("  " + x);
      }
      return _results;
    })();
    text.unshift("");
    text.push("");
    return this.selection(text.join("\n"));
  };

  return MarkdownEditor;

})(HtmlEditor);

var IframePanel, TemplatePanel, TemplateViewer, Viewer,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Viewer = (function(_super) {

  __extends(Viewer, _super);

  function Viewer(core, selector, context) {
    Viewer.__super__.constructor.call(this, core, selector, context);
    this.element.addClass('viewer');
  }

  Viewer.prototype.update = function(value) {
    throw "NotImplementedError";
  };

  return Viewer;

})(Panel);

IframePanel = (function(_super) {

  __extends(IframePanel, _super);

  function IframePanel(core) {
    IframePanel.__super__.constructor.call(this, core, '<iframe>');
    this.element.css({
      margin: '0',
      padding: '0',
      border: 'none',
      outline: 'none',
      resize: 'none',
      width: '100%',
      height: '100%',
      pointerEvents: 'none'
    });
    this.element.attr('frameborder', 0);
  }

  IframePanel.prototype.init = function() {
    var iframe;
    iframe = this.element.get(0);
    if (iframe.contentDocument != null) {
      this.document = iframe.contentDocument;
    } else {
      this.document = iframe.contentWindow.document;
    }
    return this.document.write('<body></body>');
  };

  IframePanel.prototype.write = function(content) {
    var scrollTop;
    if (this.document != null) {
      try {
        scrollTop = this.document.documentElement.scrollTop;
      } catch (e) {
        scrollTop = 0;
      }
      this.document.open();
      this.document.write(content);
      this.document.close();
      this.document.documentElement.scrollTop = scrollTop;
      return true;
    }
    return false;
  };

  return IframePanel;

})(Panel);

TemplatePanel = (function(_super) {

  __extends(TemplatePanel, _super);

  function TemplatePanel() {
    return TemplatePanel.__super__.constructor.apply(this, arguments);
  }

  TemplatePanel.prototype.loadTemplate = function(templatePath, value) {
    var _this = this;
    return $.ajax({
      url: templatePath,
      success: function(data) {
        _this._template = data;
        return _this.write(value);
      }
    });
  };

  TemplatePanel.prototype.write = function(content) {
    if (this._template != null) {
      content = this._template.replace("{{content}}", content);
    } else if (this.templatePath != null) {
      this.loadTemplate(this.templatePath, content);
    }
    return TemplatePanel.__super__.write.call(this, content);
  };

  return TemplatePanel;

})(IframePanel);

TemplateViewer = (function(_super) {

  __extends(TemplateViewer, _super);

  function TemplateViewer(core) {
    TemplateViewer.__super__.constructor.call(this, core);
    this.templatePanel = new TemplatePanel(core);
    this.templatePanel.templatePath = this.core.options.previewTemplatePath;
    this.element.append(this.templatePanel.element);
  }

  TemplateViewer.prototype.adjust = function() {
    this.templatePanel.element.outerWidth(this.element.width());
    this.templatePanel.element.outerHeight(this.element.height());
    this.templatePanel.adjust();
    return this;
  };

  TemplateViewer.prototype.update = function(value) {
    this.templatePanel.write(value);
    return this;
  };

  return TemplateViewer;

})(Viewer);

var HtmlViewer;

HtmlViewer = TemplateViewer;

var MarkdownViewer,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

MarkdownViewer = (function(_super) {

  __extends(MarkdownViewer, _super);

  function MarkdownViewer() {
    return MarkdownViewer.__super__.constructor.apply(this, arguments);
  }

  MarkdownViewer.prototype.update = function(value) {
    return MarkdownViewer.__super__.update.call(this, window.markdown.toHTML(value));
  };

  return MarkdownViewer;

})(TemplateViewer);

var Profile;

Profile = (function() {

  function Profile() {}

  Profile.prototype.buttonClasses = [H1Button, H2Button, H3Button, H4Button, H5Button, H6Button, Separator, UndoButton, RedoButton, Separator, BoldButton, ItalicButton, UnderlineButton, StrikeButton, SuperscriptButton, SubscriptButton, Separator, AnchorButton, ImageButton, Separator, UnorderedListButton, OrderedListButton, Separator, IndentButton, OutdentButton, Separator, AlignLeftButton, AlignCenterButton, AlignRightButton, AlignJustifyButton, Separator, FullscreenButton, PreviewButton];

  Profile.prototype.getEditorClass = function() {
    return this.editorClass;
  };

  Profile.prototype.getViewerClass = function() {
    return this.viewerClass;
  };

  Profile.prototype.getButtonClasses = function() {
    return this.buttonClasses;
  };

  return Profile;

})();

var HtmlProfile,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

HtmlProfile = (function(_super) {

  __extends(HtmlProfile, _super);

  function HtmlProfile() {
    return HtmlProfile.__super__.constructor.apply(this, arguments);
  }

  HtmlProfile.prototype.editorClass = HtmlEditor;

  HtmlProfile.prototype.viewerClass = HtmlViewer;

  return HtmlProfile;

})(Profile);

var MarkdownProfile,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

MarkdownProfile = (function(_super) {

  __extends(MarkdownProfile, _super);

  function MarkdownProfile() {
    return MarkdownProfile.__super__.constructor.apply(this, arguments);
  }

  MarkdownProfile.prototype.editorClass = MarkdownEditor;

  MarkdownProfile.prototype.viewerClass = MarkdownViewer;

  return MarkdownProfile;

})(Profile);
