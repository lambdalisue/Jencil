var Editor, TextEditor, TextareaPanel,
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

TextareaPanel = (function(_super) {

  __extends(TextareaPanel, _super);

  function TextareaPanel(core) {
    var _this = this;
    TextareaPanel.__super__.constructor.call(this, core, '<textarea>');
    this.textarea = new Textarea(window.document, this.element.get(0));
    this.selection = this.textarea.selection;
    this.element.css({
      margin: '0',
      padding: '0',
      border: 'none',
      outline: 'none',
      resize: 'none'
    });
    if ($.fn.tabby != null) {
      this.element.tabby({
        'tabString': '    '
      });
    }
    this.element.on('keydown', function(e) {
      var command, indent, insert, line;
      if (e.which === 13) {
        line = _this.selection.line();
        if (/^\s*/.test(line)) {
          indent = line.match(/^\s*/)[0];
        } else {
          indent = "";
        }
        insert = "\n" + indent;
        command = new Command(_this, function() {
          _this.selection.insertAfter(insert, false);
          return _this.focus();
        });
        _this.core.caretaker.invoke(command);
        e.stopPropagation();
        e.stopImmediatePropagation();
        e.preventDefault();
        return false;
      }
    });
  }

  TextareaPanel.prototype.val = function(value) {
    if (value != null) {
      this.textarea.val(value);
      return this;
    }
    return this.textarea.val();
  };

  TextareaPanel.prototype.selection = function(value) {
    return this.selection.text(value, true);
  };

  TextareaPanel.prototype.insertBefore = function(str) {
    return this.selection.insertBefore(str, true);
  };

  TextareaPanel.prototype.insertAfter = function(str) {
    return this.selection.insertAfter(str, true);
  };

  TextareaPanel.prototype.wrap = function(before, after) {
    return this.selection.wrap(before, after, true);
  };

  TextareaPanel.prototype.focus = function() {
    this.element.focus();
    return this;
  };

  TextareaPanel.prototype.createMemento = function() {
    return this.val();
  };

  TextareaPanel.prototype.setMemento = function(memento) {
    return this.val(memento);
  };

  return TextareaPanel;

})(Panel);

TextEditor = (function(_super) {

  __extends(TextEditor, _super);

  function TextEditor(core) {
    var _this = this;
    TextEditor.__super__.constructor.call(this, core);
    this.textPanel = new TextareaPanel(core);
    this.element.append(this.textPanel.element);
    this.textPanel.element.on('keyup keypress click blur', function() {
      return _this.update();
    });
  }

  TextEditor.prototype.adjust = function() {
    this.textPanel.element.outerWidth(this.element.width());
    this.textPanel.element.outerHeight(this.element.height());
    this.textPanel.adjust();
    return this;
  };

  TextEditor.prototype.focus = function() {
    this.textPanel.focus();
    return this;
  };

  TextEditor.prototype.getValue = function() {
    return this.textPanel.val();
  };

  TextEditor.prototype.setValue = function(value) {
    this.textPanel.val(value);
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
