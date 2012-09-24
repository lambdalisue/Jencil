var BaseEditor, TextEditor,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

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

namespace('Jencil.editors', function(exports) {
  exports.BaseEditor = BaseEditor;
  return exports.TextEditor = TextEditor;
});
